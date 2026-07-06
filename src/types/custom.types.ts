export interface Place {
  id: number;
  name: string;
  address: string;
  type?: string;
  rating?: number;
  reviews?: number;
}

export interface SavedPlace extends Place {
  icon: React.ComponentType<{ className?: string }>;
}

export interface MenuItem {
    id: string;
    label: string;
    icon: React.ReactNode | string;
    badge?: number;
}