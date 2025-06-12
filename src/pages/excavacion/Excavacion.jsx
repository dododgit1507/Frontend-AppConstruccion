import { useState } from 'react';
import ExcavacionModules from '@/components/ExcavacionModules';
import RegistrarProyecto from '@/components/excavacion/modales/RegistrarProyecto';
import RegistrarExcavacion from '@/components/excavacion/modales/registrarExcavacion';

const Excavacion = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="p-6">
      {/* <ExcavacionModules /> */}

      <div className="flex flex-row justify-between">
        <div>
          <h1>Proyectos de Excavacion</h1>
        </div>
        <div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg" onClick={() => setOpenModal(true)}>Registrar Excavacion</button>
        </div>
      </div>

      {/* Cards de Proyectos */}

      {openModal && <RegistrarExcavacion onClose={() => setOpenModal(false)} />}
    </div>
  )
};

export default Excavacion;