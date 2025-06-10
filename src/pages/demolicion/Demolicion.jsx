import ProjectSections from '../../components/ProjectSections';

const Demolicion = () => {
  // Datos específicos para demolición
  const demolicionData = {
    gestion: {
      progreso: '82%',
      tareasCompletadas: '15/18',
      diasRestantes: '8',
      presupuestoUsado: '73%'
    },
    manoObra: {
      supervisores: 2,
      operadores: 8,
      tecnicos: 4,
      seguridad: 3
    },
    permisos: {
      licenciaDemolicion: 'approved',
      permisoAmbiental: 'approved',
      autorizacionMunicipal: 'approved'
    },
    campamento: {
      status: 'operativo'
    },
    lookAhead: {
      proximasActividades: 4
    }
  };

  return (
    <div className="p-6">
      <ProjectSections 
        projectType="demolición" 
        projectData={demolicionData} 
      />
    </div>
  );
};

export default Demolicion;