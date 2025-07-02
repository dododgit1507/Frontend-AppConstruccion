import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { X, Save, Upload, Truck, User, Calendar, FileText, Camera } from 'lucide-react';
import { createPortal } from 'react-dom';

// Servicios (tendrás que crear estos)
// import avanceSectorService from '@/services/excavacion/avanceSectorService';
//import camionService from '@/services/excavacion/camionService'; // Si existe
//import trabajadorService from 'frontend/src/services/trabajadorService.js'; // Si existe

const RegistrarAvanceSector = ({ sectorId, sector, onClose, onSuccess }) => {
  const [camiones, setCamiones] = useState([]);
  const [trabajadores, setTrabajadores] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue } = useForm({
    defaultValues: {
      fecha: new Date().toISOString().split('T')[0],
      area: '',
      descripcion: '',
      encargado: '',
      camion: '',
      foto: null
    }
  });

  useEffect(() => {
    // Cargar camiones y trabajadores disponibles
    const fetchData = async () => {
      try {
        // const camionesData = await camionService.getAll();
        // setCamiones(camionesData);
        
        // const trabajadoresData = await trabajadorService.getAll();
        // setTrabajadores(trabajadoresData);

        // Datos de ejemplo mientras no tienes los servicios
        setCamiones([
          { id: '1', placa: 'ABC-123', marca: 'Volvo', modelo: 'FH16' },
          { id: '2', placa: 'DEF-456', marca: 'Scania', modelo: 'R500' },
          { id: '3', placa: 'GHI-789', marca: 'Mercedes', modelo: 'Actros' }
        ]);

        setTrabajadores([
          { id: '1', nombre: 'Juan Pérez', cargo: 'Operador' },
          { id: '2', nombre: 'María García', cargo: 'Supervisor' },
          { id: '3', nombre: 'Carlos López', cargo: 'Operador' }
        ]);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue('foto', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log('Datos del avance de sector:', data);
      
      // Crear FormData para enviar archivo
      const formData = new FormData();
      formData.append('sector_id', sectorId);
      formData.append('fecha', data.fecha);
      formData.append('area', data.area);
      formData.append('descripcion', data.descripcion);
      formData.append('encargado', data.encargado);
      formData.append('camion', data.camion);
      
      if (data.foto) {
        formData.append('foto', data.foto);
      }

      // await avanceSectorService.create(formData);
      
      toast.success('Avance de excavación registrado exitosamente');
      onSuccess();
    } catch (error) {
      console.error('Error al registrar avance:', error);
      toast.error('Error al registrar el avance de excavación');
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg ">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Registrar Avance de Excavación</h2>
              <p className="text-gray-600 mt-1">Sector: {sector?.nombre} • Remoción de Tierra</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Información General */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <FileText size={20} />
                  Información del Avance
                </h3>
              </div>

              <div className="space-y-2">
                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">
                  <Calendar size={16} className="inline mr-2" />
                  Fecha
                </label>
                <input 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="date" 
                  id="fecha"
                  {...register("fecha", { required: "La fecha es obligatoria" })} 
                />
                {errors.fecha && <p className="text-red-500 text-sm">{errors.fecha.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                  Área Excavada (m²)
                </label>
                <input 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="number" 
                  step="0.01"
                  id="area"
                  placeholder="Ej: 150.50"
                  {...register("area", { required: "El área es obligatoria" })} 
                />
                {errors.area && <p className="text-red-500 text-sm">{errors.area.message}</p>}
              </div>

              <div className="md:col-span-2 space-y-2">
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                  Descripción del Trabajo
                </label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  rows="3"
                  id="descripcion"
                  placeholder="Describe el trabajo de excavación realizado..."
                  {...register("descripcion", { required: "La descripción es obligatoria" })} 
                />
                {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion.message}</p>}
              </div>
            </div>

            {/* Personal y Equipos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Truck size={20} />
                  Personal y Equipos
                </h3>
              </div>

              <div className="space-y-2">
                <label htmlFor="encargado" className="block text-sm font-medium text-gray-700">
                  <User size={16} className="inline mr-2" />
                  Encargado
                </label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  id="encargado"
                  {...register("encargado", { required: "El encargado es obligatorio" })}
                >
                  <option value="">Seleccionar encargado</option>
                  {trabajadores.map((trabajador) => (
                    <option key={trabajador.id} value={trabajador.nombre}>
                      {trabajador.nombre} - {trabajador.cargo}
                    </option>
                  ))}
                </select>
                {errors.encargado && <p className="text-red-500 text-sm">{errors.encargado.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="camion" className="block text-sm font-medium text-gray-700">
                  <Truck size={16} className="inline mr-2" />
                  Camión Utilizado
                </label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  id="camion"
                  {...register("camion", { required: "El camión es obligatorio" })}
                >
                  <option value="">Seleccionar camión</option>
                  {camiones.map((camion) => (
                    <option key={camion.id} value={`${camion.placa} - ${camion.marca} ${camion.modelo}`}>
                      {camion.placa} - {camion.marca} {camion.modelo}
                    </option>
                  ))}
                </select>
                {errors.camion && <p className="text-red-500 text-sm">{errors.camion.message}</p>}
              </div>
            </div>

            {/* Foto del Avance */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <Camera size={20} />
                Fotografía del Avance
              </h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="foto"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                
                {previewImage ? (
                  <div className="space-y-4">
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="mx-auto max-w-xs max-h-48 rounded-lg shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('foto').click()}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Cambiar imagen
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div>
                      <button
                        type="button"
                        onClick={() => document.getElementById('foto').click()}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Subir fotografía
                      </button>
                      <p className="text-gray-500 text-sm mt-1">PNG, JPG hasta 10MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <button 
                type="button" 
                className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Save size={16} />
                {isSubmitting ? "Guardando..." : "Registrar Avance"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RegistrarAvanceSector;