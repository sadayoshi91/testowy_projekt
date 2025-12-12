import { LayoutDashboard, TrendingUp, Users, Package, Lightbulb, Building2 } from 'lucide-react';
import { ViewType } from '../App';

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
}

export function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Przegląd', icon: LayoutDashboard },
    { id: 'finances', label: 'Finanse', icon: TrendingUp },
    { id: 'employees', label: 'Pracownicy', icon: Users },
    { id: 'products', label: 'Produkty', icon: Package },
    { id: 'research', label: 'Badania', icon: Lightbulb },
    { id: 'office', label: 'Biuro', icon: Building2 },
  ] as const;

  return (
    <aside className="w-56 bg-[#1a1a1a] border-r border-[#3a3a3a] flex flex-col">
      <nav className="flex-1 p-3">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as ViewType)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-[#252525] text-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-[#3a3a3a]">
        <div className="text-xs text-gray-500">
          <div>Wersja 1.0.0</div>
          <div className="mt-1">© 2025 TechCorp</div>
        </div>
      </div>
    </aside>
  );
}