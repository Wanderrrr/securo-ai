import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Shield, 
  Plus, 
  Upload, 
  Eye, 
  Calendar, 
  DollarSign,
  FileText,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  LogOut,
  Search,
  Filter
} from 'lucide-react';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

// Wymuszenie re-kompilacji na Vercel @ 2025-09-24

// Typy dla aplikacji
interface Szkoda {
  id: string;
  numerSprawy: string;
  klient: string;
  pesel?: string;
  telefon?: string;
  adres?: string;
  typ: 'komunikacja' | 'nieruchomosc' | 'ubezpieczenie' | 'inne';
  status: 'nowa' | 'w_toku' | 'zakonczona' | 'odrzucona';
  wartoscSzkody: number;
  dataZgloszenia: Date;
  opis: string;
  zdjecia: string[];
  szansaPowodzenia: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'pracownik';
}

// Store Zustand
import { create } from 'zustand';

interface AppState {
  user: User | null;
  szkody: Szkoda[];
  isLoading: boolean;
  setUser: (user: User | null) => void;
  addSzkoda: (szkoda: Omit<Szkoda, 'id'>) => void;
  updateSzkoda: (id: string, updates: Partial<Szkoda>) => void;
  setLoading: (loading: boolean) => void;
}

const useStore = create<AppState>((set, get) => ({
  user: null,
  szkody: [
    {
      id: '1',
      numerSprawy: 'SC/2024/001',
      klient: 'Jan Kowalski',
      pesel: '85011512345',
      telefon: '501 123 456',
      adres: 'ul. Testowa 1, 00-001 Warszawa',
      typ: 'komunikacja',
      status: 'w_toku',
      wartoscSzkody: 15000,
      dataZgloszenia: new Date('2024-01-15'),
      opis: 'Kolizja na skrzyżowaniu, uszkodzony przód pojazdu',
      zdjecia: [],
      szansaPowodzenia: 85
    },
    {
      id: '2', 
      numerSprawy: 'SC/2024/002',
      klient: 'Anna Nowak',
      pesel: '92032054321',
      telefon: '602 234 567',
      adres: 'ul. Przykładowa 5, 30-002 Kraków',
      typ: 'nieruchomosc',
      status: 'nowa',
      wartoscSzkody: 25000,
      dataZgloszenia: new Date('2024-01-20'),
      opis: 'Zalanie mieszkania przez sąsiada z góry',
      zdjecia: [],
      szansaPowodzenia: 92
    },
    {
      id: '3',
      numerSprawy: 'SC/2024/003', 
      klient: 'Piotr Wiśniewski',
      pesel: '78110587654',
      telefon: '703 345 678',
      adres: 'ul. Leśna 10, 80-123 Gdańsk',
      typ: 'ubezpieczenie',
      status: 'zakonczona',
      wartoscSzkody: 8000,
      dataZgloszenia: new Date('2024-01-10'),
      opis: 'Odmowa wypłaty odszkodowania przez ubezpieczyciela',
      zdjecia: [],
      szansaPowodzenia: 78
    }
  ],
  isLoading: false,
  setUser: (user) => set({ user }),
  addSzkoda: (szkoda) => set((state) => ({ 
    szkody: [...state.szkody, { ...szkoda, id: Date.now().toString() }] 
  })),
  updateSzkoda: (id, updates) => set((state) => ({
    szkody: state.szkody.map(s => s.id === id ? { ...s, ...updates } : s)
  })),
  setLoading: (isLoading) => set({ isLoading })
}));

// Komponenty

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const setUser = useStore(state => state.setUser);
  const setLoading = useStore(state => state.setLoading);

  const onSubmit = async (data: any) => {
    setLoading(true);
    // Symulacja logowania
    setTimeout(() => {
      setUser({
        id: '1',
        name: 'Admin Securo',
        email: data.email,
        role: 'admin'
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">SECURO AI</h1>
          <p className="text-gray-600 mt-2">System zarządzania szkodami</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              {...register('email', { required: true })}
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="twoj@email.com"
              defaultValue="admin@securo.pl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hasło
            </label>
            <input
              {...register('password', { required: true })}
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
              defaultValue="securo123"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Zaloguj się
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Demo:</strong> admin@securo.pl / securo123
          </p>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, icon: Icon, color, change }: any) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change && (
          <p className={`text-sm flex items-center mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            {change > 0 ? '+' : ''}{change}%
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const SzkodaCard = ({ szkoda, onClick }: { szkoda: Szkoda; onClick: () => void }) => {
  const statusColors = {
    nowa: 'bg-blue-100 text-blue-800',
    w_toku: 'bg-yellow-100 text-yellow-800', 
    zakonczona: 'bg-green-100 text-green-800',
    odrzucona: 'bg-red-100 text-red-800'
  };

  const statusIcons = {
    nowa: AlertCircle,
    w_toku: Clock,
    zakonczona: CheckCircle,
    odrzucona: AlertCircle
  };

  const StatusIcon = statusIcons[szkoda.status];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{szkoda.numerSprawy}</h3>
          <p className="text-gray-600">{szkoda.klient}</p>
          {szkoda.telefon && (
            <p className="text-sm text-gray-500 mt-1">{szkoda.telefon}</p>
          )}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${statusColors[szkoda.status]}`}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {szkoda.status.replace('_', ' ')}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Typ:</span>
          <span className="capitalize">{szkoda.typ}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Wartość:</span>
          <span className="font-medium">{szkoda.wartoscSzkody.toLocaleString()} zł</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Data:</span>
          <span>{format(szkoda.dataZgloszenia, 'dd.MM.yyyy', { locale: pl })}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Szanse:</span>
          <span className="font-medium text-green-600">{szkoda.szansaPowodzenia}%</span>
        </div>
      </div>

      <div className="mt-4 bg-gray-50 rounded-lg p-3">
        <p className="text-sm text-gray-700 line-clamp-2">{szkoda.opis}</p>
      </div>
    </div>
  );
};

const AddSzkodaForm = ({ onClose }: { onClose: () => void }) => {
  const { register, handleSubmit, reset } = useForm();
  const addSzkoda = useStore(state => state.addSzkoda);
  const [files, setFiles] = useState<File[]>([]);

  const onSubmit = (data: any) => {
    const szkoda: Omit<Szkoda, 'id'> = {
      ...data,
      dataZgloszenia: new Date(),
      status: 'nowa',
      wartoscSzkody: parseFloat(data.wartoscSzkody),
      zdjecia: files.map(f => f.name),
      szansaPowodzenia: Math.floor(Math.random() * 30) + 70 // AI symulacja 70-100%
    };
    
    addSzkoda(szkoda);
    reset();
    setFiles([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Dodaj nową szkodę</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Klient
              </label>
              <input
                {...register('klient', { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Imię i nazwisko"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PESEL
              </label>
              <input
                {...register('pesel')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="PESEL"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefon
              </label>
              <input
                {...register('telefon')}
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Numer telefonu"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adres
              </label>
              <input
                {...register('adres')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Adres zamieszkania"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Typ szkody
            </label>
            <select
              {...register('typ', { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="komunikacja">Komunikacja</option>
              <option value="nieruchomosc">Nieruchomość</option>
              <option value="ubezpieczenie">Ubezpieczenie</option>
              <option value="inne">Inne</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wartość szkody (zł)
            </label>
            <input
              {...register('wartoscSzkody', { required: true })}
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opis szkody
            </label>
            <textarea
              {...register('opis', { required: true })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Szczegółowy opis szkody..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zdjęcia szkody
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Przeciągnij zdjęcia lub kliknij aby wybrać</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setFiles(Array.from(e.target.files || []))}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="mt-2 inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-100">
                Wybierz pliki
              </label>
            </div>
            {files.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Wybrane pliki: {files.map(f => f.name).join(', ')}</p>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Dodaj szkodę
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SzkodaDetails = ({ szkoda, onClose }: { szkoda: Szkoda; onClose: () => void }) => {
  const updateSzkoda = useStore(state => state.updateSzkoda);
  
  const statusOptions = [
    { value: 'nowa', label: 'Nowa', color: 'text-blue-600' },
    { value: 'w_toku', label: 'W toku', color: 'text-yellow-600' },
    { value: 'zakonczona', label: 'Zakończona', color: 'text-green-600' },
    { value: 'odrzucona', label: 'Odrzucona', color: 'text-red-600' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{szkoda.numerSprawy}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-4">Informacje podstawowe</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Klient:</span>
                    <span className="font-medium">{szkoda.klient}</span>
                  </div>
                  {szkoda.pesel && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">PESEL:</span>
                      <span>{szkoda.pesel}</span>
                    </div>
                  )}
                  {szkoda.telefon && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Telefon:</span>
                      <span>{szkoda.telefon}</span>
                    </div>
                  )}
                  {szkoda.adres && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Adres:</span>
                      <span>{szkoda.adres}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Typ:</span>
                    <span className="capitalize">{szkoda.typ}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wartość:</span>
                    <span className="font-medium">{szkoda.wartoscSzkody.toLocaleString()} zł</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data zgłoszenia:</span>
                    <span>{format(szkoda.dataZgloszenia, 'dd.MM.yyyy', { locale: pl })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <select 
                      value={szkoda.status}
                      onChange={(e) => updateSzkoda(szkoda.id, { status: e.target.value as any })}
                      className="border border-gray-300 rounded px-2 py-1"
                    >
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-medium text-green-800">AI Analiza</span>
                </div>
                <p className="text-green-700">
                  Szanse powodzenia: <span className="font-bold text-xl">{szkoda.szansaPowodzenia}%</span>
                </p>
                <p className="text-sm text-green-600 mt-1">
                  Na podstawie analizy podobnych przypadków
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Opis szkody</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">{szkoda.opis}</p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Dokumenty i zdjęcia</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Dodaj dokumenty sprawy</p>
                  <button className="mt-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100">
                    Przeglądaj pliki
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium mb-4">AI Rekomendacje</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Następne kroki</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Zebrać dodatkową dokumentację medyczną</li>
                  <li>• Skontaktować się z ubezpieczycielem</li>
                  <li>• Przygotować wycenę napraw</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Uwagi</h4>
                <p className="text-yellow-700 text-sm">
                  Sprawa wymaga szybkiej reakcji ze względu na zbliżające się terminy przedawnienia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const user = useStore(state => state.user);
  const szkody = useStore(state => state.szkody);
  const setUser = useStore(state => state.setUser);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedSzkoda, setSelectedSzkoda] = useState<Szkoda | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('wszystkie');

  const stats = {
    total: szkody.length,
    nowe: szkody.filter(s => s.status === 'nowa').length,
    wToku: szkody.filter(s => s.status === 'w_toku').length,
    zakonczone: szkody.filter(s => s.status === 'zakonczona').length,
    wartoscTotal: szkody.reduce((sum, s) => sum + s.wartoscSzkody, 0)
  };

  const filteredSzkody = szkody.filter(szkoda => {
    const matchesSearch = szkoda.klient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         szkoda.numerSprawy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'wszystkie' || szkoda.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">SECURO AI</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Witaj, {user?.name}</span>
              <button 
                onClick={() => setUser(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatsCard 
            title="Wszystkie sprawy" 
            value={stats.total}
            icon={FileText}
            color="bg-blue-600"
            change={12}
          />
          <StatsCard 
            title="Nowe" 
            value={stats.nowe}
            icon={AlertCircle}
            color="bg-yellow-600"
          />
          <StatsCard 
            title="W toku" 
            value={stats.wToku}
            icon={Clock}
            color="bg-orange-600"
          />
          <StatsCard 
            title="Zakończone" 
            value={stats.zakonczone}
            icon={CheckCircle}
            color="bg-green-600"
          />
          <StatsCard 
            title="Wartość szkód" 
            value={`${(stats.wartoscTotal / 1000).toFixed(0)}K zł`}
            icon={DollarSign}
            color="bg-purple-600"
            change={8}
          />
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 flex space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Szukaj spraw..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="wszystkie">Wszystkie statusy</option>
                <option value="nowa">Nowe</option>
                <option value="w_toku">W toku</option>
                <option value="zakonczona">Zakończone</option>
                <option value="odrzucona">Odrzucone</option>
              </select>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Dodaj szkodę
            </button>
          </div>
        </div>

        {/* Szkody Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSzkody.map(szkoda => (
            <SzkodaCard 
              key={szkoda.id} 
              szkoda={szkoda} 
              onClick={() => setSelectedSzkoda(szkoda)}
            />
          ))}
        </div>

        {filteredSzkody.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Brak szkód</h3>
            <p className="text-gray-600">
              {searchTerm || filterStatus !== 'wszystkie' 
                ? 'Nie znaleziono szkód pasujących do filtrów' 
                : 'Dodaj pierwszą szkodę aby rozpocząć'
              }
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddForm && <AddSzkodaForm onClose={() => setShowAddForm(false)} />}
      {selectedSzkoda && (
        <SzkodaDetails 
          szkoda={selectedSzkoda} 
          onClose={() => setSelectedSzkoda(null)} 
        />
      )}
    </div>
  );
};

// Główna aplikacja
export default function App() {
  const user = useStore(state => state.user);
  const isLoading = useStore(state => state.isLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-lg">Ładowanie SECURO AI...</p>
        </div>
      </div>
    );
  }

  return user ? <Dashboard /> : <LoginForm />;
}
