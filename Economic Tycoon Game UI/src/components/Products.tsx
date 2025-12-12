import { useState } from 'react';
import { Package, Plus, Users, DollarSign, TrendingUp, Star, Calendar } from 'lucide-react';

export function Products() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const products = [
    {
      id: 1,
      name: 'CloudSync Pro',
      category: 'Cloud Storage',
      version: '2.4.1',
      status: 'active',
      users: 12400,
      monthlyRevenue: 87000,
      rating: 4.8,
      development: 100,
      releaseDate: '2023-06-15',
      features: ['256-bit encryption', 'Real-time sync', 'Team collaboration', 'API access'],
      marketShare: 34,
    },
    {
      id: 2,
      name: 'DataFlow Manager',
      category: 'Data Analytics',
      version: '1.8.3',
      status: 'active',
      users: 8900,
      monthlyRevenue: 56000,
      rating: 4.6,
      development: 100,
      releaseDate: '2023-09-20',
      features: ['Advanced analytics', 'Custom dashboards', 'Export tools', 'Integration API'],
      marketShare: 22,
    },
    {
      id: 3,
      name: 'SecureVault',
      category: 'Security',
      version: '3.1.0',
      status: 'active',
      users: 5600,
      monthlyRevenue: 46000,
      rating: 4.9,
      development: 100,
      releaseDate: '2023-03-10',
      features: ['Military-grade encryption', 'Biometric auth', 'Secure sharing', 'Audit logs'],
      marketShare: 18,
    },
    {
      id: 4,
      name: 'MobileApp X',
      category: 'Mobile Platform',
      version: '0.9.2',
      status: 'development',
      users: 0,
      monthlyRevenue: 0,
      rating: 0,
      development: 67,
      releaseDate: null,
      features: ['Cross-platform', 'Offline mode', 'Push notifications', 'In-app purchases'],
      marketShare: 0,
    },
  ];

  const totalUsers = products.reduce((sum, p) => sum + p.users, 0);
  const totalRevenue = products.reduce((sum, p) => sum + p.monthlyRevenue, 0);
  const activeProducts = products.filter(p => p.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Produkty</h1>
          <p className="text-gray-400">Zarządzaj portfolio produktów</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Nowy produkt</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Package className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-sm text-gray-400">Aktywne produkty</span>
          </div>
          <div className="text-2xl">{activeProducts}</div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm text-gray-400">Użytkownicy</span>
          </div>
          <div className="text-2xl">{totalUsers.toLocaleString('pl-PL')}</div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-sm text-gray-400">Przychody (mies.)</span>
          </div>
          <div className="text-2xl">{totalRevenue.toLocaleString('pl-PL')} zł</div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <span className="text-sm text-gray-400">Średnia ocena</span>
          </div>
          <div className="text-2xl">4.7</div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-colors"
            onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Package className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-400">{product.category}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs ${
                product.status === 'active' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {product.status === 'active' ? 'Aktywny' : 'W rozwoju'}
              </div>
            </div>

            {product.status === 'development' && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">Postęp rozwoju</span>
                  <span>{product.development}%</span>
                </div>
                <div className="h-2 bg-[#0f0f0f] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${product.development}%` }}
                  ></div>
                </div>
              </div>
            )}

            {product.status === 'active' && (
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Użytkownicy</div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span>{product.users.toLocaleString('pl-PL')}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Przychód</div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">{(product.monthlyRevenue / 1000).toFixed(0)}k</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Ocena</div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>
              </div>
            )}

            {selectedProduct === product.id && (
              <div className="pt-4 border-t border-[#3a3a3a] space-y-3">
                <div>
                  <div className="text-sm text-gray-400 mb-2">Funkcje</div>
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, idx) => (
                      <span key={idx} className="px-2 py-1 bg-[#0f0f0f] rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Wersja: </span>
                    <span>{product.version}</span>
                  </div>
                  {product.releaseDate && (
                    <div>
                      <span className="text-gray-400">Premiera: </span>
                      <span>{product.releaseDate}</span>
                    </div>
                  )}
                  {product.status === 'active' && (
                    <>
                      <div>
                        <span className="text-gray-400">Udział w rynku: </span>
                        <span>{product.marketShare}%</span>
                      </div>
                      <div>
                        <span className="text-gray-400">MRR: </span>
                        <span className="text-green-400">{product.monthlyRevenue.toLocaleString('pl-PL')} zł</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors">
                    Zarządzaj
                  </button>
                  <button className="flex-1 px-3 py-2 bg-[#0f0f0f] hover:bg-[#252525] rounded text-sm transition-colors">
                    Statystyki
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
