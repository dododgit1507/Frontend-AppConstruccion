import ProjectSections from '../../components/ProjectSections';

const Acabados = () => {
  // Datos específicos para acabados
  const acabadosData = {
    gestion: {
      progreso: '43%',
      tareasCompletadas: '12/28',
      diasRestantes: '28',
      presupuestoUsado: '39%'
    },
    manoObra: {
      supervisores: 2,
      operadores: 10,
      tecnicos: 12,
      seguridad: 2
    },
    permisos: {
      licenciaAcabados: 'approved',
      permisoAmbiental: 'approved',
      autorizacionMunicipal: 'in-review'
    },
    campamento: {
      status: 'operativo'
    },
    lookAhead: {
      proximasActividades: 6
    }
  };

  return (
    <div className="p-6">
      <ProjectSections 
        projectType="acabados" 
        projectData={acabadosData} 
      />
    </div>
  );
};

export default Acabados;