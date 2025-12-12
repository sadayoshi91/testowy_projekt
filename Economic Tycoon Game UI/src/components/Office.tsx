import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { OfficeGrid } from './office/OfficeGrid';
import { ItemPalette } from './office/ItemPalette';
import { Grid3x3, Trash2, RotateCw } from 'lucide-react';

export interface OfficeItem {
  id: string;
  type: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  color: string;
  icon?: string;
}

export function Office() {
  const [placedItems, setPlacedItems] = useState<OfficeItem[]>([
    {
      id: '1',
      type: 'desk',
      name: 'Biurko',
      x: 5,
      y: 5,
      width: 2,
      height: 1,
      rotation: 0,
      color: '#8b4513',
    },
    {
      id: '2',
      type: 'server',
      name: 'Serwer',
      x: 15,
      y: 3,
      width: 1,
      height: 2,
      rotation: 0,
      color: '#1e293b',
    },
    {
      id: '3',
      type: 'chair',
      name: 'Krzesło',
      x: 5,
      y: 6,
      width: 1,
      height: 1,
      rotation: 0,
      color: '#4b5563',
    },
    {
      id: '4',
      type: 'plant',
      name: 'Roślina',
      x: 3,
      y: 3,
      width: 1,
      height: 1,
      rotation: 0,
      color: '#22c55e',
    },
    {
      id: '5',
      type: 'meeting-table',
      name: 'Stół konferencyjny',
      x: 10,
      y: 10,
      width: 4,
      height: 2,
      rotation: 0,
      color: '#6b4423',
    },
  ]);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);

  const handlePlaceItem = (itemType: string, itemName: string, x: number, y: number, width: number, height: number, color: string) => {
    const newItem: OfficeItem = {
      id: Date.now().toString(),
      type: itemType,
      name: itemName,
      x,
      y,
      width,
      height,
      rotation: 0,
      color,
    };
    setPlacedItems([...placedItems, newItem]);
  };

  const handleMoveItem = (id: string, x: number, y: number) => {
    setPlacedItems(placedItems.map(item =>
      item.id === id ? { ...item, x, y } : item
    ));
  };

  const handleDeleteItem = (id: string) => {
    setPlacedItems(placedItems.filter(item => item.id !== id));
    setSelectedItem(null);
  };

  const handleRotateItem = (id: string) => {
    setPlacedItems(placedItems.map(item =>
      item.id === id ? { ...item, rotation: (item.rotation + 90) % 360 } : item
    ));
  };

  const selectedItemData = placedItems.find(item => item.id === selectedItem);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl mb-1">Edytor biura</h1>
            <p className="text-gray-400">Zaprojektuj layout swojego biura</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`px-4 py-2 rounded flex items-center gap-2 transition-colors ${
                showGrid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#1a1a1a] hover:bg-[#252525] border border-[#3a3a3a]'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
              <span>Siatka</span>
            </button>

            {selectedItem && (
              <>
                <button
                  onClick={() => selectedItem && handleRotateItem(selectedItem)}
                  className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#252525] border border-[#3a3a3a] rounded flex items-center gap-2 transition-colors"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>Obróć</span>
                </button>
                <button
                  onClick={() => selectedItem && handleDeleteItem(selectedItem)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center gap-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Usuń</span>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 flex gap-4 min-h-0">
          <ItemPalette />

          <div className="flex-1 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4 overflow-auto">
            <OfficeGrid
              items={placedItems}
              onPlaceItem={handlePlaceItem}
              onMoveItem={handleMoveItem}
              selectedItem={selectedItem}
              onSelectItem={setSelectedItem}
              showGrid={showGrid}
            />
          </div>

          {selectedItemData && (
            <div className="w-64 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
              <h3 className="mb-4">Właściwości</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400">Nazwa:</span>
                  <div className="mt-1">{selectedItemData.name}</div>
                </div>
                <div>
                  <span className="text-gray-400">Typ:</span>
                  <div className="mt-1 capitalize">{selectedItemData.type}</div>
                </div>
                <div>
                  <span className="text-gray-400">Pozycja:</span>
                  <div className="mt-1">X: {selectedItemData.x}, Y: {selectedItemData.y}</div>
                </div>
                <div>
                  <span className="text-gray-400">Rozmiar:</span>
                  <div className="mt-1">{selectedItemData.width} × {selectedItemData.height}</div>
                </div>
                <div>
                  <span className="text-gray-400">Rotacja:</span>
                  <div className="mt-1">{selectedItemData.rotation}°</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
}