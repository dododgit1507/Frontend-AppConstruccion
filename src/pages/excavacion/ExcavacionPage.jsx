import { useState } from 'react';
import Proyecto from './Proyecto';
import Excavacion from './Excavacion';
import Anillo from './Anillo';

/**
 * Componente principal que orquesta la navegación entre los diferentes niveles jerárquicos:
 * Proyecto -> Excavación -> Anillo -> Sector -> Panel
 */
const ExcavacionPage = () => {
  // Estado para controlar el nivel jerárquico actual
  const [currentView, setCurrentView] = useState('proyectos'); // 'proyectos', 'excavaciones', 'anillos', 'sectores', 'paneles'
  
  // Estados para almacenar las selecciones en cada nivel
  const [selectedProyecto, setSelectedProyecto] = useState(null);
  const [selectedExcavacion, setSelectedExcavacion] = useState(null);
  const [selectedAnillo, setSelectedAnillo] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);

  // Manejadores para la navegación entre niveles
  const handleSelectProyecto = (proyecto) => {
    setSelectedProyecto(proyecto);
    setCurrentView('excavaciones');
  };

  const handleSelectExcavacion = (excavacion) => {
    setSelectedExcavacion(excavacion);
    setCurrentView('anillos');
  };

  const handleBackToProyectos = () => {
    setCurrentView('proyectos');
    setSelectedProyecto(null);
    setSelectedExcavacion(null);
    setSelectedAnillo(null);
    setSelectedSector(null);
  };

  const handleBackToExcavaciones = () => {
    setCurrentView('excavaciones');
    setSelectedExcavacion(null);
    setSelectedAnillo(null);
    setSelectedSector(null);
  };

  // Renderizar la vista actual según el nivel jerárquico
  const renderCurrentView = () => {
    switch (currentView) {
      case 'proyectos':
        return <Proyecto onSelectProyecto={handleSelectProyecto} />;
      case 'excavaciones':
        return (
          <Excavacion 
            proyecto={selectedProyecto} 
            onBack={handleBackToProyectos} 
            onSelectExcavacion={handleSelectExcavacion} 
          />
        );
      case 'anillos':
        return (
          <Anillo 
            excavacion={selectedExcavacion}
            onBack={handleBackToExcavaciones}
            onSelectAnillo={(anillo) => {
              setSelectedAnillo(anillo);
              // Aquí podríamos cambiar a la vista de sectores si se implementa en el futuro
              // setCurrentView('sectores');
            }}
          />
        );
      // Aquí se añadirían los casos para los demás niveles (sectores, paneles)
      default:
        return <Proyecto onSelectProyecto={handleSelectProyecto} />;
    }
  };

  return (
    <div className="p-6">
      {renderCurrentView()}
    </div>
  );
};

export default ExcavacionPage;