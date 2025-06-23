import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProyecto } from '@/context/ProyectoContext';
import Excavacion from './Excavacion';
import Anillo from './Anillo';
import Sector from './Sector';
import Panel from './Panel';
import AvancePanelView from '@/views/excavacion/AvancePanelView';

/**
 * Componente principal que orquesta la navegación entre los diferentes niveles jerárquicos:
 * Excavación -> Anillo -> Sector -> Panel
 */
const ExcavacionPage = () => {
  // Estado para controlar el nivel jerárquico actual
  const [currentView, setCurrentView] = useState('excavaciones'); // 'excavaciones', 'anillos', 'sectores', 'paneles'

  // Obtener el proyecto seleccionado del contexto
  const { proyectoActual, cargando, cambiarProyecto } = useProyecto();
  const navigate = useNavigate();

  // Redirigir a la selección de proyecto si no hay ninguno seleccionado
  useEffect(() => {
    if (!cargando && !proyectoActual) {
      navigate('/seleccion-proyecto');
    }
  }, [cargando, proyectoActual, navigate]);

  // Estados para almacenar las selecciones en cada nivel
  const [selectedExcavacion, setSelectedExcavacion] = useState(null);
  const [selectedAnillo, setSelectedAnillo] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);

  // Manejadores para la navegación entre niveles
  const handleSelectExcavacion = (excavacion) => {
    setSelectedExcavacion(excavacion);
    setCurrentView('anillos');
  };

  const handleSelectAnillo = (anillo) => {
    setSelectedAnillo(anillo);
    setCurrentView('sectores');
  };

  const handleSelectSector = (sector) => {
    setSelectedSector(sector);
    setCurrentView('paneles');
  };

  const handleBackToExcavaciones = () => {
    setCurrentView('excavaciones');
    setSelectedExcavacion(null);
    setSelectedAnillo(null);
    setSelectedSector(null);
  };

  const handleBackToAnillos = () => {
    setCurrentView('anillos');
    setSelectedAnillo(null);
    setSelectedSector(null);
  };

  const handleBackToSectores = () => {
    setCurrentView('sectores');
    setSelectedSector(null);
  };
  
  // Manejador para cambiar de proyecto
  const handleCambiarProyecto = () => {
    cambiarProyecto();
    navigate('/seleccion-proyecto');
  };

  // Renderizar la vista actual según el nivel jerárquico
  const renderCurrentView = () => {
    // Si está cargando o no hay proyecto seleccionado, mostrar mensaje
    if (cargando) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-slate-500">Cargando...</p>
        </div>
      );
    }
    
    if (!proyectoActual) {
      return (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <p className="text-slate-500">No hay proyecto seleccionado</p>
          <button
            onClick={handleCambiarProyecto}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Seleccionar Proyecto
          </button>
        </div>
      );
    }
    
    switch (currentView) {
      case 'excavaciones':
        return (
          <Excavacion
            proyecto={proyectoActual}
            onBack={handleCambiarProyecto}
            onSelectExcavacion={handleSelectExcavacion}
          />
        );
      case 'anillos':
        return (
          <Anillo
            excavacion={selectedExcavacion}
            onBack={handleBackToExcavaciones}
            onSelectAnillo={handleSelectAnillo}
          />
        );
      case 'sectores':
        return (
          <Sector
            anillo={selectedAnillo}
            onBack={handleBackToAnillos}
            onSelectSector={handleSelectSector}
          />
        );
      case 'paneles':
        return (
          <Panel
            sector={selectedSector}
            onBack={handleBackToSectores}
            onSelectPanel={(panel) => {
              // Si en el futuro hay un nivel más profundo, se implementaría aquí
            }}
          />
        );
      default:
        return (
          <Excavacion
            proyecto={proyectoActual}
            onBack={handleCambiarProyecto}
            onSelectExcavacion={handleSelectExcavacion}
          />
        );
    }
  };

  return (
    <div className="p-6">
      {renderCurrentView()}
    </div>
  );
};

export default ExcavacionPage;