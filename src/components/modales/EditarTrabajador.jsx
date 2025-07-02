import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { X, Save, User, Mail, Phone, Shield } from "lucide-react";
// Componentes de UI
import ModalContainer from "@/components/ui/ModalContainer";
import Modal from "@/components/ui/Modal";
import Separador from "@/components/ui/Separador";
import FormTitle from "@/components/ui/FormTitle";
import FormSubtitle from "@/components/ui/FormSubtitle";
import FormDivisor from "@/components/ui/FormDivisor";
import FormGroup from "@/components/ui/FormGroup";
import ErrorMessage from "@/components/ui/ErrorMessage";

// Servicio de Trabajador
import trabajadorService from "@/services/trabajadorService";

const EditarTrabajador = ({ onClose, trabajador }) => {
  // Usar el hook de mutación de React Query
  const updateTrabajadorMutation = trabajadorService.useUpdateTrabajador();

  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm({
    defaultValues: {
      nombre: trabajador.nombre || '',
      correo: trabajador.correo || '',
      telefono: trabajador.telefono || '',
      estado: trabajador.estado || ''
    }
  });

  const onSubmit = async (data) => {
    try {
      // Usar la mutación en lugar de llamar directamente al servicio
      await updateTrabajadorMutation.mutateAsync({ 
        id: trabajador.id_trabajador, 
        data 
      });
      toast.success("Trabajador editado exitosamente");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error al editar el trabajador");
    }
  }

  // Función para obtener el indicador del estado
  const getEstadoIndicator = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'activo':
        return { color: 'bg-green-500', text: 'Activo' };
      case 'inactivo':
        return { color: 'bg-red-500', text: 'Inactivo' };
      case 'suspendido':
        return { color: 'bg-yellow-500', text: 'Suspendido' };
      case 'vacaciones':
        return { color: 'bg-blue-500', text: 'En Vacaciones' };
      default:
        return { color: 'bg-gray-500', text: 'Sin estado' };
    }
  };

  const estadoInfo = getEstadoIndicator(trabajador.estado);

  return (
    <ModalContainer>
      <Modal>
        <div className="p-6">
          <FormTitle className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 border border-gray-200 rounded-lg">
                <User className="text-gray-600" size={20} />
              </div>
              <span className="text-gray-800">Editar Trabajador</span>
            </div>
            <X onClick={onClose} className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors" size={24} />
          </FormTitle>

          {/* Información actual del trabajador */}
          <div className="mb-6 p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{trabajador.nombre}</h4>
                <p className="text-sm text-gray-500">ID: {trabajador.id_trabajador}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${estadoInfo.color}`}></div>
                <span className="text-sm font-medium text-gray-700">{estadoInfo.text}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Información Personal */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <User className="text-gray-500" size={18} />
                <FormSubtitle className="text-gray-700 font-medium">Información Personal</FormSubtitle>
              </div>
              
              <FormGroup>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <input 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  type="text" 
                  id="nombre" 
                  {...register("nombre", { 
                    required: "El nombre es obligatorio",
                    maxLength: { value: 50, message: "El nombre no puede tener más de 50 caracteres" }
                  })} 
                />
                {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}
              </FormGroup>
            </div>

            {/* Información de Contacto */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <Mail className="text-gray-500" size={18} />
                <FormSubtitle className="text-gray-700 font-medium">Información de Contacto</FormSubtitle>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <FormGroup>
                  <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo Electrónico
                  </label>
                  <input 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                    type="email" 
                    id="correo" 
                    {...register("correo", { 
                      required: "El correo electrónico es obligatorio",
                      maxLength: { value: 50, message: "El correo no puede tener más de 50 caracteres" },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Ingrese un correo electrónico válido"
                      }
                    })} 
                  />
                  {errors.correo && <ErrorMessage>{errors.correo.message}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                    type="tel" 
                    id="telefono" 
                    maxLength="9"
                    {...register("telefono", { 
                      required: "El teléfono es obligatorio",
                      pattern: {
                        value: /^9[0-9]{8}$/,
                        message: "Ingrese un número válido (9 dígitos, empezando por 9)"
                      }
                    })} 
                  />
                  {errors.telefono && <ErrorMessage>{errors.telefono.message}</ErrorMessage>}
                </FormGroup>
              </div>
            </div>

            {/* Estado del Trabajador */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <Shield className="text-gray-500" size={18} />
                <FormSubtitle className="text-gray-700 font-medium">Estado Laboral</FormSubtitle>
              </div>
              
              <FormGroup>
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  id="estado" 
                  {...register("estado", { required: "El estado es obligatorio" })}
                >
                  <option value="">Seleccione un estado</option>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="suspendido">Suspendido</option>
                  <option value="vacaciones">En Vacaciones</option>
                </select>
                {errors.estado && <ErrorMessage>{errors.estado.message}</ErrorMessage>}
              </FormGroup>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
              <button 
                type="button" 
                className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 transition-colors"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting || !isDirty} 
                className={`flex-1 bg-blue-600 text-white py-2 px-4 rounded-md font-medium transition-colors ${
                  isSubmitting || !isDirty 
                    ? "opacity-50 cursor-not-allowed" 
                    : "hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <Save size={16} />
                  {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </ModalContainer>
  )
}

export default EditarTrabajador;