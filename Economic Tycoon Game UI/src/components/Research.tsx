import { Lightbulb, Lock, CheckCircle2, Clock, Zap } from 'lucide-react';

export function Research() {
  const researchCategories = [
    {
      id: 'tech',
      name: 'Technologie',
      color: 'blue',
      items: [
        { 
          id: 1, 
          name: 'Cloud Computing Advanced', 
          description: 'Zaawansowane technologie chmurowe',
          cost: 50000, 
          time: 60, 
          progress: 100, 
          status: 'completed',
          benefits: '+20% wydajność serwerów, -15% koszty infrastruktury'
        },
        { 
          id: 2, 
          name: 'Machine Learning Integration', 
          description: 'Integracja uczenia maszynowego',
          cost: 75000, 
          time: 90, 
          progress: 45, 
          status: 'in-progress',
          benefits: 'Nowe funkcje AI w produktach'
        },
        { 
          id: 3, 
          name: 'Blockchain Technology', 
          description: 'Technologia blockchain',
          cost: 100000, 
          time: 120, 
          progress: 0, 
          status: 'locked',
          benefits: 'Zdecentralizowane aplikacje',
          requirement: 'Wymaga: Machine Learning Integration'
        },
      ]
    },
    {
      id: 'security',
      name: 'Bezpieczeństwo',
      color: 'red',
      items: [
        { 
          id: 4, 
          name: 'Advanced Encryption', 
          description: 'Zaawansowane szyfrowanie',
          cost: 40000, 
          time: 45, 
          progress: 100, 
          status: 'completed',
          benefits: '+30% bezpieczeństwo danych'
        },
        { 
          id: 5, 
          name: 'Biometric Authentication', 
          description: 'Uwierzytelnianie biometryczne',
          cost: 60000, 
          time: 75, 
          progress: 0, 
          status: 'available',
          benefits: 'Zaawansowana autoryzacja użytkowników'
        },
      ]
    },
    {
      id: 'ui',
      name: 'Interfejs użytkownika',
      color: 'purple',
      items: [
        { 
          id: 6, 
          name: 'Modern UI Framework', 
          description: 'Nowoczesny framework UI',
          cost: 35000, 
          time: 40, 
          progress: 100, 
          status: 'completed',
          benefits: '+25% zadowolenie użytkowników'
        },
        { 
          id: 7, 
          name: 'Adaptive UX Design', 
          description: 'Adaptacyjny design UX',
          cost: 45000, 
          time: 50, 
          progress: 78, 
          status: 'in-progress',
          benefits: '+15% retencja użytkowników'
        },
      ]
    },
    {
      id: 'performance',
      name: 'Wydajność',
      color: 'green',
      items: [
        { 
          id: 8, 
          name: 'Code Optimization', 
          description: 'Optymalizacja kodu',
          cost: 30000, 
          time: 35, 
          progress: 100, 
          status: 'completed',
          benefits: '+40% szybkość aplikacji'
        },
        { 
          id: 9, 
          name: 'Caching System Pro', 
          description: 'Zaawansowany system cache',
          cost: 50000, 
          time: 60, 
          progress: 0, 
          status: 'available',
          benefits: '-50% czas ładowania'
        },
      ]
    },
  ];

  const activeResearch = researchCategories
    .flatMap(cat => cat.items)
    .filter(item => item.status === 'in-progress');

  const completedCount = researchCategories
    .flatMap(cat => cat.items)
    .filter(item => item.status === 'completed').length;

  const totalCount = researchCategories
    .flatMap(cat => cat.items).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl mb-1">Badania i rozwój</h1>
        <p className="text-gray-400">Rozwijaj nowe technologie i ulepszenia</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Lightbulb className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-sm text-gray-400">Dostępne badania</span>
          </div>
          <div className="text-2xl">{totalCount}</div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-sm text-gray-400">Ukończone</span>
          </div>
          <div className="text-2xl">{completedCount}</div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <span className="text-sm text-gray-400">W trakcie</span>
          </div>
          <div className="text-2xl">{activeResearch.length}</div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm text-gray-400">Punkty badań</span>
          </div>
          <div className="text-2xl">150</div>
        </div>
      </div>

      {/* Active Research */}
      {activeResearch.length > 0 && (
        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-6">
          <h3 className="mb-4">Aktywne badania</h3>
          <div className="space-y-3">
            {activeResearch.map((research) => (
              <div key={research.id} className="bg-[#0f0f0f] rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    <div>
                      <div>{research.name}</div>
                      <div className="text-sm text-gray-400">{research.description}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">{research.progress}%</div>
                </div>
                <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-500 transition-all"
                    style={{ width: `${research.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Research Categories */}
      <div className="space-y-4">
        {researchCategories.map((category) => (
          <div key={category.id} className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full bg-${category.color}-500`}></div>
              {category.name}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {category.items.map((item) => (
                <div 
                  key={item.id} 
                  className={`bg-[#0f0f0f] rounded-lg p-4 border-2 transition-all ${
                    item.status === 'completed' ? 'border-green-500/30' :
                    item.status === 'in-progress' ? 'border-yellow-500/30' :
                    item.status === 'locked' ? 'border-gray-700 opacity-50' :
                    'border-transparent hover:border-blue-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg mt-1 ${
                        item.status === 'completed' ? 'bg-green-500/10' :
                        item.status === 'in-progress' ? 'bg-yellow-500/10' :
                        item.status === 'locked' ? 'bg-gray-500/10' :
                        'bg-blue-500/10'
                      }`}>
                        {item.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                        {item.status === 'in-progress' && <Clock className="w-5 h-5 text-yellow-400" />}
                        {item.status === 'locked' && <Lock className="w-5 h-5 text-gray-400" />}
                        {item.status === 'available' && <Lightbulb className="w-5 h-5 text-blue-400" />}
                      </div>
                      <div className="flex-1">
                        <div className="mb-1">{item.name}</div>
                        <div className="text-sm text-gray-400 mb-2">{item.description}</div>
                        {item.requirement && (
                          <div className="text-xs text-yellow-400 mb-2">{item.requirement}</div>
                        )}
                        <div className="text-xs text-gray-500">{item.benefits}</div>
                      </div>
                    </div>
                  </div>

                  {item.status === 'in-progress' && (
                    <div className="mb-3">
                      <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-500 transition-all"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-[#1a1a1a]">
                    <div className="flex gap-4 text-sm">
                      <div className="text-gray-400">
                        Koszt: <span className="text-white">{item.cost.toLocaleString('pl-PL')} zł</span>
                      </div>
                      <div className="text-gray-400">
                        Czas: <span className="text-white">{item.time} dni</span>
                      </div>
                    </div>
                    
                    {item.status === 'available' && (
                      <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors">
                        Rozpocznij
                      </button>
                    )}
                    {item.status === 'completed' && (
                      <div className="px-4 py-1.5 bg-green-500/20 text-green-400 rounded text-sm">
                        Ukończono
                      </div>
                    )}
                    {item.status === 'locked' && (
                      <div className="px-4 py-1.5 bg-gray-500/20 text-gray-400 rounded text-sm">
                        Zablokowane
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
