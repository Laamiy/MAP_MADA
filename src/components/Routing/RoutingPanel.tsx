import React from 'react';
import { X } from 'lucide-react';
import { CoordinateInput } from './CoordinateInput/CoordinateInput';
import { RouteInfo } from './RouteInfo/RouteInfo';
import type { OSRMCoordinate, RoutingPanelProps } from '../../types/osrm.types';
import start from '../../assets/images/rocket.png';
import end from '../../assets/images/end.png';

export const RoutingPanel: React.FC<RoutingPanelProps> = ({
  isActive,
  startPoint,
  endPoint,
  route,
  loading,
  error,
  onStartPointChange,
  onEndPointChange,
  onGetRoute,
  onClear,
  onClose,
}) => {
  if (!isActive) return null;

  const safeStartPoint: OSRMCoordinate = startPoint || {
    lat: -18.9137,
    lng: 47.5214,
  };
  const safeEndPoint: OSRMCoordinate = endPoint || {
    lat: -18.988,
    lng: 47.5267,
  };

  return (
    <div className="absolute top-[14vh] right-[1vw] z-20">
      <style>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 
                      0 2px 8px rgba(0, 0, 0, 0.04),
                      inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }
        .glass-input {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.7);
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.03);
        }
        .glass-btn {
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          transition: all 0.2s ease;
        }
        .glass-btn:hover {
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
        }
        .glass-btn:active {
          transform: translateY(0);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
        }
        .glass-btn:disabled {
          background: rgba(209, 213, 219, 0.3);
          box-shadow: none;
          transform: none;
          cursor: not-allowed;
        }
        .glass-primary {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.85), rgba(20, 184, 166, 0.85));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.25), 
                      inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transition: all 0.2s ease;
        }
        .glass-primary:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(20, 184, 166, 0.95));
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.35), 
                      inset 0 1px 0 rgba(255, 255, 255, 0.4);
          transform: translateY(-1px);
        }
        .glass-primary:active:not(:disabled) {
          transform: translateY(0);
        }
        .glass-primary:disabled {
          background: rgba(209, 213, 219, 0.4);
          box-shadow: none;
          transform: none;
          cursor: not-allowed;
        }
        .glass-danger {
          background: rgba(239, 68, 68, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
        .glass-chip {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
      `}</style>

      <div className="glass-panel w-72 rounded-2xl overflow-hidden flex flex-col max-h-[calc(100vh-8rem)]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-3 border-b border-white/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/80 to-teal-600/80 flex items-center justify-center shadow-md">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-.553-.894L15 7m0 13V7" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-gray-800 tracking-tight">Route Planning</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-black/5 transition-colors text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 space-y-3">
          
          {/* Coordinate Inputs */}
          <div className="space-y-3">
            <div className="glass-input rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Start</span>
              </div>
              <CoordinateInput
                label="Start Point"
                coordinate={safeStartPoint}
                onChange={onStartPointChange}
                markerColor="#10b981"
                pathIcon={start}
              />
            </div>

            <div className="glass-input rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                </div>
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Destination</span>
              </div>
              <CoordinateInput
                label="Destination"
                coordinate={safeEndPoint}
                onChange={onEndPointChange}
                markerColor="#ef4444"
                pathIcon={end}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={onGetRoute}
              disabled={loading || !startPoint || !endPoint}
              className="glass-primary flex-1 text-white text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Get Route
                </>
              )}
            </button>
            <button
              onClick={onClear}
              disabled={loading}
              className="glass-btn px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600"
            >
              Clear
            </button>
          </div>

          {/* Route Info */}
          {route && (
            <div className="glass-chip rounded-xl p-3 space-y-2">
              <RouteInfo distance={route.distance} duration={route.duration} />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="glass-danger rounded-xl p-3 flex items-start gap-2">
              <svg className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-[11px] text-red-600 leading-relaxed">
                <strong className="mr-1">Error:</strong> {error}
              </p>
            </div>
          )}

          {/* Helper Text */}
          <div className="flex items-start gap-2 p-2">
            <svg className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Click on the map to set points or enter coordinates manually
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};