import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Building, 
  MapPin, 
  User, 
  Calendar, 
  Ruler, 
  Calculator,
  Save,
  Loader
} from 'lucide-react';
import { toast } from 'sonner';

const CreateProjectModal = ({ isOpen, onClose, onCreateProject }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    ubicacion: '',
    supervisor: '',
    fechaInicio: '',
    fechaEstimada: '',
    profundidadTotal: '',
    areaTotal: '',
    descripcion: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {      // Validación básica
      if (!formData.nombre || !formData.ubicacion || !formData.supervisor) {
        toast.error('Por favor, completa los campos requeridos', {
          description: 'Los campos Nombre, Ubicación y Supervisor son obligatorios.'
        });
        setIsSubmitting(false);
        return;
      }

      // Simular creación del proyecto
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newProject = {
        id: `proyecto-${Date.now()}`,
        ...formData,
        estado: 'planificado',
        progreso: 0,
        excavaciones: []
      };

      // Llamar al callback para agregar el proyecto
      onCreateProject(newProject);      // Notificación de éxito con animación
      toast.success('¡Proyecto creado exitosamente!', {
        description: `El proyecto "${formData.nombre}" ha sido creado y está listo para iniciar.`,
      });

      // Resetear formulario y cerrar modal
      setFormData({
        nombre: '',
        ubicacion: '',
        supervisor: '',
        fechaInicio: '',
        fechaEstimada: '',
        profundidadTotal: '',
        areaTotal: '',
        descripcion: ''
      });
      onClose();    } catch (error) {
      toast.error('Error al crear el proyecto', {
        description: 'Hubo un problema al crear el proyecto. Por favor, inténtalo de nuevo.'
      });
      console.error('Error creating project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={onClose}>
            {/* Overlay con blur */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <motion.div 
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel as={motion.div}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-surface p-8 text-left align-middle shadow-2xl transition-all border border-theme-border"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <Dialog.Title as="h3" className="text-2xl font-bold text-theme-text flex items-center space-x-3">
                        <div className="p-2 bg-primary/20 rounded-xl">
                          <Building className="text-primary" size={24} />
                        </div>
                        <span>Crear Nuevo Proyecto</span>
                      </Dialog.Title>
                      <button
                        onClick={onClose}
                        className="p-2 hover:bg-surface-hover rounded-xl transition-colors group"
                      >
                        <X className="text-theme-text-secondary group-hover:text-theme-text" size={20} />
                      </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Grid de campos principales */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nombre del proyecto */}
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2 text-sm font-medium text-theme-text">
                            <Building size={16} className="text-primary" />
                            <span>Nombre del Proyecto *</span>
                          </label>
                          <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            placeholder="Ej: Torre Residencial Norte"
                            className="w-full px-4 py-3 rounded-xl border border-theme-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-theme-text"
                            required
                          />
                        </div>

                        {/* Ubicación */}
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2 text-sm font-medium text-theme-text">
                            <MapPin size={16} className="text-primary" />
                            <span>Ubicación *</span>
                          </label>
                          <input
                            type="text"
                            name="ubicacion"
                            value={formData.ubicacion}
                            onChange={handleInputChange}
                            placeholder="Ej: Av. Libertador 1250"
                            className="w-full px-4 py-3 rounded-xl border border-theme-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-theme-text"
                            required
                          />
                        </div>

                        {/* Supervisor */}
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2 text-sm font-medium text-theme-text">
                            <User size={16} className="text-primary" />
                            <span>Supervisor *</span>
                          </label>
                          <input
                            type="text"
                            name="supervisor"
                            value={formData.supervisor}
                            onChange={handleInputChange}
                            placeholder="Ej: Carlos Mendoza"
                            className="w-full px-4 py-3 rounded-xl border border-theme-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-theme-text"
                            required
                          />
                        </div>

                        {/* Fecha de inicio */}
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2 text-sm font-medium text-theme-text">
                            <Calendar size={16} className="text-primary" />
                            <span>Fecha de Inicio</span>
                          </label>
                          <input
                            type="date"
                            name="fechaInicio"
                            value={formData.fechaInicio}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-theme-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-theme-text"
                          />
                        </div>

                        {/* Fecha estimada */}
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2 text-sm font-medium text-theme-text">
                            <Calendar size={16} className="text-primary" />
                            <span>Fecha Estimada</span>
                          </label>
                          <input
                            type="date"
                            name="fechaEstimada"
                            value={formData.fechaEstimada}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-theme-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-theme-text"
                          />
                        </div>

                        {/* Profundidad total */}
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2 text-sm font-medium text-theme-text">
                            <Ruler size={16} className="text-primary" />
                            <span>Profundidad Total</span>
                          </label>
                          <input
                            type="text"
                            name="profundidadTotal"
                            value={formData.profundidadTotal}
                            onChange={handleInputChange}
                            placeholder="Ej: 15m"
                            className="w-full px-4 py-3 rounded-xl border border-theme-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-theme-text"
                          />
                        </div>

                        {/* Área total */}
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2 text-sm font-medium text-theme-text">
                            <Calculator size={16} className="text-primary" />
                            <span>Área Total</span>
                          </label>
                          <input
                            type="text"
                            name="areaTotal"
                            value={formData.areaTotal}
                            onChange={handleInputChange}
                            placeholder="Ej: 1,200 m²"
                            className="w-full px-4 py-3 rounded-xl border border-theme-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-theme-text"
                          />
                        </div>
                      </div>

                      {/* Descripción */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-theme-text">
                          Descripción (Opcional)
                        </label>
                        <textarea
                          name="descripcion"
                          value={formData.descripcion}
                          onChange={handleInputChange}
                          placeholder="Descripción adicional del proyecto..."
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-theme-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-theme-text resize-none"
                        />
                      </div>

                      {/* Botones de acción */}
                      <div className="flex items-center justify-end space-x-4 pt-4 border-t border-theme-border">
                        <button
                          type="button"
                          onClick={onClose}
                          className="px-6 py-3 text-theme-text-secondary hover:text-theme-text hover:bg-surface-hover rounded-xl transition-all"
                        >
                          Cancelar
                        </button>
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader className="animate-spin" size={18} />
                              <span>Creando...</span>
                            </>
                          ) : (
                            <>
                              <Save size={18} />
                              <span>Crear Proyecto</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </AnimatePresence>
  );
};

export default CreateProjectModal;
