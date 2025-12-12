import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import maplibregl from 'maplibre-gl';
import axios from 'axios';

const API = import.meta.env.VITE_EDITOR_API || 'http://localhost:4004/api/poi';

export default function Editor({ map }: { map: maplibregl.Map }) {
  const [params] = useSearchParams();
  const enabled = params.get('editor') === '1';
  const [sel, setSel] = useState<any>(null);

  useEffect(() => {
    if (!enabled) return;

    /* ---- 1.  click existing icon ---- */
    map.on('click', 'poi-layer', async (e: any) => {
      const p = e.features![0].properties;
      const { data } = await axios.get(`${API}/${p.osm_id}`);
      setSel(data);
    });

    /* ---- 2.  shift-click blank → new ---- */
    map.on('click', (e: any) => {
      if (!e.originalEvent.shiftKey) return;
      setSel({ id: 0, lng: e.lngLat.lng, lat: e.lngLat.lat, tags: {} });
    });

    /* ---- 3.  cursor hint ---- */
    map.getCanvas().style.cursor = 'crosshair';
    return () => { map.getCanvas().style.cursor = ''; };
  }, [enabled, map]);

  if (!enabled) return null;

  return (
    <>
      <Form poi={sel} onClose={() => setSel(null)} onSave={async (tags, comment) => {
        if (sel.id === 0) {                                          // create
          await axios.post(API, { ...sel, tags, comment });
        } else {                                                     // update
          await axios.put(`${API}/${sel.id}`, { version: sel.version, tags, comment });
        }
        setSel(null);
        bustTiles(map);
      }} onDelete={async (comment) => {
        await axios.delete(`${API}/${sel.id}`, { params: { comment } });
        setSel(null);
        bustTiles(map);
      }} />
    </>
  );
}

/* ---------- tile cache buster ---------- */
function bustTiles(map: maplibregl.Map) {
  const src = map.getSource('poi') as maplibregl.VectorTileSource;
  src.tiles = src.tiles.map((t: string) => t.replace(/\?.*|$/, '?v=' + Date.now()));
  map.style.sourceCaches.poi?.clearTiles();
  map.triggerRepaint();
}

/* ---------- simple form (name + amenity + raw JSON) ---------- */
function Form({ poi, onClose, onSave, onDelete }: any) {
  const [tags, setTags] = useState(poi.tags);
  const [comment, setComment] = useState('');
  return (
    <div className="editor-popup">
      <h3>{poi.id === 0 ? 'New POI' : 'Edit POI'}</h3>
      <label>Name <input value={tags.name || ''} onChange={e => setTags({...tags, name: e.target.value})} /></label>
      <label>Amenity
        <select value={tags.amenity || ''} onChange={e => setTags({...tags, amenity: e.target.value})}>
          <option value="">--</option>
          <option value="restaurant">restaurant</option><option value="cafe">cafe</option>
          <option value="fuel">fuel</option><option value="hospital">hospital</option>
          <option value="school">school</option><option value="place_of_worship">worship</option>
        </select>
      </label>
      <details>
        <summary>Raw tags (JSON)</summary>
        <textarea value={JSON.stringify(tags, null, 2)} onChange={e => setTags(JSON.parse(e.target.value))} />
      </details>
      <label>Comment <input value={comment} onChange={e => setComment(e.target.value)} placeholder="What did you change?" /></label>
      <div className="buttons">
        <button onClick={() => onSave(tags, comment)}>Save</button>
        {poi.id !== 0 && <button onClick={() => onDelete(comment)}>Delete</button>}
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
