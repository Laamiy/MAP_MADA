import { useState, useEffect } from "react";
import axios from "axios";
import type { TagDict, editorPoi } from "@/types/Editor.type";
import apiClient from "@/api/main";
import { ensureObject, getCleanTags, validateTags } from "@/utils/editor.utils";

const API_ENDPOINT = `/api/poi`;

export default function useEditor(poi: editorPoi | null, onDone: () => void) 
{
  const [tags, setTags] = useState<TagDict>(() => (poi ? ensureObject(poi.tags) : {}));
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (poi) {
      setTags(ensureObject(poi.tags));
      setComment("");
      setError("");
    }
  }, [poi]);
  console.log("[DEBUG] useEditor hook triggered. Current POI:", poi);
  if (!poi) return null;

  const handleTagChange = (key: string, value: string) => {
    setError("");
    setTags((prev) => ({ ...prev, [key]: value }));
  };

  const handleRawTagsChange = (value: string) => {
    setError("");
    const parsed = ensureObject(value);
    if (Object.keys(parsed).length > 0) {
      setTags(parsed);
    }
  };

  const save = async () => {
    setError("");
    const clean = getCleanTags(tags);
    const validationError = validateTags(clean);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    try 
    {
      const payload = {
                        version: poi.version,
                        tags: clean,
                        comment: comment.trim() || undefined,
                      };
      if (poi.id === 0) 
      {
        if (poi.lng === undefined || poi.lat === undefined) 
        {
          throw new Error("Missing coordinates");
        }
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
      else {
        setError(`[ERROR] ${e instanceof Error ? e.message : "Unknown error"}`);
      }
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!confirm("Delete this POI?")) return;
    setError("");
    setSaving(true);
    try {
      await apiClient.delete(`${API_ENDPOINT}/${poi.id}`, {
        params: { comment: comment.trim() || undefined },
      });
      onDone();
    } catch {
      setError("[ERROR] Delete failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleComments = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return {
    tags,
    comment,
    saving,
    error,
    handleTagChange,
    handleRawTagsChange,
    handleComments,
    save,
    remove,
  };
}