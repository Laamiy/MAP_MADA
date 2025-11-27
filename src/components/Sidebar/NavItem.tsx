import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Badge } from './Badges';

interface NavItem {
  label: string;
  href?: string;
  icon: any;
  badge?: number | React.ReactNode;
  items?: Array<{ label: string; badge?: number; href: string }>;
}

interface NavItemProps {
  item: NavItem;
  isActive?: boolean;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ item, isActive, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubItems = item.items && item.items.length > 0;
  const Icon = item.icon;
  
  return (
    <div>
      <button
        onClick={() => {
          if (hasSubItems) {
            setIsExpanded(!isExpanded);
          }
          onClick?.();
        }}
        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors text-left group ${
          isActive 
            ? 'bg-gray-50 text-gray-900' 
            : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-gray-700' : 'text-gray-400'}`} />
        <span className="flex-1 text-sm font-medium">{item.label}</span>
        {typeof item.badge === 'number' ? (
          <Badge count={item.badge} />
        ) : item.badge ? (
          item.badge
        ) : null}
        {hasSubItems && (
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        )}
      </button>
      
      {hasSubItems && isExpanded && (
        <div className="mt-0.5 ml-7 space-y-0.5">
          {item.items!.map((subItem, idx) => (
            <button
              key={idx}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <span>{subItem.label}</span>
              {subItem.badge && <Badge count={subItem.badge} color="bg-blue-100 text-blue-700" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};