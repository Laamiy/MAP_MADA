import type { TagDict, inputType } from "@/types/Editor.type";

export const ensureObject = (input: inputType): TagDict => {
  if (!input) return {};
  if (typeof input === "object" && !Array.isArray(input)) return input as TagDict;

  if (typeof input === "string") {
    try {
      if (input.trim().startsWith("{")) return JSON.parse(input);
    } catch {
      console.error("[WARN] Failed to parse tags string:", input);
    }
  }
  return {};
};

export const getCleanTags = (rawTags: inputType): TagDict => {
  const target = ensureObject(rawTags);
  return Object.fromEntries(
    Object.entries(target).filter(([k, v]) => {
      const key = String(k);
      const val = String(v ?? "");
      const isValueValid = val.trim() !== "";
      const isKeyJunk =
        key.startsWith("mapbox") ||
        key.startsWith("_vector") ||
        key.startsWith("osm_") ||
        ["version", "osm_id", "icon_class"].includes(key);
      return isValueValid && !isKeyJunk;
    })
  ) as TagDict;
};

export const validateTags = (tags: TagDict): string | null => {
  // Pass clean tags or run getCleanTags if raw
  const clean = getCleanTags(tags);
  if (Object.keys(clean).length < 2) {
    return "[WARN] At least 2 valid tags are required";
  }

  const hasRequiredKey = !!(
    clean.name ||
    clean.amenity ||
    clean.public_transport ||
    clean.shop ||
    clean.tourism ||
    clean.leisure ||
    clean.natural
  );

  if (!hasRequiredKey) {
    return "[WARN] Missing identifying tag (e.g., name, amenity, shop)";
  }
  return null;
};