import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Package, Users, HardHat } from 'lucide-react';

// Componentes
import SearchBar from '@/components/ui/SearchBar';

// Definición de los módulos de administración
const modulos = [
  {
    id: 'camiones',
    nombre: 'Camiones',
    descripcion: 'Gestión de camiones y vehículos de transporte',
    icono: <Truck size={32} />,
    color: 'bg-blue-500',
    ruta: '/dashboard/administracion/camiones'
  },
  {
    id: 'materiales',
    nombre: 'Materiales',
    descripcion: 'Inventario y control de materiales de construcción',
    icono: <Package size={32} />,
    color: 'bg-green-500',
    ruta: '/dashboard/administracion/materiales'
  },
  {
    id: 'trabajadores',
    nombre: 'Trabajadores',
    descripcion: 'Gestión del personal de obra',
    icono: <Users size={32} />,
    color: 'bg-orange-500',
    ruta: '/dashboard/administracion/trabajadores'
  },
  {
    id: 'supervisores',
    nombre: 'Supervisores',
    descripcion: 'Control de supervisores y jefes de obra',
    icono: <HardHat size={32} />,
    color: 'bg-purple-500',
    ruta: '/dashboard/administracion/supervisores'
  },
];

const Administracion = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtrar módulos según término de búsqueda
  const modulosFiltrados = modulos.filter(modulo =>
    modulo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    modulo.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Administración</h1>
        <p className="text-slate-500">Gestiona los recursos y elementos externos de tus proyectos</p>
      </div>
      
      {/* Barra de búsqueda */}
      <div className="mb-8 max-w-md">
        <SearchBar
          placeholder="Buscar módulo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Grid de módulos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modulosFiltrados.map((modulo) => (
          <div 
            key={modulo.id}
            onClick={() => navigate(modulo.ruta)}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className={`${modulo.color} h-2 w-full`}></div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className={`${modulo.color} bg-opacity-10 p-3 rounded-lg mr-4`}>
                  <div className="text-white">
                    {modulo.icono}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {modulo.nombre}
                </h3>
              </div>
              <p className="text-slate-500">{modulo.descripcion}</p>
              <div className="mt-4 flex justify-end">
                <span className="text-sm text-blue-500 font-medium group-hover:text-blue-700 transition-colors">
                  Gestionar →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mensaje si no hay resultados */}
      {modulosFiltrados.length === 0 && (
        <div className="bg-slate-50 p-8 rounded-lg text-center">
          <p className="text-slate-500 text-lg">
            No se encontraron módulos que coincidan con la búsqueda.
          </p>
        </div>
      )}
    </div>
  );
};

export default Administracion;