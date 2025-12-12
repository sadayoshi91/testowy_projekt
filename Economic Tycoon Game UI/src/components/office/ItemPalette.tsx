import { useDrag } from 'react-dnd';
import { Monitor, Armchair, Server, Coffee, Flower2, Lightbulb, Printer, Box } from 'lucide-react';

interface DraggableItemProps {
  type: string;
  name: string;
  width: number;
  height: number;
  color: string;
  icon: any;
  category: string;
}

function DraggableItem({ type, name, width, height, color, icon: Icon, category }: DraggableItemProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'office-item',
    item: { type, name, width, height, color },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-[#0f0f0f] border-2 border-[#3a3a3a] rounded-lg p-3 cursor-move hover:border-blue-500 transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 rounded" style={{ backgroundColor: color + '30' }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm truncate">{name}</div>
          <div className="text-xs text-gray-500">{width}×{height}</div>
        </div>
      </div>
    </div>
  );
}

export function ItemPalette() {
  const items = [
    // Meble
    { type: 'desk', name: 'Biurko', width: 2, height: 1, color: '#8b4513', icon: Monitor, category: 'furniture' },
    { type: 'desk-large', name: 'Duże biurko', width: 3, height: 2, color: '#a0522d', icon: Monitor, category: 'furniture' },
    { type: 'chair', name: 'Krzesło', width: 1, height: 1, color: '#4b5563', icon: Armchair, category: 'furniture' },
    { type: 'meeting-table', name: 'Stół konferencyjny', width: 4, height: 2, color: '#6b4423', icon: Box, category: 'furniture' },
    
    // Technologia
    { type: 'server', name: 'Serwer', width: 1, height: 2, color: '#1e293b', icon: Server, category: 'tech' },
    { type: 'server-rack', name: 'Szafa serwerowa', width: 2, height: 3, color: '#0f172a', icon: Server, category: 'tech' },
    { type: 'printer', name: 'Drukarka', width: 1, height: 1, color: '#374151', icon: Printer, category: 'tech' },
    
    // Dekoracje
    { type: 'plant', name: 'Roślina', width: 1, height: 1, color: '#22c55e', icon: Flower2, category: 'decor' },
    { type: 'lamp', name: 'Lampa', width: 1, height: 1, color: '#fbbf24', icon: Lightbulb, category: 'decor' },
    { type: 'coffee-machine', name: 'Ekspres do kawy', width: 1, height: 1, color: '#78350f', icon: Coffee, category: 'decor' },
  ];

  const categories = [
    { id: 'furniture', name: 'Meble', items: items.filter(i => i.category === 'furniture') },
    { id: 'tech', name: 'Technologia', items: items.filter(i => i.category === 'tech') },
    { id: 'decor', name: 'Dekoracje', items: items.filter(i => i.category === 'decor') },
  ];

  return (
    <div className="w-64 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4 overflow-y-auto">
      <h3 className="mb-4">Przedmioty</h3>
      
      <div className="space-y-4">
        {categories.map(category => (
          <div key={category.id}>
            <h4 className="text-sm text-gray-400 mb-2">{category.name}</h4>
            <div className="space-y-2">
              {category.items.map(item => (
                <DraggableItem key={item.type} {...item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
