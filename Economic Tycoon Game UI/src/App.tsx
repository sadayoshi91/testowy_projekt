import { useState } from 'react';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { Overview } from './components/Overview';
import { Finances } from './components/Finances';
import { Employees } from './components/Employees';
import { Products } from './components/Products';
import { Research } from './components/Research';
import { Office } from './components/Office';

export type ViewType = 'overview' | 'finances' | 'employees' | 'products' | 'research' | 'office';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('overview');
  const [isPaused, setIsPaused] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(1);

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <Overview />;
      case 'finances':
        return <Finances />;
      case 'employees':
        return <Employees />;
      case 'products':
        return <Products />;
      case 'research':
        return <Research />;
      case 'office':
        return <Office />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="h-screen w-screen bg-[#1a1a1a] text-white flex flex-col overflow-hidden">
      <TopBar 
        isPaused={isPaused} 
        setIsPaused={setIsPaused}
        gameSpeed={gameSpeed}
        setGameSpeed={setGameSpeed}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        
        <main className="flex-1 overflow-auto bg-[#0f0f0f] p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
}