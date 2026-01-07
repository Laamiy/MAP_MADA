import { useState } from 'react';
import axios from 'axios';
import type { TagDict, inputType, editorPoi } from "../../../components/Editor/Editor.type"
import apiClient from '../../../api/main'
// import {useQuery , useQueryClient} from '@tanstack/react-query'

const API_ENDPOINT  = `/api/poi`;

export default function useEditor(poi: editorPoi | null, onDone: () => void) {
  const ensureObject = (input: inputType): TagDict => {

    if (!input)
      return {};

    if (typeof input === 'object' && !Array.isArray(input))
      return input as TagDict;

    if (typeof input === 'string') {
      try {
        if (input.trim().startsWith('{'))
          return JSON.parse(input);
      }
      catch (e) {
        console.error("[WARN] Failed to parse tags string:", input);
      }
    }
    return {};
  };
  if (!poi)
    return null;

  const [tags, setTags] = useState<TagDict>(() => ensureObject(poi.tags));
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

 

  const getCleanTags  = (rawTags: inputType): TagDict => 
    {
      const target      = ensureObject(rawTags);
      return Object.fromEntries(
        Object.entries(target).filter(
        ([k, v]) => 
        {
          const key = String(k);
          const val = String(v ?? '');
          const isValueValid  = val.trim() !== '';
          const isKeyJunk     = key.startsWith('mapbox') || key.startsWith('_vector') || key.startsWith('osm_') || ['version', 'osm_id', 'icon_class'].includes(key);
          return isValueValid && !isKeyJunk;
        }
      )
  ) as TagDict;
  };

  const validateTags = (): string | null => 
  {
    const clean = getCleanTags(tags);
    if (Object.keys(clean).length < 2)
      return '[INFO] At least 2 valid tags are required';

    const hasRequiredKey = !!(clean.name || clean.amenity || clean.public_transport || clean.shop || clean.tourism || clean.leisure || clean.natural);

    if (!hasRequiredKey)
      return '[INFO] Missing identifying tag (e.g., name, amenity, shop)';
    return null;
  };

  const handleTagChange = (key: string, value: string) => {
    setError('');
    const currentTags = ensureObject(tags);
    setTags({ ...currentTags, [key]: value });
  };

  const handleRawTagsChange = (value: string) => {
    setError('');
    try {
      if (value.trim().startsWith('{')) {
        const parsed = JSON.parse(value);
        if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed))
          setTags(parsed);
      }
    }
    catch { }
  };

  const save = async () => 
    {
        setError('');
        const validationError = validateTags();
        if (validationError) 
          {
            setError(validationError);
            return;
          }
        setSaving(true);
        try 
        {
          const cleanTags = getCleanTags(tags);
          const payload = { version: poi.version, tags: cleanTags, comment: comment.trim() || undefined };

          if (poi.id === 0) 
          {
            if (poi.lng === undefined || poi.lat === undefined) 
              throw new Error('Missing coordinates');
            
            await apiClient.post(API_ENDPOINT, { ...payload, lng: poi.lng, lat: poi.lat });
          }
          else 
          {
            await apiClient.put(`${API_ENDPOINT}/${poi.id}`, payload);
          }
          onDone();
        }
        catch (e) 
        {
          if (axios.isAxiosError(e)) 
          {
            setError(`[ERROR] Server: ${e.response?.data?.message || e.message}`);
          }
          else 
          {
            setError(`[ERROR] ${e instanceof Error ? e.message : 'Unknown error'}`);
          }
        }
        finally 
        {
          setSaving(false);
        }
  };

  const remove = async () => 
    {
        if (!confirm('Delete this POI?')) 
          return;
        setError('');
        setSaving(true);
        try 
        {
          await apiClient.delete(`${API_ENDPOINT}/${poi.id}`, { params: { comment: comment.trim() || undefined } });
          onDone();
        } 
        catch (e)
        {
          setError('[ERROR] Delete failed.');
        } 
        finally 
        {
          setSaving(false);
        }
  };
  const handleComments = (e: React.ChangeEvent<HTMLInputElement>) => { setComment(e.target.value) }
  return { tags, comment, saving, error, handleTagChange, handleRawTagsChange, handleComments, save, remove }
}
