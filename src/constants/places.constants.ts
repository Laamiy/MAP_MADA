// src/constants/places.constants.ts
import { Home, Briefcase } from 'lucide-react';
import type { Place, SavedPlace } from '../types/map.types';

export const RECENT_PLACES: Place[] = [
  {
    id: 1,
    name: 'Analakely Market',
    address: "Avenue de l'Indépendance, Antananarivo",
    type: 'market',
  },
  {
    id: 2,
    name: 'Rova of Antananarivo',
    address: 'Antananarivo, Madagascar',
    type: 'landmark',
  },
  {
    id: 3,
    name: 'La Varangue',
    address: 'Rue Printsy Ratsimamanga, Antananarivo',
    type: 'restaurant',
  },
];

export const SAVED_PLACES: SavedPlace[] = [
  {
    id: 1,
    icon: Home,
    name: 'Home',
    address: 'Analamanga, Antananarivo',
  },
  {
    id: 2,
    icon: Briefcase,
    name: 'Work',
    address: 'Downtown Antananarivo',
  },
];


