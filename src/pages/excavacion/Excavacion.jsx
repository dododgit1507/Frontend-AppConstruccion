import ProjectSections from '../../components/ProjectSections';

const Excavacion = () => {
  // Datos específicos para excavación
  const excavacionData = {
    gestion: {
      progreso: '91%',
      tareasCompletadas: '22/24',
      diasRestantes: '3',
      presupuestoUsado: '87%'
    },
    manoObra: {
      supervisores: 2,
      operadores: 12,
      tecnicos: 6,
      seguridad: 3
    },
    permisos: {
      licenciaExcavacion: 'approved',
      permisoAmbiental: 'approved',
      autorizacionMunicipal: 'approved'
    },
    campamento: {
      status: 'operativo'
    },
    lookAhead: {
      proximasActividades: 2
    }
  };

  return (
    <div className="p-6">
      <ProjectSections 
        projectType="excavación" 
        projectData={excavacionData} 
      />
    </div>
  );
};

export default Excavacion;