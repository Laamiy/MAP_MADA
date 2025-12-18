import { useState } from 'react';
import axios, { AxiosError } from 'axios';

const API_BASE = import.meta.env.VITE_EDITOR_API || 'http://localhost:4004';
const API_ENDPOINT = `${API_BASE}/api/poi`;

type TagDict = Record<string, string>;

interface Props {
  poi: {
    id: number;
    version: number;
    lng?: number;
    lat?: number;
    tags: TagDict;
  } | null;
  onClose: () => void;
  onDone: () => void;
}

export default function Editor({ poi, onClose, onDone }: Props) {
  // Prevents the "Unexpected non-whitespace " 
  const ensureObject = (input: any): TagDict => {
    if (!input) return {};
    if (typeof input === 'object' && !Array.isArray(input)) return input;
    
    if (typeof input === 'string') {
      try {
        // Only parse if  like a JSON object
        if (input.trim().startsWith('{')) {
          return JSON.parse(input);
        }
      } catch (e) {
        console.error("[WARN] Failed to parse tags string:", input);
      }
    }
    return {};
  };

  const [tags, setTags] = useState<TagDict>(() => ensureObject(poi?.tags));
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string>('');
  const [saving, setSaving] = useState(false);

  if (!poi) return null;

  // Sanitize tags (strips MapLibre junk ) 
  const getCleanTags = (rawTags: any): TagDict => {
    const target = ensureObject(rawTags);
    
    return Object.fromEntries(
      Object.entries(target).filter(([k, v]) => {
        const key = String(k);
        const val = String(v ?? '');
        const isValueValid = val.trim() !== '';
        
        const isKeyJunk =
          key.startsWith('mapbox') ||
          key.startsWith('_vector') ||
          key.startsWith('osm_') ||
          ['version', 'osm_id', 'icon_class'].includes(key);

        return isValueValid && !isKeyJunk;
      })
    ) as TagDict;
  };

  // Validation 
  const validateTags = (): string | null => {
    const clean = getCleanTags(tags);
    if (Object.keys(clean).length < 2) {
      return '[INFO] At least 2 valid tags are required';
    }
    const hasRequiredKey = !!(clean.name || clean.amenity || clean.shop || clean.tourism || clean.leisure || clean.natural);
    if (!hasRequiredKey) {
      return '[INFO] Missing identifying tag (e.g., name, amenity, shop)';
    }
    return null;
  };

  // Input Handlers 
  const handleTagChange = (key: string, value: string) => {
    setError('');
    // Ensure we are spreading an object
    const currentTags = ensureObject(tags);
    setTags({ ...currentTags, [key]: value });
  };

  const handleRawTagsChange = (value: string) => {
    setError('');
    try {
      if (value.trim().startsWith('{')) {
        const parsed = JSON.parse(value);
        if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
          setTags(parsed);
        }
      }
    } catch {
      // User is typing; ignore partial JSON errors
    }
  };

  // Save Action 
  const save = async () => {
    setError('');
    const validationError = validateTags();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    try {
      const cleanTags = getCleanTags(tags);
      console.log(`[DEBUG] Final Save Payload (${Object.keys(cleanTags).length} tags):`, cleanTags);

      const payload = {
        version: poi.version,
        tags: cleanTags,
        comment: comment.trim() || undefined,
      };

      if (poi.id === 0) {
        if (poi.lng === undefined || poi.lat === undefined) throw new Error('Missing coordinates');
        await axios.post(API_ENDPOINT, { ...payload, lng: poi.lng, lat: poi.lat });
      } else {
        await axios.put(`${API_ENDPOINT}/${poi.id}`, payload);
      }

      onDone();
    } catch (e) {
      console.error('[ERROR] Save failed:', e);
      if (axios.isAxiosError(e)) {
        const status = e.response?.status;
        const msg = e.response?.data?.message || e.message;
        setError(`[ERROR] Server (${status || 'Request'}): ${msg}`);
      } else {
        setError(`[ERROR] ${e instanceof Error ? e.message : 'Unknown error'}`);
      }
    } finally {
      setSaving(false);
    }
  };

  // Delete Action 
  const remove = async () => {
    if (!confirm('Delete this POI?')) return;
    setError('');
    setSaving(true);
    try {
      await axios.delete(`${API_ENDPOINT}/${poi.id}`, {
        params: { comment: comment.trim() || undefined }
      });
      onDone();
    } catch (e) {
      console.error('[ERROR] Delete failed:', e);
      setError('[ERROR] Delete failed. Check console for details.');
    } finally {
      setSaving(false);
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