import { useState, useEffect } from 'react';
import ExcavacionCard from '@/components/excavacion/cards/ExcavacionCard';
import RegistrarProyecto from '@/components/excavacion/modales/RegistrarProyecto';
import proyectoService from '@/services/proyectoService';
import excavacionService from '@/services/excavacion/excavacionService';
import { Building, Plus } from 'lucide-react';
import { toast } from 'sonner';

const Proyecto = ({ onSelectProyecto }) => {
  // Estado para modal
  const [openProyectoModal, setOpenProyectoModal] = useState(false);
  
  // Estados para datos
  const [proyectos, setProyectos] = useState([]);
  const [proyectosConProgreso, setProyectosConProgreso] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar proyectos al montar el componente
  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        setLoading(true);
        const data = await proyectoService.getAll();
        setProyectos(data);
        
        // Obtener las excavaciones para cada proyecto y calcular el progreso
        await calcularProgresoProyectos(data);
      } catch (error) {
        console.error('Error al cargar proyectos:', error);
        toast.error('Error al cargar los proyectos');
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, [openProyectoModal]); // Recargar cuando se cierre el modal
  
  // Función para obtener las excavaciones de cada proyecto y calcular su progreso
  const calcularProgresoProyectos = async (proyectos) => {
    try {
      const proyectosActualizados = [];
      
      for (const proyecto of proyectos) {
        try {
          // Obtener las excavaciones del proyecto
          const excavaciones = await excavacionService.getByProyectoId(proyecto.id_proyecto);
          
          // Calcular el progreso basado en las excavaciones
          const progreso = excavacionService.calcularProgresoProyecto(excavaciones);
          
          // Añadir el progreso y las excavaciones al proyecto
          proyectosActualizados.push({
            ...proyecto,
            progreso,
            excavaciones
          });
        } catch (error) {
          console.error(`Error al obtener excavaciones para el proyecto ${proyecto.id_proyecto}:`, error);
          // Si hay error, añadir el proyecto sin progreso calculado
          proyectosActualizados.push({
            ...proyecto,
            progreso: 0,
            excavaciones: []
          });
        }
      }
      
      setProyectosConProgreso(proyectosActualizados);
    } catch (error) {
      console.error('Error al calcular el progreso de los proyectos:', error);
      toast.error('Error al calcular el progreso de los proyectos');
    }
  };

  const handleProyectoClick = (proyecto) => {
    if (onSelectProyecto) {
      onSelectProyecto(proyecto);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header con título y botones */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Building className="text-blue-500" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Proyectos de Excavación
              </h1>
              <p className="text-slate-500">
                Gestión completa de excavaciones por proyecto
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setOpenProyectoModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus size={16} />
              <span>Nuevo Proyecto</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Total Proyectos</p>
              <p className="text-2xl font-bold text-slate-800">{proyectos.length}</p>
            </div>
            <div className="p-2 bg-blue-100 text-blue-500 rounded-lg">
              <Building size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">En Progreso</p>
              <p className="text-2xl font-bold text-slate-800">
                {proyectos.filter(p => p.estado === 'iniciada').length}
              </p>
            </div>
            <div className="p-2 bg-yellow-100 text-yellow-500 rounded-lg">
              <Building size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Completados</p>
              <p className="text-2xl font-bold text-slate-800">
                {proyectos.filter(p => p.estado === 'finalizada').length}
              </p>
            </div>
            <div className="p-2 bg-green-100 text-green-500 rounded-lg">
              <Building size={20} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Cards de Proyectos */}
      {loading ? (
        <div className="text-center py-10">
          <p className="text-slate-500">Cargando proyectos...</p>
        </div>
      ) : proyectos.length === 0 ? (
        <div className="bg-white rounded-xl p-10 border border-slate-200 text-center">
          <p className="text-slate-500 mb-4">No hay proyectos registrados</p>
          <button 
            onClick={() => setOpenProyectoModal(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus size={16} />
            <span>Crear Primer Proyecto</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {proyectosConProgreso.length > 0 ? (
            proyectosConProgreso.map((proyecto) => (
              <ExcavacionCard 
                key={proyecto.id_proyecto} 
                proyecto={proyecto} 
                onClick={() => handleProyectoClick(proyecto)}
              />
            ))
          ) : (
            proyectos.map((proyecto) => (
              <ExcavacionCard 
                key={proyecto.id_proyecto} 
                proyecto={proyecto} 
                onClick={() => handleProyectoClick(proyecto)}
              />
            ))
          )}
        </div>
      )}

      {/* Modal */}
      {openProyectoModal && <RegistrarProyecto onClose={() => setOpenProyectoModal(false)} />}
    </div>
  );
};

export default Proyecto;