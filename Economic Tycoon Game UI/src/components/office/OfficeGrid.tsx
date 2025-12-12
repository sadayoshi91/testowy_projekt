import { useDrop } from 'react-dnd';
import { OfficeItem } from '../Office';
import { GridItem } from './GridItem';

interface OfficeGridProps {
  items: OfficeItem[];
  onPlaceItem: (type: string, name: string, x: number, y: number, width: number, height: number, color: string) => void;
  onMoveItem: (id: string, x: number, y: number) => void;
  selectedItem: string | null;
  onSelectItem: (id: string | null) => void;
  showGrid: boolean;
}

const GRID_SIZE = 40; // rozmiar pojedynczej kratki w pikselach - zwiększone dla lepszej widoczności
const GRID_WIDTH = 25;
const GRID_HEIGHT = 16;

export function OfficeGrid({ items, onPlaceItem, onMoveItem, selectedItem, onSelectItem, showGrid }: OfficeGridProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'office-item',
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        const gridElement = document.getElementById('office-grid');
        if (gridElement) {
          const rect = gridElement.getBoundingClientRect();
          const x = Math.floor((offset.x - rect.left) / GRID_SIZE);
          const y = Math.floor((offset.y - rect.top) / GRID_SIZE);
          
          // Sprawdź czy mieści się w siatce
          if (x >= 0 && y >= 0 && x + item.width <= GRID_WIDTH && y + item.height <= GRID_HEIGHT) {
            onPlaceItem(item.type, item.name, x, y, item.width, item.height, item.color);
          }
        }
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      id="office-grid"
      className="relative rounded-lg shadow-inner"
      style={{
        width: GRID_WIDTH * GRID_SIZE,
        height: GRID_HEIGHT * GRID_SIZE,
        background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
        backgroundImage: showGrid
          ? `
            linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%),
            linear-gradient(to right, #333 1px, transparent 1px),
            linear-gradient(to bottom, #333 1px, transparent 1px)
          `
          : 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)',
        backgroundSize: showGrid ? `100% 100%, ${GRID_SIZE}px ${GRID_SIZE}px, ${GRID_SIZE}px ${GRID_SIZE}px` : '100% 100%',
      }}
      onClick={() => onSelectItem(null)}
    >
      {/* Podświetlenie przy przeciąganiu */}
      {isOver && (
        <div className="absolute inset-0 bg-blue-500/10 pointer-events-none rounded-lg" />
      )}

      {/* Umieszczone przedmioty */}
      {items.map((item) => (
        <GridItem
          key={item.id}
          item={item}
          gridSize={GRID_SIZE}
          isSelected={selectedItem === item.id}
          onSelect={() => onSelectItem(item.id)}
          onMove={(x, y) => onMoveItem(item.id, x, y)}
          gridWidth={GRID_WIDTH}
          gridHeight={GRID_HEIGHT}
        />
      ))}
    </div>
  );
}