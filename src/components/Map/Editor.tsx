import { useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_EDITOR_API || 'http://localhost:4004/api/poi';

type TagDict = Record<string, string>;

interface Props {
  poi: { id: number; version: number; lng?: number; lat?: number; tags: TagDict } | null;
  onClose: () => void;
  onDone: () => void;
}

export default function Editor({ poi, onClose, onDone }: Props) {
  const [tags, setTags] = useState<TagDict>(poi?.tags ?? {});
  const [comment, setComment] = useState('');

  if (!poi) return null;

  const save = async () => {
    try {
      if (poi.id === 0) {
        await axios.post(API, { lng: poi.lng, lat: poi.lat, tags, comment });
      } else {
        await axios.put(`${API}/${poi.id}`, { version: poi.version, tags, comment });
      }
      onDone();
    } catch (e) {
      console.error(e);
      alert('Save failed – see console');
    }
  };

  const remove = async () => {
    if (!confirm('Delete this POI?')) return;
    try {
      await axios.delete(`${API}/${poi.id}`, { params: { comment } });
      onDone();
    } catch (e) {
      console.error(e);
      alert('Delete failed – see console');
    }
  };

  return (
    <div className="editor-popup">
      <div className="editor-header">
        <h3>{poi.id === 0 ? 'New POI' : 'Edit POI'}</h3>
        <button className="close-btn" onClick={onClose} aria-label="Close">×</button>
      </div>

      <label>Name
        <input value={tags.name || ''} onChange={e => setTags({ ...tags, name: e.target.value })} />
      </label>

      <label>Amenity
        <select value={tags.amenity || ''} onChange={e => setTags({ ...tags, amenity: e.target.value })}>
          <option value="">--</option>
          <option value="restaurant">restaurant</option>
          <option value="cafe">cafe</option>
          <option value="fuel">fuel</option>
          <option value="hospital">hospital</option>
          <option value="school">school</option>
          <option value="place_of_worship">worship</option>
        </select>
      </label>

      <details>
        <summary>Raw tags (JSON)</summary>
        <textarea value={JSON.stringify(tags, null, 2)} onChange={e => setTags(JSON.parse(e.target.value))} />
      </details>

      <label>Comment
        <input value={comment} onChange={e => setComment(e.target.value)} placeholder="What did you change?" />
      </label>

      <div className="editor-buttons">
        <button onClick={save}>Save</button>
        {poi.id !== 0 && <button onClick={remove}>Delete</button>}
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}