import { useState } from 'react';
import { ArrowLeft, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Componentes
import AnilloCard from '@/components/excavacion/cards/AnilloCard';
import RegistrarAnillo from '@/components/excavacion/modales/RegistrarAnillo';

// Servicios
import anilloService from '@/services/excavacion/anilloService';

const Anillo = ({ excavacion, onBack, onSelectAnillo }) => {
  // Estados
  const [showRegistrarModal, setShowRegistrarModal] = useState(false);

  // Consulta de anillos con React Query
  const {
    data: anillos,
    isLoading,
    isError,
    error
  } = anilloService.useAnillosConProgresoQuery(excavacion?.id_excavacion);

  const handleAnilloClick = (anillo) => {
    if (onSelectAnillo) {
      onSelectAnillo(anillo);
    }
  };

  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-blue-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="text-blue-500" size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                {excavacion?.nombre} - Anillos
              </h1>
              <p className="text-slate-500">
                Profundidad: {excavacion?.profundidad}m • Volumen: {excavacion?.volumen}m³
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowRegistrarModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Plus size={18} /> Registrar Anillo
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin" size={32} />
            <span className="ml-2">Cargando anillos...</span>
          </div>
        ) : isError ? (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg">
            Error al cargar los anillos: {error?.message || 'Error desconocido'}
          </div>
        ) : anillos?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {anillos.map((anillo) => (
              <AnilloCard
                key={anillo.id_anillo}
                anillo={anillo}
                onClick={() => handleAnilloClick(anillo)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 p-8 rounded-lg text-center">
            <p className="text-slate-500 text-lg">
              No hay anillos registrados para esta excavación.
            </p>
            <button
              onClick={() => setShowRegistrarModal(true)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Registrar el primer anillo
            </button>
          </div>
        )}
      </div>

      {/* Modal para registrar anillo */}
      {showRegistrarModal && excavacion?.id_excavacion && (
        <RegistrarAnillo
          excavacionId={excavacion.id_excavacion}
          onClose={() => setShowRegistrarModal(false)}
        />
      )}
    </div>
  );
};

export default Anillo;