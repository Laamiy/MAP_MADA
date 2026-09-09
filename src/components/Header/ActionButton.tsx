import React from 'react';
import type { ReactNode } from 'react';

interface ActionButtonProps {
  onClick?: () => void;
  icon: ReactNode;
  label?: string;
  isActive?: boolean;
  activeClassName?: string;
  inactiveClassName?: string;
  ariaLabel: string;
  title: string;
  className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  icon,
  label,
  isActive = false,
  activeClassName = 'bg-emerald-600 text-white shadow-md',
  inactiveClassName,
  ariaLabel,
  title,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`group flex h-10 items-center justify-center rounded-xl transition-all font-medium text-xs px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 overflow-hidden ${
        isActive ? activeClassName : inactiveClassName
      } ${className}`}
      aria-label={ariaLabel}
      title={title}
    >
      <span className="w-4 h-4 shrink-0 flex items-center justify-center">
        {icon}
      </span>

      {/* Expandable Hover Label (Only rendered if label is provided) */}
      {label && (
        <span
          className={`max-w-0 opacity-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-out group-hover:max-w-30 group-hover:opacity-100 group-hover:ml-1.5 ${
            isActive ? 'text-current' : ''
          }`}
        >
          {label}
        </span>
      )}
    </button>
  );
};
