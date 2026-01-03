import React from 'react';
import { X, MapPin, Tag } from 'lucide-react';
import type { MapPhotoData } from '../../hooks/useMapPhoto';

interface PhotoViewerProps {
  data: MapPhotoData;
  onClose: () => void;
}

export const PhotoViewer: React.FC<PhotoViewerProps> = ({ data, onClose }) => {
  return (
    <div className="!relative !w-80 !bg-white !rounded-xl !shadow-2xl !overflow-hidden !border !border-gray-200">
      <div className="!absolute !top-2 !right-2 !z-10">
        <button 
          onClick={onClose}
          className="!bg-black/50 hover:!bg-black/70 !text-white !p-1.5 !rounded-full !transition-colors !cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="!relative !h-48 !bg-gray-100">
        <img 
          src={data.photoUrl} 
          alt={data.name} 
          className="!w-full !h-full !object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
          }}
        />
      </div>
      
      <div className="!p-4">
        <h4 className="!text-lg !font-bold !text-gray-900 !truncate !mb-2">
          {data.name}
        </h4>
        
        <div className="!space-y-2">
          {data.city && (
            <div className="!flex !items-center !gap-2 !text-gray-600">
              <MapPin size={14} className="!text-blue-500" />
              <span className="!text-xs !font-medium">{data.city}</span>
            </div>
          )}
          
          {data.amenity && (
            <div className="!flex !items-center !gap-2">
              <Tag size={14} className="!text-emerald-500" />
              <span className="!text-[10px] !px-2 !py-0.5 !bg-emerald-50 !text-emerald-700 !rounded-full !font-bold !uppercase !tracking-wider">
                {data.amenity}
              </span>
            </div>
          )}
        </div>
        
        <div className="!mt-4 !pt-3 !border-t !border-gray-100 !flex !justify-between !items-center">
          <span className="!text-[10px] !text-gray-400">ID: {data.id}</span>
          <button 
             className="!text-[11px] !text-blue-600 hover:!underline !font-semibold"
             onClick={() => window.open(data.photoUrl, '_blank')}
          >
            View Full Size
          </button>
        </div>
      </div>
    </div>
  );
};