import { TrendingUp, TrendingDown, DollarSign, Users, Package, Star, AlertTriangle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Overview() {
  const revenueData = [
    { month: 'Sierpień', revenue: 120000, costs: 85000 },
    { month: 'Wrzesień', revenue: 135000, costs: 88000 },
    { month: 'Październik', revenue: 145000, costs: 92000 },
    { month: 'Listopad', revenue: 158000, costs: 95000 },
    { month: 'Grudzień', revenue: 172000, costs: 98000 },
    { month: 'Styczeń', revenue: 189000, costs: 102000 },
  ];

  const stats = [
    { label: 'Przychody (mies.)', value: '189 000 zł', change: '+9.8%', trend: 'up', icon: DollarSign, color: 'green' },
    { label: 'Koszty (mies.)', value: '102 000 zł', change: '+4.1%', trend: 'up', icon: TrendingUp, color: 'red' },
    { label: 'Zysk netto', value: '87 000 zł', change: '+16.4%', trend: 'up', icon: TrendingUp, color: 'green' },
    { label: 'Pracownicy', value: '24', change: '+2', trend: 'up', icon: Users, color: 'blue' },
  ];

  const activeProducts = [
    { name: 'CloudSync Pro', users: 12400, revenue: 87000, status: 'excellent' },
    { name: 'DataFlow Manager', users: 8900, revenue: 56000, status: 'good' },
    { name: 'SecureVault', users: 5600, revenue: 46000, status: 'good' },
  ];

  const notifications = [
    { type: 'warning', message: 'Projekt "MobileApp X" wymaga dodatkowych zasobów', time: '2h temu' },
    { type: 'info', message: 'Nowy pracownik rozpoczyna pracę od jutra', time: '5h temu' },
    { type: 'success', message: 'CloudSync Pro osiągnął 12000 użytkowników!', time: '1d temu' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl mb-1">Przegląd firmy</h1>
        <p className="text-gray-400">Bieżący stan Twojej firmy i kluczowe wskaźniki</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg bg-${stat.color}-500/10`}>
                  <Icon className={`w-5 h-5 text-${stat.color}-400`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-2xl mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-6">
          <h3 className="mb-4">Przychody i koszty (6 miesięcy)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3a3a3a" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #3a3a3a' }}
                labelStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="revenue" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="costs" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-6">
          <h3 className="mb-4">Wzrost użytkowników</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={[
              { month: 'Sie', users: 18000 },
              { month: 'Wrz', users: 20500 },
              { month: 'Paź', users: 22800 },
              { month: 'Lis', users: 24200 },
              { month: 'Gru', users: 25800 },
              { month: 'Sty', users: 26900 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3a3a3a" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #3a3a3a' }}
                labelStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Products and Notifications */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-6">
          <h3 className="mb-4">Aktywne produkty</h3>
          <div className="space-y-3">
            {activeProducts.map((product) => (
              <div key={product.name} className="bg-[#0f0f0f] rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-400" />
                    <span>{product.name}</span>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    product.status === 'excellent' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {product.status === 'excellent' ? 'Doskonały' : 'Dobry'}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{product.users.toLocaleString('pl-PL')} użytkowników</span>
                  <span className="text-green-400">{product.revenue.toLocaleString('pl-PL')} zł/mies.</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-6">
          <h3 className="mb-4">Powiadomienia</h3>
          <div className="space-y-3">
            {notifications.map((notification, index) => (
              <div key={index} className="bg-[#0f0f0f] rounded-lg p-4">
                <div className="flex items-start gap-3">
                  {notification.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />}
                  {notification.type === 'info' && <Users className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />}
                  {notification.type === 'success' && <Star className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />}
                  <div className="flex-1">
                    <p className="text-sm mb-1">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
