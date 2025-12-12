export const layoutStyles = {
  container: 'flex flex-col h-screen bg-gray-50 overflow-hidden',
  header: 'bg-white shadow-md z-50 relative ',
  headerContent: 'flex items-center px-4 h-20',// gap-3',
  mainContent: 'flex flex-1 overflow-hidden relative',
  sidebar: (isOpen: boolean) =>
    `bg-white shadow-2xl transition-all duration-300 ease-in-out z-40 ${isOpen ? 'w-80' : 'w-0'
    } overflow-hidden`,
  sidebarContent: 'w-80 h-full flex flex-col mx-10 gap-4 bg-gray-800 ',
  mapContainer: 'flex-1 relative overflow-hidden h-full',
  mapView: 'w-full h-full absolute inset-0',
} as const;
