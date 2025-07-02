import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useProyecto } from '@/context/ProyectoContext';
import Excavacion from './Excavacion';
import Anillo from './Anillo';
import Sector from './Sector';
import Panel from './Panel';
import Avances from '../../views/excavacion/AvancePanelView';

/**
 * Componente principal que orquesta la navegación entre los diferentes niveles jerárquicos:
 * Excavación -> Anillo -> Sector -> Panel -> Avances
 */
const ExcavacionPage = () => {
  // Estado para controlar el nivel jerárquico actual
  const [currentView, setCurrentView] = useState('excavaciones');
  
  // Obtener hooks de React Router
  const { proyectoActual, cargando, cambiarProyecto } = useProyecto();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  // Estados para almacenar las selecciones en cada nivel
  const [selectedExcavacion, setSelectedExcavacion] = useState(null);
  const [selectedAnillo, setSelectedAnillo] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedPanel, setSelectedPanel] = useState(null);

  // INTERCEPTOR: Detectar navegación directa a avances
  useEffect(() => {
    const path = location.pathname;
    
    // Si la URL contiene /panel/{id}/avances, interceptar
    if (path.includes('/panel/') && path.includes('/avances')) {
      const panelId = params.panelId || path.match(/\/panel\/([^\/]+)/)?.[1];
      
      if (panelId && currentView !== 'avances') {
        console.log('Interceptando navegación directa a avances, panelId:', panelId);
        
        // Crear un objeto panel temporal con el ID
        const tempPanel = { id_panel: panelId };
        setSelectedPanel(tempPanel);
        setCurrentView('avances');
        
        // Opcional: Limpiar la URL para mantenerla limpia
        navigate('/dashboard/excavacion', { replace: true });
      }
    }
  }, [location.pathname, params.panelId, currentView, navigate]);

  // Redirigir a la selección de proyecto si no hay ninguno seleccionado
  useEffect(() => {
    if (!cargando && !proyectoActual) {
      navigate('/seleccion-proyecto');
    }
  }, [cargando, proyectoActual, navigate]);

  // Manejadores para la navegación entre niveles
  const handleSelectExcavacion = (excavacion) => {
    console.log('Seleccionando excavación:', excavacion);
    setSelectedExcavacion(excavacion);
    setSelectedAnillo(null);
    setSelectedSector(null);
    setSelectedPanel(null);
    setCurrentView('anillos');
  };

  const handleSelectAnillo = (anillo) => {
    console.log('Seleccionando anillo:', anillo);
    setSelectedAnillo(anillo);
    setSelectedSector(null);
    setSelectedPanel(null);
    setCurrentView('sectores');
  };

  const handleSelectSector = (sector) => {
    console.log('Seleccionando sector:', sector);
    setSelectedSector(sector);
    setSelectedPanel(null);
    setCurrentView('paneles');
  };

  const handleSelectPanel = (panel) => {
    console.log('Seleccionando panel para avances:', panel);
    setSelectedPanel(panel);
    setCurrentView('avances');
  };

  // Manejadores para navegación hacia atrás
  const handleBackToExcavaciones = () => {
    console.log('Volviendo a excavaciones');
    setCurrentView('excavaciones');
    setSelectedExcavacion(null);
    setSelectedAnillo(null);
    setSelectedSector(null);
    setSelectedPanel(null);
  };

  const handleBackToAnillos = () => {
    console.log('Volviendo a anillos');
    setCurrentView('anillos');
    setSelectedAnillo(null);
    setSelectedSector(null);
    setSelectedPanel(null);
  };

  const handleBackToSectores = () => {
    console.log('Volviendo a sectores');
    setCurrentView('sectores');
    setSelectedSector(null);
    setSelectedPanel(null);
  };

  const handleBackToPaneles = () => {
    console.log('Volviendo a paneles');
    setCurrentView('paneles');
    setSelectedPanel(null);
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
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500">Cargando...</p>
          </div>
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
    
    console.log('Renderizando vista:', currentView, {
      selectedExcavacion: selectedExcavacion?.nombre,
      selectedAnillo: selectedAnillo?.nombre,
      selectedSector: selectedSector?.nombre,
      selectedPanel: selectedPanel?.id_panel
    });
    
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
            onSelectPanel={handleSelectPanel}
          />
        );
      case 'avances':
        return (
          <Avances
            panelId={selectedPanel?.id_panel}
            panel={selectedPanel}
            onBack={handleBackToPaneles}
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