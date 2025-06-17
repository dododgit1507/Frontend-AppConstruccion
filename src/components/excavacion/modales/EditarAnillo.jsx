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
import ErrorMessage from "@/components/ui/ErrorMessage";
import FormGroup from "@/components/ui/FormGroup";

// Servicio de Anillo
import anilloService from "@/services/excavacion/anilloService";

const EditarAnillo = ({ anillo, onClose }) => {
  // Usar React Hook Form con valores por defecto del anillo actual
  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm({
    defaultValues: {
      nombre: anillo.nombre,
      area: anillo.area,
      profundidad: anillo.profundidad,
      estado: anillo.estado
    }
  });
  
  // Usar la mutación de React Query para actualizar anillos
  const anilloUpdateMutation = anilloService.useAnilloUpdateMutation();

  const onSubmit = async (data) => {
    try {
      await anilloUpdateMutation.mutateAsync({ 
        id: anillo.id_anillo, 
        data: { ...data, id_excavacion: anillo.id_excavacion }
      });
      toast.success("Anillo actualizado exitosamente");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el anillo");
    }
  };

  return (
    <ModalContainer>
      <Modal>
        <FormTitle>Editar Anillo <X onClick={onClose} className="cursor-pointer" /></FormTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Separador />
          <FormDivisor>
            {/* Subtitulo */}
            <div className="flex-1/2">
              <FormSubtitle>Información General</FormSubtitle>
            </div>
            {/* Contenido */}
            <div className="flex-1/2 space-y-2">
              <FormGroup>
                <label htmlFor="nombre">Nombre</label>
                <input className="border border-slate-200 rounded-lg p-2" type="text" id="nombre" {...register("nombre", { required: "El nombre es obligatorio" })} />
                {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="area">Área</label>
                <input className="border border-slate-200 rounded-lg p-2" type="number" id="area" {...register("area", { required: "El área es obligatorio" })} />
                {errors.area && <ErrorMessage>{errors.area.message}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="profundidad">Profundidad</label>
                <input className="border border-slate-200 rounded-lg p-2" type="number" id="profundidad" {...register("profundidad", { required: "La profundidad es obligatorio" })} />
                {errors.profundidad && <ErrorMessage>{errors.profundidad.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>
          <FormDivisor>
            {/* Subtitulo */}
            <div className="flex-1/2">
              <FormSubtitle>Estado del anillo</FormSubtitle>
            </div>
            {/* Contenido */}
            <div className="flex-1/2 space-y-2">
              <FormGroup>
                <label htmlFor="estado">Estado</label>
                <select className="border border-slate-200 rounded-lg p-2" name="estado" id="estado" {...register("estado", { required: "El estado es obligatorio" })}>
                  <option value="pendiente">Pendiente</option>
                  <option value="iniciada">Iniciada</option>
                  <option value="finalizada">Finalizada</option>
                </select>
                {errors.estado && <ErrorMessage>{errors.estado.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>

          {/* Botones - Cancelar y Guardar */}
          <div className="flex flex-row justify-end gap-4">
            <button type="button" className="bg-slate-100 text-slate-500 py-3 px-6 rounded-lg"
              onClick={onClose}>
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting || !isDirty} 
              className={`bg-blue-500 text-white py-3 px-6 rounded-lg ${isSubmitting || !isDirty ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <span className="flex items-center gap-2"><Save />{isSubmitting ? "Guardando..." : "Guardar"}</span>
            </button>
          </div>
        </form>
      </Modal>
    </ModalContainer>
  );
};

export default EditarAnillo;
