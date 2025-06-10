import ProjectSections from '../../components/ProjectSections';

const Construccion = () => {
  // Datos específicos para construcción
  const construccionData = {
    gestion: {
      progreso: '65%',
      tareasCompletadas: '24/37',
      diasRestantes: '45',
      presupuestoUsado: '58%'
    },
    manoObra: {
      supervisores: 3,
      operadores: 15,
      tecnicos: 8,
      seguridad: 4
    },
    permisos: {
      licenciaConstruccion: 'approved',
      permisoAmbiental: 'pending',
      autorizacionMunicipal: 'approved'
    },
    campamento: {
      status: 'operativo'
    },
    lookAhead: {
      proximasActividades: 8
    }
  };

  return (
    <div className="p-6">
      <ProjectSections 
        projectType="construcción" 
        projectData={construccionData} 
      />
    </div>
  );
};

export default Construccion;