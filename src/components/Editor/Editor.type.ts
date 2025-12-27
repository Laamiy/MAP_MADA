export type TagDict   = Record<string, string>;
export type inputType = editorPoi | TagDict | object | string | undefined | null;

export interface editorPoi 
{
  id: number;
  version: number;
  lng?: number;
  lat?: number;
  tags: TagDict;
}

export interface editorProps 
{
  poi: editorPoi | null;
  onClose: () => void;
  onDone: () => void;
}

