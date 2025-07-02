import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { X, Save } from "lucide-react";

// Componentes de UI
import ModalContainer from "@/components/ui/ModalContainer";
import Modal from "@/components/ui/Modal";
import Separador from "@/components/ui/Separador";
import FormTitle from "@/components/ui/FormTitle";
import FormSubtitle from "@/components/ui/FormSubtitle";
import FormDivisor from "@/components/ui/FormDivisor";
import FormGroup from "@/components/ui/FormGroup";
import ErrorMessage from "@/components/ui/ErrorMessage";

import trabajadorService from '@/services/trabajadorService';

const RegistrarTrabajador = ({ onClose }) => {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  
  // Usar el hook de mutación de React Query
  const createTrabajadorMutation = trabajadorService.useCreateTrabajador();

  const onSubmit = async (data) => {
    try {
      await createTrabajadorMutation.mutateAsync(data);
      toast.success("Trabajador registrado exitosamente");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error al registrar el trabajador");
    }
  }

  return (
    <ModalContainer>
      <Modal>
        <FormTitle>Registrar Trabajador <X onClick={onClose} className="cursor-pointer" /></FormTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Separador />
          
          <FormDivisor>
            <div className="flex-1/2">
              <FormSubtitle>Información Personal</FormSubtitle>
            </div>
            <div className="flex-1/2 space-y-2">
              <FormGroup>
                <label htmlFor="nombre">Nombre Completo</label>
                <input 
                  className="border border-slate-200 rounded-lg p-2 w-full" 
                  type="text" 
                  id="nombre" 
                  placeholder="Ejemplo: Juan Carlos Pérez López"
                  {...register("nombre", { 
                    required: "El nombre es obligatorio",
                    maxLength: { value: 50, message: "El nombre no puede tener más de 50 caracteres" },
                    minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" }
                  })} 
                />
                {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>

          <FormDivisor>
            <div className="flex-1/2">
              <FormSubtitle>Información de Contacto</FormSubtitle>
            </div>
            <div className="flex-1/2 space-y-2">
              <FormGroup>
                <label htmlFor="correo">Correo Electrónico</label>
                <input 
                  className="border border-slate-200 rounded-lg p-2 w-full" 
                  type="email" 
                  id="correo" 
                  placeholder="Ejemplo: juan.perez@empresa.com"
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
                <label htmlFor="telefono">Teléfono</label>
                <input 
                  className="border border-slate-200 rounded-lg p-2 w-full" 
                  type="tel" 
                  id="telefono" 
                  placeholder="Ejemplo: 987654321"
                  maxLength="9"
                  {...register("telefono", { 
                    required: "El teléfono es obligatorio",
                    pattern: {
                      value: /^9[0-9]{8}$/,
                      message: "Ingrese un número de teléfono válido (9 dígitos, empezando por 9)"
                    },
                    maxLength: { value: 9, message: "El teléfono debe tener exactamente 9 dígitos" },
                    minLength: { value: 9, message: "El teléfono debe tener exactamente 9 dígitos" }
                  })} 
                />
                {errors.telefono && <ErrorMessage>{errors.telefono.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>

          <FormDivisor>
            <div className="flex-1/2">
              <FormSubtitle>Estado del Trabajador</FormSubtitle>
            </div>
            <div className="flex-1/2 space-y-2">
              <FormGroup>
                <label htmlFor="estado">Estado</label>
                <select 
                  className="border border-slate-200 rounded-lg p-2 w-full" 
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
          </FormDivisor>

          <div className="flex flex-row justify-end gap-4">
            <button 
              type="button" 
              className="bg-slate-100 text-slate-500 py-3 px-6 rounded-lg hover:bg-slate-200 transition-colors"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className={`bg-blue-500 text-white py-3 px-6 rounded-lg transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
            >
              <span className="flex items-center gap-2">
                <Save size={16} />
                {isSubmitting ? "Registrando..." : "Registrar"}
              </span>
            </button>
          </div>
        </form>
      </Modal>
    </ModalContainer>
  )
}

export default RegistrarTrabajador;