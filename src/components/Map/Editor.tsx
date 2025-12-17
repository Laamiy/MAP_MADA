import { useState } from 'react';
import axios, { AxiosError } from 'axios';

// Base API URL without the /api/poi path
const API_BASE     = import.meta.env.VITE_EDITOR_API || 'http://localhost:4004';
const API_ENDPOINT = `${API_BASE}/api/poi`;

type TagDict = Record<string, string>;

interface Props 
{
  poi: 
  { 
    id: number; 
    version: number; 
    lng?: number; 
    lat?: number; 
    tags: TagDict;
  } | null;
  onClose: () => void;
  onDone: () => void;
}

export default function Editor({ poi, onClose, onDone }: Props) 
{
  const [tags, setTags]       = useState<TagDict>(poi?.tags ?? {});
  const [comment, setComment] = useState('');
  const [error, setError]     = useState<string>('');
  const [saving, setSaving]   = useState(false);

  if (!poi)
     return null;

  const validateTags = (): string | null => 
    {
    const cleanTags = Object.fromEntries(Object.entries(tags).filter(([_, v]) => v.trim() !== ''));
    if (Object.keys(cleanTags).length < 2) 
      {
        return '[INFO] At least 2 tags are required';
      }
    if (!cleanTags.name && !cleanTags.amenity && !cleanTags.shop && !cleanTags.tourism) 
      {
        return '[INFO] At least one of: name, amenity, shop, or tourism is required';
      }
    return null;
  };

  const save = async () => {
    setError('');
    // Validate before sending
    const validationError = validateTags();
    if (validationError) 
      {
        setError(validationError);
        return;
      }
    setSaving(true);

    try 
    {
      // remove empty values
      const cleanTags = Object.fromEntries(Object.entries(tags).filter(([_, v]) => v.trim() !== ''));

      if (poi.id === 0) 
      {
          // CREATE - new POI
          if (poi.lng === undefined || poi.lat === undefined)
            {
              throw new Error('Coordinates are required for new POI');
            }
          await axios.post(API_ENDPOINT, {
                                            lng: poi.lng,
                                            lat: poi.lat,
                                            tags: cleanTags,
                                            comment: comment.trim() || undefined,
                                          });
      } 
      else 
      {
              // UPDATE - existing POI
              await axios.put(`${API_ENDPOINT}/${poi.id}`, 
                {
                    version: poi.version,
                    tags: cleanTags,
                    comment: comment.trim() || undefined,
                }
              );
      }
      onDone();
    } 
  catch (e)
{
  console.error('[ERROR] Save error:', e);

  if (!axios.isAxiosError(e))
  {
    setError(`[ERROR] Unexpected error: ${e}`);
    return;
  }
  const axiosError = e as AxiosError<any>;
  if (!axiosError.response)
  {
    setError(
      axiosError.request
        ? '[WARN] No response from server. Is the backend running on port 4004?'
        : `[ERROR] Request error: ${axiosError.message}`
    );
    return;
  }
  // Server responded with error
  const { status, data } = axiosError.response;
  switch (status)
  {
    case 400:
      setError(`[ERROR] Validation error: ${data.message || JSON.stringify(data)}`);
      break;

    case 409:
      setError('[ERROR] Conflict: POI was modified by another user. Please reload.');
      break;

    case 404:
      setError('[ERROR] POI not found. It may have been deleted.');
      break;

    default:
      setError(`[ERROR] Server error (${status}): ${data.message || 'Unknown error'}`);
  }
}
finally
{
  setSaving(false);
}
};
const remove = async () =>
{
  if (!confirm('[INFO] Delete this POI?'))
    return;

  setError('');
  setSaving(true);
  try
  {
    await axios.delete(
      `${API_ENDPOINT}/${poi.id}`,
      { params: { comment: comment.trim() || undefined } }
    );
    onDone();
  }
  catch (e)
  {
    console.error('[ERROR] Delete error:', e);

    if (!axios.isAxiosError(e))
    {
      setError(`[ERROR] Unexpected error: ${e}`);
      return;
    }

    const axiosError = e as AxiosError<any>;
    const { response } = axiosError;
    if (!response)
    {
      setError('[WARN] No response from server. Is the backend running?');
      return;
    }
    const { status, data } = response;
    switch (status)
    {
      case 404:
        setError('[WARN] POI not found. It may have been deleted already.');
        break;

      default:
        setError(`[ERROR] Delete failed (${status}): ${data.message || 'Unknown error'}`);
    }
  }
  finally
  {
    setSaving(false);
  }
};
const handleTagChange = (key: string, value: string) =>
{
  setTags({ ...tags, [key]: value });
  setError(''); // Clear error when user makes changes
};
const handleRawTagsChange = (value: string) =>
{
  try
  {
    const parsed = JSON.parse(value);

    if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed))
    {
      setTags(parsed);
      setError('');
    }
    else
    {
      setError('[WARN] Tags must be a JSON object');
    }
  }
  catch
  {
    setError('[WARN] Invalid JSON');
  }
};
  return (
    <div className="editor-popup">
      <div className="editor-header">
        <h3>{poi.id === 0 ? 'New POI' : `Edit POI #${poi.id}`}</h3>
        <button 
          className="close-btn" 
          onClick={onClose} 
          aria-label="Close"
          disabled={saving}
        >
          ×
        </button>
      </div>

      {error && (
        <div className="editor-error" style={{
          background: '#fee',
          border: '1px solid #fcc',
          padding: '8px',
          borderRadius: '4px',
          marginBottom: '12px',
          color: '#c00',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      <label>
        Name *
        <input 
          value={tags.name || ''} 
          onChange={e => handleTagChange('name', e.target.value)}
          placeholder="Enter name"
          disabled={saving}
        />
      </label>

      <label>
        Amenity
        <select 
          value={tags.amenity || ''} 
          onChange={e => handleTagChange('amenity', e.target.value)}
          disabled={saving}
        >
          <option value="">-- Select amenity --</option>
          <option value="restaurant">Restaurant</option>
          <option value="cafe">Cafe</option>
          <option value="fuel">Fuel Station</option>
          <option value="hospital">Hospital</option>
          <option value="school">School</option>
          <option value="university">University</option>
          <option value="place_of_worship">Place of Worship</option>
          <option value="bank">Bank</option>
          <option value="pharmacy">Pharmacy</option>
          <option value="parking">Parking</option>
        </select>
      </label>

      <label>
        Shop
        <input 
          value={tags.shop || ''} 
          onChange={e => handleTagChange('shop', e.target.value)}
          placeholder="e.g., supermarket, bakery"
          disabled={saving}
        />
      </label>

      <label>
        Tourism
        <input 
          value={tags.tourism || ''} 
          onChange={e => handleTagChange('tourism', e.target.value)}
          placeholder="e.g., hotel, museum, attraction"
          disabled={saving}
        />
      </label>

      <details>
        <summary>Raw tags (JSON)</summary>
        <textarea 
          value={JSON.stringify(tags, null, 2)} 
          onChange={e => handleRawTagsChange(e.target.value)}
          style={{ fontFamily: 'monospace', minHeight: '150px' }}
          disabled={saving}
        />
      </details>

      <label>
        Comment
        <input 
          value={comment} 
          onChange={e => setComment(e.target.value)} 
          placeholder="Describe what you changed (optional)"
          disabled={saving}
        />
      </label>

      <div className="editor-buttons">
        <button onClick={save} disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </button>
        {poi.id !== 0 && (
          <button onClick={remove} disabled={saving}>
            {saving ? 'Deleting...' : 'Delete'}
          </button>
        )}
        <button onClick={onClose} disabled={saving}>
          Cancel
        </button>
      </div>

      <div style={{ 
        marginTop: '12px', 
        fontSize: '11px', 
        color: '#666',
        borderTop: '1px solid #ddd',
        paddingTop: '8px'
      }}>
        <div>API: {API_ENDPOINT}</div>
        {poi.id !== 0 && <div>Version: {poi.version}</div>}
        {poi.lng !== undefined && poi.lat !== undefined && (
          <div>Coords: {poi.lat.toFixed(5)}, {poi.lng.toFixed(5)}</div>
        )}
      </div>
    </div>
  );
}