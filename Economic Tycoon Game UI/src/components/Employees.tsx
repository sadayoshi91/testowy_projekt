import { useState } from 'react';
import { Users, Search, Plus, Star, TrendingUp, Briefcase } from 'lucide-react';

export function Employees() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const employees = [
    { 
      id: 1, 
      name: 'Anna Kowalska', 
      role: 'Senior Developer', 
      department: 'development', 
      salary: 12000, 
      happiness: 92, 
      skills: { programming: 95, design: 45, marketing: 20 },
      hireDate: '2023-03-15'
    },
    { 
      id: 2, 
      name: 'Jan Nowak', 
      role: 'Lead Designer', 
      department: 'design', 
      salary: 10500, 
      happiness: 88, 
      skills: { programming: 30, design: 98, marketing: 55 },
      hireDate: '2023-05-20'
    },
    { 
      id: 3, 
      name: 'Piotr Wiśniewski', 
      role: 'Marketing Manager', 
      department: 'marketing', 
      salary: 9500, 
      happiness: 85, 
      skills: { programming: 15, design: 40, marketing: 92 },
      hireDate: '2023-07-10'
    },
    { 
      id: 4, 
      name: 'Maria Lewandowska', 
      role: 'Junior Developer', 
      department: 'development', 
      salary: 6500, 
      happiness: 95, 
      skills: { programming: 68, design: 35, marketing: 25 },
      hireDate: '2024-01-08'
    },
    { 
      id: 5, 
      name: 'Tomasz Zieliński', 
      role: 'DevOps Engineer', 
      department: 'development', 
      salary: 11000, 
      happiness: 90, 
      skills: { programming: 88, design: 25, marketing: 20 },
      hireDate: '2023-09-12'
    },
    { 
      id: 6, 
      name: 'Katarzyna Szymańska', 
      role: 'UI/UX Designer', 
      department: 'design', 
      salary: 8500, 
      happiness: 87, 
      skills: { programming: 40, design: 93, marketing: 50 },
      hireDate: '2024-02-01'
    },
  ];

  const departments = [
    { id: 'all', name: 'Wszystkie', count: employees.length },
    { id: 'development', name: 'Rozwój', count: employees.filter(e => e.department === 'development').length },
    { id: 'design', name: 'Design', count: employees.filter(e => e.department === 'design').length },
    { id: 'marketing', name: 'Marketing', count: employees.filter(e => e.department === 'marketing').length },
  ];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const totalSalaries = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const averageHappiness = Math.round(employees.reduce((sum, emp) => sum + emp.happiness, 0) / employees.length);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">Pracownicy</h1>
          <p className="text-gray-400">Zarządzaj zespołem swojej firmy</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Zatrudnij pracownika</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-sm text-gray-400">Pracownicy</span>
          </div>
          <div className="text-2xl">{employees.length}</div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-sm text-gray-400">Płace (mies.)</span>
          </div>
          <div className="text-2xl">{totalSalaries.toLocaleString('pl-PL')} zł</div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <span className="text-sm text-gray-400">Średnie zadowolenie</span>
          </div>
          <div className="text-2xl">{averageHappiness}%</div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Briefcase className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm text-gray-400">Wolne stanowiska</span>
          </div>
          <div className="text-2xl">3</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Szukaj pracowników..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex gap-2">
          {departments.map(dept => (
            <button
              key={dept.id}
              onClick={() => setSelectedDepartment(dept.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedDepartment === dept.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#1a1a1a] border border-[#3a3a3a] hover:bg-[#252525]'
              }`}
            >
              {dept.name} ({dept.count})
            </button>
          ))}
        </div>
      </div>

      {/* Employees List */}
      <div className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#3a3a3a] bg-[#252525]">
                <th className="text-left py-3 px-4 text-sm text-gray-400">Pracownik</th>
                <th className="text-left py-3 px-4 text-sm text-gray-400">Stanowisko</th>
                <th className="text-left py-3 px-4 text-sm text-gray-400">Dział</th>
                <th className="text-left py-3 px-4 text-sm text-gray-400">Umiejętności</th>
                <th className="text-left py-3 px-4 text-sm text-gray-400">Zadowolenie</th>
                <th className="text-right py-3 px-4 text-sm text-gray-400">Pensja</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-[#2a2a2a] hover:bg-[#252525] transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <span>{employee.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <div>{employee.name}</div>
                        <div className="text-xs text-gray-500">Od {employee.hireDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">{employee.role}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      employee.department === 'development' ? 'bg-blue-500/20 text-blue-400' :
                      employee.department === 'design' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {employee.department === 'development' ? 'Rozwój' :
                       employee.department === 'design' ? 'Design' : 'Marketing'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <div className="text-xs">
                        <div className="text-gray-500 mb-1">Prog: {employee.skills.programming}</div>
                        <div className="w-16 h-1.5 bg-[#0f0f0f] rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: `${employee.skills.programming}%` }}></div>
                        </div>
                      </div>
                      <div className="text-xs">
                        <div className="text-gray-500 mb-1">Des: {employee.skills.design}</div>
                        <div className="w-16 h-1.5 bg-[#0f0f0f] rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500" style={{ width: `${employee.skills.design}%` }}></div>
                        </div>
                      </div>
                      <div className="text-xs">
                        <div className="text-gray-500 mb-1">Mkt: {employee.skills.marketing}</div>
                        <div className="w-16 h-1.5 bg-[#0f0f0f] rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: `${employee.skills.marketing}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-[#0f0f0f] rounded-full overflow-hidden max-w-[80px]">
                        <div 
                          className={`h-full ${
                            employee.happiness >= 90 ? 'bg-green-500' :
                            employee.happiness >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${employee.happiness}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{employee.happiness}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">{employee.salary.toLocaleString('pl-PL')} zł</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
