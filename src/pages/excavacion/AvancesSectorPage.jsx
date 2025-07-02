import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Truck, User, Calendar, FileText } from 'lucide-react';
import sectorService from '@/services/excavacion/sectorService';
import RegistrarAvanceSector from '@/components/excavacion/modales/RegistrarAvanceSector';

const AvancesSectorPage = () => {
  const { sectorId } = useParams();
  const navigate = useNavigate();
  const [sector, setSector] = useState(null);
  const [avances, setAvances] = useState([]);
  const [showRegistrarModal, setShowRegistrarModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const sectorData = await sectorService.getById(sectorId);
        setSector(sectorData);
        
        // Aquí cargarías los avances del sector
        // const avancesData = await avanceSectorService.getBySectorId(sectorId);
        // setAvances(avancesData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setLoading(false);
      }
    };

    if (sectorId) {
      fetchData();
    }
  }, [sectorId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAvanceCreated = () => {
    setShowRegistrarModal(false);
    // Recargar avances
    // fetchAvances();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Cargando avances...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header profesional */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-950 to-blue-800 p-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="text-white" size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Avances del Sector - {sector?.nombre || 'Sector'}
              </h1>
              <p className="text-blue-100 text-sm">
                Excavación y Remoción de Tierra • Profundidad: {sector?.profundidad || 0}m • Volumen: {sector?.volumen || 0}m³
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Botón para registrar nuevo avance */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Avances de Excavación</h2>
        <button
          onClick={() => setShowRegistrarModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          Registrar Avance de Excavación
        </button>
      </div>

      {/* Lista de avances */}
      {avances.length > 0 ? (
        <div className="grid gap-6">
          {avances.map((avance) => (
            <div key={avance.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Excavación - {avance.fecha}
                  </h3>
                  <p className="text-gray-600 mb-3">{avance.descripcion}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-500" />
                      <span className="text-gray-600">Encargado:</span>
                      <span className="font-medium">{avance.encargado}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck size={16} className="text-gray-500" />
                      <span className="text-gray-600">Camión:</span>
                      <span className="font-medium">{avance.camion}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-gray-500" />
                      <span className="text-gray-600">Área:</span>
                      <span className="font-medium">{avance.area} m²</span>
                    </div>
                  </div>
                </div>
                
                {avance.foto && (
                  <div className="ml-4">
                    <img 
                      src={avance.foto} 
                      alt="Avance de excavación" 
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <Truck size={24} className="text-gray-400" />
            </div>
            <div>
              <p className="text-gray-600 font-medium">No hay avances de excavación registrados</p>
              <p className="text-gray-500 mt-1">
                Registra el primer avance de excavación para este sector
              </p>
            </div>
            <button
              onClick={() => setShowRegistrarModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              <Plus size={16} />
              Registrar Primer Avance
            </button>
          </div>
        </div>
      )}

      {/* Modal para registrar avance */}
      {showRegistrarModal && (
        <RegistrarAvanceSector
          sectorId={sectorId}
          sector={sector}
          onClose={() => setShowRegistrarModal(false)}
          onSuccess={handleAvanceCreated}
        />
      )}
    </div>
  );
};

export default AvancesSectorPage;