import { useState, useEffect } from 'react';
import { Menu, Settings, User, Route } from 'lucide-react';
import { SearchBarWithResults } from "./SearchBar";

interface HeaderProps {
                          searchQuery: string; // needs a context ?? 
                          onSearchChange: (value: string) => void;
                          onMenuToggle: () => void;
                          onRouteToggle?: () => void;
                          isRoutingMode?: boolean | null;
                      }

export const Header = ({
                        searchQuery,
                        onSearchChange,
                        onMenuToggle,
                        onRouteToggle,
                        isRoutingMode = false,
                      } : HeaderProps
                      ) => 
                {
                    const [editorActive, setEditorActive] = useState(() => window.location.search.includes('editor=1'));
                    
                    useEffect(() => {
                                      const handler = () => setEditorActive(window.location.search.includes('editor=1'));
                                      window.addEventListener('popstate', handler);
                                      return () => window.removeEventListener('popstate', handler);
                                    }, []);

                    const toggleEditor = () => {
                                                  const next = !editorActive;
                                                  setEditorActive(next);
                                                  const url = new URL(window.location.href);
                                                  if (next) 
                                                    url.searchParams.set('editor', '1');
                                                  else 
                                                    url.searchParams.delete('editor');

                                                  window.history.replaceState({}, '', url.toString());
                                                  window.dispatchEvent(new Event('editor-toggle'));
                                                };

                    return (
                      <div className="fixed top-0 left-0 right-0 z-110 pointer-events-none flex items-start justify-between p-6 overflow-visible">
                        
                        {/* Left Action Floating Capsule */}
                        <div className="pointer-events-auto flex items-center gap-3 h-14 px-4 bg-background/70 border border-border rounded-2xl shadow-xl backdrop-blur-md">
                          <button
                            onClick={onMenuToggle}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-transparent 
                                        transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 
                                        focus-visible:ring-ring"
                            aria-label="Menu"
                          >
                            <Menu className="w-5 h-5 text-foreground/80" />
                          </button>

                          <div className="flex items-center gap-2 pr-2">
                            <h1 className="text-sm font-semibold text-foreground tracking-tight hidden sm:block">
                              Maps
                            </h1>
                          </div>

                        </div>

                        {/* Center Search Container */}
                        <div className="pointer-events-auto flex-1 max-w-2xl min-w-0 mx-6 relative overflow-visible shadow-xl rounded-2xl">
                          <SearchBarWithResults 
                            value={searchQuery} 
                            onChange={onSearchChange} 
                          />
                        </div>

                        {/* Right Action Floating Capsule */}
                        <div className="pointer-events-auto flex items-center gap-1.5 h-14 px-3 bg-background/70 border border-border rounded-2xl shadow-xl backdrop-blur-md shrink-0">
                          {onRouteToggle && (
                            <button
                              onClick={onRouteToggle}
                              className={`flex h-10 px-3 items-center justify-center gap-2 rounded-xl transition-all font-medium text-xs 
                                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                                isRoutingMode 
                                  ? 'bg-primary text-primary-foreground shadow-md' 
                                  : 'text-foreground/80 hover:bg-muted'
                              }`}
                              aria-label="Toggle routing mode"
                              title={isRoutingMode ? 'Exit route planning' : 'Plan route'}
                            >
                              <Route className="w-4 h-4" />
                              <span className="hidden lg:block">Directions</span>
                            </button>
                          )}

                          <button
                            onClick={toggleEditor}
                            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                              editorActive 
                                ? 'bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20' 
                                : 'text-foreground/80 hover:bg-muted'
                            }`}
                            aria-label="Toggle POI editor"
                            title={editorActive ? 'Exit POI editor' : 'Enter POI editor'}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            > 
                              
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                           
                            </svg>
                          </button>

                          <div className="h-5 w-px bg-border mx-1 hidden md:block" />

                          <button
                            className="hidden md:flex h-10 w-10 items-center justify-center rounded-xl text-foreground/80 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            aria-label="Settings"
                          >
                            <Settings className="w-4 h-4" />
                          </button>

                          <button 
                            className="flex h-10 w-10 items-center justify-center rounded-xl text-foreground/80 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" 
                            aria-label="User profile"
                          >
                            <User className="w-4 h-4" />
                          </button>
                        </div>

                      </div>
                    );
                  };