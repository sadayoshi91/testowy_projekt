import { DollarSign, TrendingUp, TrendingDown, CreditCard, Wallet } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function Finances() {
  const monthlyData = [
    { month: 'Lip', income: 105000, expenses: 78000 },
    { month: 'Sie', income: 120000, expenses: 85000 },
    { month: 'Wrz', income: 135000, expenses: 88000 },
    { month: 'Paź', income: 145000, expenses: 92000 },
    { month: 'Lis', income: 158000, expenses: 95000 },
    { month: 'Gru', income: 172000, expenses: 98000 },
  ];

  const expenseBreakdown = [
    { name: 'Wynagrodzenia', value: 68000, color: '#3b82f6' },
    { name: 'Marketing', value: 15000, color: '#8b5cf6' },
    { name: 'Infrastruktura', value: 12000, color: '#10b981' },
    { name: 'Badania', value: 5000, color: '#f59e0b' },
    { name: 'Inne', value: 2000, color: '#6b7280' },
  ];

  const transactions = [
    { id: 1, date: '15 Sty 2025', description: 'Opłata za subskrypcję - CloudSync Pro', amount: 87000, type: 'income' },
    { id: 2, date: '15 Sty 2025', description: 'Opłata za subskrypcję - DataFlow Manager', amount: 56000, type: 'income' },
    { id: 3, date: '14 Sty 2025', description: 'Wypłaty pracowników', amount: -68000, type: 'expense' },
    { id: 4, date: '13 Sty 2025', description: 'Kampania marketingowa', amount: -15000, type: 'expense' },
    { id: 5, date: '12 Sty 2025', description: 'Serwery AWS', amount: -8500, type: 'expense' },
    { id: 6, date: '10 Sty 2025', description: 'Licencje oprogramowania', amount: -3500, type: 'expense' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl mb-1">Finanse</h1>
        <p className="text-gray-400">Zarządzaj finansami swojej firmy</p>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Wallet className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-sm text-gray-400">Saldo</span>
          </div>
          <div className="text-2xl text-green-400">1 250 000 zł</div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-sm text-gray-400">Przychody (mies.)</span>
          </div>
          <div className="text-2xl">189 000 zł</div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-red-500/10">
              <TrendingDown className="w-5 h-5 text-red-400" />
            </div>
            <span className="text-sm text-gray-400">Wydatki (mies.)</span>
          </div>
          <div className="text-2xl">102 000 zł</div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-sm text-gray-400">Zysk netto</span>
          </div>
          <div className="text-2xl text-emerald-400">87 000 zł</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-6">
          <h3 className="mb-4">Przychody vs Wydatki</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3a3a3a" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #3a3a3a' }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-6">
          <h3 className="mb-4">Struktura wydatków</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {expenseBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #3a3a3a' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {expenseBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-400">{item.name}</span>
                </div>
                <span>{item.value.toLocaleString('pl-PL')} zł</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-6">
        <h3 className="mb-4">Ostatnie transakcje</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#3a3a3a]">
                <th className="text-left py-3 px-4 text-sm text-gray-400">Data</th>
                <th className="text-left py-3 px-4 text-sm text-gray-400">Opis</th>
                <th className="text-left py-3 px-4 text-sm text-gray-400">Typ</th>
                <th className="text-right py-3 px-4 text-sm text-gray-400">Kwota</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-[#2a2a2a] hover:bg-[#252525] transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-400">{transaction.date}</td>
                  <td className="py-3 px-4">{transaction.description}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      transaction.type === 'income' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {transaction.type === 'income' ? 'Przychód' : 'Wydatek'}
                    </span>
                  </td>
                  <td className={`py-3 px-4 text-right ${
                    transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('pl-PL')} zł
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
