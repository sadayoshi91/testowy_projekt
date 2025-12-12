import { DollarSign, Users, Calendar, TrendingUp, Play, Pause, FastForward } from 'lucide-react';

interface TopBarProps {
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  gameSpeed: number;
  setGameSpeed: (speed: number) => void;
}

export function TopBar({ isPaused, setIsPaused, gameSpeed, setGameSpeed }: TopBarProps) {
  const companyStats = {
    money: 1250000,
    monthlyProfit: 45000,
    employees: 24,
    reputation: 87,
    date: 'Styczeń 2025'
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="h-14 bg-[#252525] border-b border-[#3a3a3a] flex items-center justify-between px-6">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center">
            <span>TC</span>
          </div>
          <span className="font-semibold">TechCorp Industries</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-green-400">{formatMoney(companyStats.money)}</span>
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className={companyStats.monthlyProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}>
              {companyStats.monthlyProfit >= 0 ? '+' : ''}{formatMoney(companyStats.monthlyProfit)}/mies.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400">{companyStats.employees}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400">{companyStats.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-[#1a1a1a] rounded-full">
              <span className="text-yellow-400">★ {companyStats.reputation}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="p-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded transition-colors"
        >
          {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
        </button>

        <div className="flex items-center gap-1 bg-[#1a1a1a] rounded p-1">
          {[1, 2, 3].map((speed) => (
            <button
              key={speed}
              onClick={() => setGameSpeed(speed)}
              className={`px-3 py-1 rounded transition-colors ${
                gameSpeed === speed 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-[#2a2a2a]'
              }`}
            >
              {speed === 1 && '1x'}
              {speed === 2 && '2x'}
              {speed === 3 && <FastForward className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
