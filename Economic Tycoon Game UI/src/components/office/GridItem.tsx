import { useDrag } from 'react-dnd';
import { OfficeItem } from '../Office';

interface GridItemProps {
  item: OfficeItem;
  gridSize: number;
  isSelected: boolean;
  onSelect: () => void;
  onMove: (x: number, y: number) => void;
  gridWidth: number;
  gridHeight: number;
}

export function GridItem({ item, gridSize, isSelected, onSelect, onMove, gridWidth, gridHeight }: GridItemProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'placed-item',
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (draggedItem, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        const gridElement = document.getElementById('office-grid');
        if (gridElement) {
          const rect = gridElement.getBoundingClientRect();
          const x = Math.floor((offset.x - rect.left) / gridSize);
          const y = Math.floor((offset.y - rect.top) / gridSize);
          
          // Sprawdź czy mieści się w siatce
          if (x >= 0 && y >= 0 && x + item.width <= gridWidth && y + item.height <= gridHeight) {
            onMove(x, y);
          }
        }
      }
    },
  }));

  const actualWidth = item.rotation % 180 === 0 ? item.width : item.height;
  const actualHeight = item.rotation % 180 === 0 ? item.height : item.width;

  // Renderuj różne typy przedmiotów
  const renderItem = () => {
    switch (item.type) {
      case 'desk':
      case 'desk-large':
        return <Desk width={actualWidth} height={actualHeight} rotation={item.rotation} />;
      case 'chair':
        return <Chair rotation={item.rotation} />;
      case 'meeting-table':
        return <MeetingTable width={actualWidth} height={actualHeight} rotation={item.rotation} />;
      case 'server':
      case 'server-rack':
        return <Server width={actualWidth} height={actualHeight} rotation={item.rotation} />;
      case 'printer':
        return <Printer rotation={item.rotation} />;
      case 'plant':
        return <Plant rotation={item.rotation} />;
      case 'lamp':
        return <Lamp rotation={item.rotation} />;
      case 'coffee-machine':
        return <CoffeeMachine rotation={item.rotation} />;
      default:
        return <div className="w-full h-full bg-gray-500" />;
    }
  };

  return (
    <div
      ref={drag}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      className={`absolute cursor-move transition-all ${
        isDragging ? 'opacity-50 z-50' : 'z-10'
      } ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-[#0f0f0f]' : ''
      }`}
      style={{
        left: item.x * gridSize,
        top: item.y * gridSize,
        width: actualWidth * gridSize,
        height: actualHeight * gridSize,
      }}
    >
      {renderItem()}
      
      {/* Etykieta przy wybraniu */}
      {isSelected && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap shadow-lg z-50">
          {item.name}
        </div>
      )}
    </div>
  );
}

// Komponenty graficzne w stylu izometrycznym

function Desk({ width, height, rotation }: { width: number; height: number; rotation: number }) {
  return (
    <div className="w-full h-full p-1" style={{ transform: `rotate(${rotation}deg)` }}>
      <div className="w-full h-full relative">
        {/* Cień pod biurkiem */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[95%] h-2 bg-black/30 blur-md rounded-full" />
        
        {/* Nogi biurka */}
        <div className="absolute bottom-2 left-2 w-1.5 h-4 bg-gradient-to-r from-[#4a3319] to-[#5d4024] rounded-sm shadow-md" />
        <div className="absolute bottom-2 right-2 w-1.5 h-4 bg-gradient-to-r from-[#4a3319] to-[#5d4024] rounded-sm shadow-md" />
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-[#2a1a0f] rounded-full" />
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-[#2a1a0f] rounded-full" />
        
        {/* Blat biurka z więcej szczegółami */}
        <div className="absolute inset-0 top-1 bg-gradient-to-br from-[#a0826d] via-[#8b6f47] to-[#654321] rounded-md shadow-2xl border-2 border-[#4a3319]">
          {/* Górna część blatu - połysk */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 rounded-md" />
          
          {/* Tekstura drewna */}
          <div className="absolute inset-2 opacity-30">
            <div className="w-full h-0.5 bg-[#654321] mt-1" />
            <div className="w-full h-0.5 bg-[#654321] mt-3" />
            <div className="w-full h-0.5 bg-[#654321] mt-5" />
            <div className="w-3/4 h-0.5 bg-[#654321] mt-2 ml-2" />
          </div>
          
          {/* Boczna krawędź */}
          <div className="absolute -bottom-1 inset-x-0 h-1.5 bg-gradient-to-b from-[#654321] to-[#4a3319] rounded-b-md" />
        </div>
        
        {/* Monitor z więcej szczegółami */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-2/5 h-3/5 z-10">
          {/* Podstawa monitora */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1.5 bg-gradient-to-b from-[#475569] to-[#1e293b] rounded-sm" />
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-2 bg-gradient-to-b from-[#64748b] to-[#475569] rounded-t-sm" />
          
          {/* Ramka monitora */}
          <div className="absolute inset-x-0 top-0 bottom-3 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-lg border-2 border-[#0f172a] shadow-xl">
            {/* Ekran */}
            <div className="absolute inset-1 bg-gradient-to-br from-[#1e40af] via-[#3b82f6] to-[#1e40af] rounded-md overflow-hidden">
              {/* Refleks na ekranie */}
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 to-transparent" />
              
              {/* Symulacja interfejsu */}
              <div className="absolute top-2 left-1 right-1 h-1 bg-[#1e293b]/50 rounded-sm" />
              <div className="absolute top-4 left-1 w-2/3 h-3 bg-white/10 rounded-sm" />
              <div className="absolute top-4 right-1 w-1/4 h-3 bg-white/10 rounded-sm" />
            </div>
            
            {/* Dioda LED */}
            <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-green-400 rounded-full shadow-[0_0_4px_rgba(34,197,94,0.8)]" />
          </div>
        </div>
        
        {/* Klawiatura */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1/3 h-1.5 bg-gradient-to-b from-[#1f2937] to-[#111827] rounded-sm border border-[#374151] z-10">
          <div className="absolute inset-0.5 grid grid-cols-8 gap-px p-px">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="bg-[#374151] rounded-[1px]" />
            ))}
          </div>
        </div>
        
        {/* Mysz */}
        <div className="absolute bottom-3 right-4 w-1 h-1.5 bg-gradient-to-br from-[#374151] to-[#1f2937] rounded-full border border-[#1f2937] z-10" />
      </div>
    </div>
  );
}

function Chair({ rotation }: { rotation: number }) {
  return (
    <div className="w-full h-full p-1" style={{ transform: `rotate(${rotation}deg)` }}>
      <div className="w-full h-full relative">
        {/* Cień */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1.5 bg-black/30 blur-sm rounded-full" />
        
        {/* Podstawa z kółkami */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-b from-[#1f2937] to-[#0f172a] rounded-full shadow-md" />
        
        {/* Kółka */}
        <div className="absolute bottom-0.5 left-1/4 w-1 h-1 bg-[#374151] rounded-full border border-[#1f2937]" />
        <div className="absolute bottom-0.5 right-1/4 w-1 h-1 bg-[#374151] rounded-full border border-[#1f2937]" />
        
        {/* Tuba gazowa */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-gradient-to-b from-[#475569] via-[#334155] to-[#1e293b] rounded-sm shadow-lg">
          <div className="absolute inset-y-2 left-0 w-0.5 h-1 bg-white/20 rounded-full" />
        </div>
        
        {/* Siedzisko */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-4/5 h-5 bg-gradient-to-br from-[#6b7280] via-[#4b5563] to-[#374151] rounded-xl shadow-2xl border-2 border-[#1f2937]">
          {/* Pikowanie siedziska */}
          <div className="absolute inset-1 bg-gradient-to-br from-[#9ca3af] via-[#6b7280] to-[#4b5563] rounded-lg">
            <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-black/20 rounded-full" />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-black/20 rounded-full" />
            <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-black/20 rounded-full" />
            <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-black/20 rounded-full" />
          </div>
          
          {/* Połysk */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-xl" />
        </div>
        
        {/* Oparcie */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3/4 h-11 bg-gradient-to-b from-[#6b7280] via-[#4b5563] to-[#374151] rounded-t-xl shadow-2xl border-2 border-[#1f2937]">
          {/* Wewnętrzna część oparcia */}
          <div className="absolute inset-1 bg-gradient-to-b from-[#9ca3af] via-[#6b7280] to-[#4b5563] rounded-t-lg">
            {/* Pikowanie */}
            <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-black/20 rounded-full" />
            <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-black/20 rounded-full" />
            <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-black/20 rounded-full" />
            <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-black/20 rounded-full" />
            <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-black/20 rounded-full" />
            <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-black/20 rounded-full" />
          </div>
          
          {/* Połysk na oparciu */}
          <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-gradient-to-b from-white/30 to-transparent rounded-t-lg" />
          
          {/* Zagłówek */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2/3 h-3 bg-gradient-to-b from-[#6b7280] to-[#4b5563] rounded-t-lg border-2 border-[#1f2937]" />
        </div>
        
        {/* Podłokietniki */}
        <div className="absolute top-8 left-0 w-1.5 h-6 bg-gradient-to-b from-[#374151] to-[#1f2937] rounded-md shadow-lg" />
        <div className="absolute top-8 right-0 w-1.5 h-6 bg-gradient-to-b from-[#374151] to-[#1f2937] rounded-md shadow-lg" />
      </div>
    </div>
  );
}

function MeetingTable({ width, height, rotation }: { width: number; height: number; rotation: number }) {
  return (
    <div className="w-full h-full p-1" style={{ transform: `rotate(${rotation}deg)` }}>
      <div className="w-full h-full relative">
        {/* Cień pod stołem */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[95%] h-3 bg-black/40 blur-lg rounded-full" />
        
        {/* Nogi stołu */}
        <div className="absolute bottom-2 left-3 w-2 h-5 bg-gradient-to-br from-[#5d4024] via-[#4a3319] to-[#2a1a0f] rounded-sm shadow-xl border border-[#2a1a0f]">
          <div className="absolute inset-0.5 bg-gradient-to-r from-white/10 to-transparent rounded-sm" />
        </div>
        <div className="absolute bottom-2 right-3 w-2 h-5 bg-gradient-to-br from-[#5d4024] via-[#4a3319] to-[#2a1a0f] rounded-sm shadow-xl border border-[#2a1a0f]">
          <div className="absolute inset-0.5 bg-gradient-to-r from-white/10 to-transparent rounded-sm" />
        </div>
        <div className="absolute bottom-2 left-3 w-2 h-2 bg-[#1a0f08] rounded-sm" />
        <div className="absolute bottom-2 right-3 w-2 h-2 bg-[#1a0f08] rounded-sm" />
        
        {/* Blat stołu */}
        <div className="absolute inset-0 top-1 bg-gradient-to-br from-[#b8956a] via-[#92704d] to-[#5d4024] rounded-xl shadow-2xl border-3 border-[#4a3319]">
          {/* Górna warstwa z połyskiem */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/40 rounded-xl" />
          
          {/* Szczegółowa tekstura drewna */}
          <div className="absolute inset-0 opacity-40">
            {/* Główne słoje */}
            <div className="absolute top-1/4 left-1/4 w-12 h-8 border-2 border-[#654321]/60 rounded-full" />
            <div className="absolute top-1/3 right-1/4 w-10 h-6 border-2 border-[#654321]/60 rounded-full" />
            <div className="absolute bottom-1/4 left-1/3 w-8 h-6 border-2 border-[#654321]/60 rounded-full" />
            
            {/* Linie drewna */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={i} 
                className="absolute w-full h-px bg-[#654321]/40" 
                style={{ top: `${(i + 1) * 8}%` }}
              />
            ))}
          </div>
          
          {/* Krawędź stołu */}
          <div className="absolute -bottom-1.5 inset-x-0 h-2 bg-gradient-to-b from-[#5d4024] via-[#4a3319] to-[#2a1a0f] rounded-b-xl border-t border-[#2a1a0f]" />
          
          {/* Dekoracyjny pasek */}
          <div className="absolute inset-2 border-2 border-[#654321]/30 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function Server({ width, height, rotation }: { width: number; height: number; rotation: number }) {
  return (
    <div className="w-full h-full p-1" style={{ transform: `rotate(${rotation}deg)` }}>
      <div className="w-full h-full relative">
        {/* Cień */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[90%] h-2 bg-black/50 blur-md rounded-full" />
        
        {/* Korpus serwera */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#020617] rounded-md shadow-2xl border-2 border-[#0f172a]">
          {/* Metaliczny połysk */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-md" />
          
          {/* Panele serwera z wieloma szczegółami */}
          <div className="absolute inset-2 space-y-0.5">
            {Array.from({ length: height > 1 ? 8 : 4 }).map((_, i) => (
              <div key={i} className="relative w-full h-2.5 bg-gradient-to-r from-[#334155] via-[#475569] to-[#334155] rounded-sm border border-[#1e293b] shadow-inner">
                {/* Slot dysku */}
                <div className="absolute inset-0.5 bg-gradient-to-r from-[#1e293b] to-[#0f172a] rounded-sm flex items-center px-1 gap-0.5">
                  {/* LEDy status */}
                  <div className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,1)] animate-pulse" />
                  <div 
                    className="w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_4px_rgba(59,130,246,1)] animate-pulse" 
                    style={{ animationDelay: '0.3s' }}
                  />
                  <div 
                    className="w-1 h-1 rounded-full bg-amber-500 shadow-[0_0_3px_rgba(245,158,11,1)] animate-pulse" 
                    style={{ animationDelay: '0.6s' }}
                  />
                  
                  {/* Linie wentylacji */}
                  <div className="flex-1 flex items-center gap-px ml-1">
                    {Array.from({ length: 8 }).map((_, j) => (
                      <div key={j} className="w-px h-1 bg-[#475569]" />
                    ))}
                  </div>
                </div>
                
                {/* Naklejka */}
                {i === 0 && (
                  <div className="absolute right-1 top-0.5 w-3 h-1.5 bg-gradient-to-br from-blue-500 to-blue-700 rounded-[1px] text-[4px] flex items-center justify-center text-white font-bold">
                    SRV
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Panel przedni z portami */}
          <div className="absolute bottom-1 left-1 right-1 h-2 bg-gradient-to-r from-[#0f172a] to-[#1e293b] rounded-sm border border-[#334155]">
            <div className="absolute inset-0 flex items-center justify-center gap-0.5 px-1">
              {/* Porty USB */}
              <div className="w-1 h-1 bg-[#1e293b] border border-[#475569] rounded-[1px]" />
              <div className="w-1 h-1 bg-[#1e293b] border border-[#475569] rounded-[1px]" />
              {/* Przycisk power */}
              <div className="w-1.5 h-1.5 bg-gradient-to-br from-green-600 to-green-800 rounded-full border border-green-900 shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Printer({ rotation }: { rotation: number }) {
  return (
    <div className="w-full h-full p-1" style={{ transform: `rotate(${rotation}deg)` }}>
      <div className="w-full h-full relative">
        {/* Cień */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-1.5 bg-black/40 blur-md rounded-full" />
        
        {/* Korpus drukarki */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f3f4f6] via-[#e5e7eb] to-[#d1d5db] rounded-lg shadow-2xl border-2 border-[#9ca3af]">
          {/* Połysk plastiku */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-black/20 rounded-lg" />
          
          {/* Górna pokrywa */}
          <div className="absolute inset-1 top-1 h-1/3 bg-gradient-to-b from-[#f9fafb] to-[#e5e7eb] rounded-t-md border border-[#d1d5db]">
            {/* Szkło skanera */}
            <div className="absolute inset-1 bg-gradient-to-br from-[#3b82f6]/20 to-[#1e40af]/20 rounded-sm border border-[#bfdbfe]" />
          </div>
          
          {/* Panel LCD */}
          <div className="absolute top-2 right-1 w-2/5 h-1/4 bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#020617] rounded-md border-2 border-[#0f172a] shadow-lg">
            <div className="absolute inset-0.5 bg-gradient-to-br from-[#3b82f6] via-[#2563eb] to-[#1e40af] rounded-sm">
              {/* Tekst na LCD */}
              <div className="absolute top-0.5 left-0.5 right-0.5 h-px bg-white/40" />
              <div className="absolute top-1 left-0.5 w-1/2 h-px bg-white/30" />
            </div>
            {/* Przyciski */}
            <div className="absolute -bottom-1 left-1 flex gap-0.5">
              <div className="w-1 h-1 bg-gradient-to-b from-[#22c55e] to-[#16a34a] rounded-full border border-[#15803d]" />
              <div className="w-1 h-1 bg-gradient-to-b from-[#ef4444] to-[#dc2626] rounded-full border border-[#991b1b]" />
            </div>
          </div>
          
          {/* Tacka wyjściowa */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4/5 h-1 bg-gradient-to-b from-[#6b7280] to-[#4b5563] rounded-sm shadow-inner" />
          
          {/* Szczelina na papier */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-1.5 bg-[#0f172a] rounded-sm shadow-inner border border-[#1e293b]">
            {/* Widoczny papier */}
            <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-b from-white to-[#f3f4f6] rounded-sm" />
          </div>
          
          {/* Logo */}
          <div className="absolute top-1 left-1 w-2 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-sm flex items-center justify-center">
            <div className="w-1 h-0.5 bg-white rounded-full" />
          </div>
          
          {/* Wentylacja */}
          <div className="absolute bottom-1 right-1 flex gap-px">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-px h-2 bg-[#9ca3af]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Plant({ rotation }: { rotation: number }) {
  return (
    <div className="w-full h-full p-1" style={{ transform: `rotate(${rotation}deg)` }}>
      <div className="w-full h-full relative">
        {/* Cień */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-black/30 blur-sm rounded-full" />
        
        {/* Doniczka */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-2/5 bg-gradient-to-b from-[#ef4444] via-[#dc2626] to-[#991b1b] shadow-xl" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}>
          {/* Połysk na doniczce */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/30" />
          
          {/* Wzór na doniczce */}
          <div className="absolute top-1/4 left-0 right-0 h-px bg-white/30" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/30" />
          <div className="absolute top-3/4 left-0 right-0 h-px bg-white/30" />
        </div>
        
        {/* Ziemia */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/5 h-1.5 bg-gradient-to-b from-[#78350f] to-[#451a03] rounded-full" />
        
        {/* Roślina - liście */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-3/4">
          {/* Lewy liść */}
          <div className="absolute top-2 left-1 w-5 h-7 bg-gradient-to-br from-[#22c55e] via-[#16a34a] to-[#15803d] rounded-full transform -rotate-20 shadow-lg" style={{ clipPath: 'ellipse(45% 50% at 50% 50%)' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
            {/* Żyłka liścia */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#15803d]" />
            <div className="absolute top-1/3 left-1/2 w-2 h-px bg-[#15803d] transform -rotate-45" />
            <div className="absolute bottom-1/3 left-1/2 w-2 h-px bg-[#15803d] transform rotate-45" />
          </div>
          
          {/* Prawy liść */}
          <div className="absolute top-2 right-1 w-5 h-7 bg-gradient-to-bl from-[#22c55e] via-[#16a34a] to-[#15803d] rounded-full transform rotate-20 shadow-lg" style={{ clipPath: 'ellipse(45% 50% at 50% 50%)' }}>
            <div className="absolute inset-0 bg-gradient-to-bl from-white/30 to-transparent" />
            {/* Żyłka liścia */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#15803d]" />
            <div className="absolute top-1/3 left-1/2 w-2 h-px bg-[#15803d] transform rotate-45" />
            <div className="absolute bottom-1/3 left-1/2 w-2 h-px bg-[#15803d] transform -rotate-45" />
          </div>
          
          {/* Środkowy liść */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-8 bg-gradient-to-b from-[#22c55e] via-[#16a34a] to-[#15803d] rounded-full shadow-lg" style={{ clipPath: 'ellipse(45% 50% at 50% 50%)' }}>
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />
            {/* Żyłka liścia */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#15803d]" />
            <div className="absolute top-1/4 left-1/2 w-2 h-px bg-[#15803d] transform -rotate-45" />
            <div className="absolute top-1/4 left-1/2 w-2 h-px bg-[#15803d] transform rotate-45" />
            <div className="absolute top-1/2 left-1/2 w-1.5 h-px bg-[#15803d] transform -rotate-45" />
            <div className="absolute top-1/2 left-1/2 w-1.5 h-px bg-[#15803d] transform rotate-45" />
          </div>
          
          {/* Mniejsze liście w tle */}
          <div className="absolute top-4 left-2 w-3 h-4 bg-gradient-to-br from-[#16a34a] to-[#15803d] rounded-full transform -rotate-30 opacity-70" />
          <div className="absolute top-4 right-2 w-3 h-4 bg-gradient-to-bl from-[#16a34a] to-[#15803d] rounded-full transform rotate-30 opacity-70" />
        </div>
      </div>
    </div>
  );
}

function Lamp({ rotation }: { rotation: number }) {
  return (
    <div className="w-full h-full p-1" style={{ transform: `rotate(${rotation}deg)` }}>
      <div className="w-full h-full relative">
        {/* Cień */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-black/30 blur-sm rounded-full" />
        
        {/* Podstawa */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1.5 bg-gradient-to-b from-[#4b5563] via-[#374151] to-[#1f2937] rounded-full shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full" />
          {/* Guma antypoślizgowa */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-[#0f172a] rounded-full" />
        </div>
        
        {/* Słupek metalowy */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-3/4 bg-gradient-to-r from-[#6b7280] via-[#9ca3af] to-[#6b7280] shadow-md">
          {/* Metaliczny połysk */}
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/40 to-transparent" />
          {/* Segmenty */}
          <div className="absolute top-1/4 left-0 right-0 h-px bg-[#374151]" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-[#374151]" />
          <div className="absolute top-3/4 left-0 right-0 h-px bg-[#374151]" />
        </div>
        
        {/* Klosz */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-2/5 bg-gradient-to-b from-[#fde047] via-[#fbbf24] to-[#f59e0b] rounded-b-full shadow-2xl border-2 border-[#d97706]">
          {/* Połysk na kloszu */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-transparent rounded-b-full" />
          
          {/* Żarówka wewnątrz */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-2 bg-gradient-to-b from-white via-[#fef3c7] to-[#fde047] rounded-full shadow-[0_0_8px_rgba(254,243,199,0.8)]" />
          
          {/* Gwint żarówki */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full h-px bg-[#9ca3af] mb-px" />
            ))}
          </div>
          
          {/* Świecenie - efekt światła */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-300 rounded-full blur-lg opacity-60 animate-pulse" />
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-200 rounded-full blur-xl opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        
        {/* Obręcz mocująca */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-gradient-to-b from-[#6b7280] to-[#4b5563] rounded-sm shadow-md" />
      </div>
    </div>
  );
}

function CoffeeMachine({ rotation }: { rotation: number }) {
  return (
    <div className="w-full h-full p-1" style={{ transform: `rotate(${rotation}deg)` }}>
      <div className="w-full h-full relative">
        {/* Cień */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-2 bg-black/40 blur-md rounded-full" />
        
        {/* Korpus ekspresu */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#92400e] via-[#78350f] to-[#451a03] rounded-lg shadow-2xl border-2 border-[#292524]">
          {/* Połysk plastiku */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/30 rounded-lg" />
          
          {/* Panel boczny */}
          <div className="absolute inset-y-2 left-1 w-1 bg-gradient-to-b from-[#451a03] to-[#1c0a00] rounded-sm" />
          
          {/* Pojemnik na wodę */}
          <div className="absolute top-1 right-1 w-2/5 h-3/5 bg-gradient-to-br from-[#3b82f6]/40 via-[#2563eb]/30 to-[#1e40af]/40 rounded-md border-2 border-[#1e40af]/50 shadow-inner">
            {/* Poziom wody */}
            <div className="absolute bottom-0 inset-x-0 h-3/4 bg-gradient-to-t from-[#3b82f6]/50 to-[#60a5fa]/30 rounded-b-sm" />
            
            {/* Bąbelki */}
            <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-white/60 rounded-full" />
            <div className="absolute bottom-2 right-1 w-0.5 h-0.5 bg-white/60 rounded-full" />
            <div className="absolute bottom-3 left-1.5 w-0.5 h-0.5 bg-white/60 rounded-full" />
            
            {/* Skala poziomu */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="absolute right-0 w-1 h-px bg-white/30" style={{ top: `${(i + 1) * 20}%` }} />
            ))}
          </div>
          
          {/* Dysza/Wylot kawy */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-2/5 h-1/4 bg-gradient-to-b from-[#1f2937] via-[#0f172a] to-[#020617] rounded-t-lg shadow-xl border border-[#0f172a]">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-t-lg" />
            {/* Otwór dyszy */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1.5 bg-[#000] rounded-b-sm">
              <div className="absolute inset-x-1 top-0 h-px bg-[#451a03]" />
            </div>
          </div>
          
          {/* Tacka ociekowa */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-1.5 bg-gradient-to-b from-[#1f2937] to-[#0f172a] rounded-sm border border-[#374151] shadow-inner">
            {/* Kratka */}
            <div className="absolute inset-0.5 grid grid-cols-6 gap-px">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-[#374151]" />
              ))}
            </div>
          </div>
          
          {/* Panel sterowania */}
          <div className="absolute top-1/2 left-1 w-2/5 h-1/4 bg-gradient-to-br from-[#1f2937] to-[#0f172a] rounded-md border border-[#374151] shadow-lg">
            {/* Przyciski */}
            <div className="absolute top-1 left-1 flex gap-0.5">
              <div className="w-1.5 h-1.5 bg-gradient-to-br from-[#ef4444] to-[#dc2626] rounded-full border border-[#991b1b] shadow-[0_0_4px_rgba(239,68,68,0.6)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-full" />
              </div>
              <div className="w-1.5 h-1.5 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-full border border-[#15803d] shadow-[0_0_4px_rgba(34,197,94,0.6)]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-full" />
              </div>
            </div>
            
            {/* Mały wyświetlacz */}
            <div className="absolute bottom-1 left-1 right-1 h-1 bg-gradient-to-r from-[#065f46] to-[#064e3b] rounded-sm border border-[#065f46]">
              <div className="absolute top-0 left-1 w-1 h-px bg-green-400 animate-pulse" />
            </div>
          </div>
          
          {/* Logo */}
          <div className="absolute top-1 left-1.5 w-2.5 h-1.5 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] rounded-sm flex items-center justify-center border border-[#d97706] shadow-md">
            <div className="text-[6px] text-[#451a03] font-bold">☕</div>
          </div>
          
          {/* Para nad ekspresem */}
          <div className="absolute -top-2 left-1/3 w-1 h-2 bg-white/20 blur-sm rounded-full animate-pulse" />
          <div className="absolute -top-3 left-1/2 w-1 h-2 bg-white/20 blur-sm rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>
    </div>
  );
}