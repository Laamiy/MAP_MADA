import { createContext, useContext, useState } from "react";
import React from "react"

interface EditorContextType {
  editorEnabled: boolean;
  toggleEditor: () => void;
}

const EditorContext = createContext<EditorContextType>({
  editorEnabled: false,
  toggleEditor: () => {},
});

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [editorEnabled, setEditorEnabled] = useState(() => window.location.search.includes("editor=1"));

  const toggleEditor = () => {
    setEditorEnabled((prev) => {
                                    const next = !prev;
                                    const url = new URL(window.location.href);
                                    if (next)
                                    {
                                        url.searchParams.set("editor", "1");
                                    } 
                                    else 
                                    {
                                        url.searchParams.delete("editor");
                                    }
                                    window.history.replaceState({}, "", url.toString());
                                    return next;
                                });
  };

  return (
    <EditorContext.Provider value={{ editorEnabled, toggleEditor }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => useContext(EditorContext);