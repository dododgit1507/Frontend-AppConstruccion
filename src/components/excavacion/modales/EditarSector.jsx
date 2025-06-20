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

// Servicio de Sector
import sectorService from "@/services/excavacion/sectorService";

const EditarSector = ({ sector, onClose }) => {
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      nombre: sector.nombre,
      volumen: sector.volumen,
      profundidad: sector.profundidad,
      estado: sector.estado,
    }
  });
  
  // Mutación con React Query
  const { mutate, isPending } = sectorService.useSectorUpdateMutation();

  const onSubmit = (data) => {
    mutate({ 
      id: sector.id_sector, 
      data: { 
        ...data, 
        id_anillo: sector.id_anillo 
      } 
    }, {
      onSuccess: () => {
        toast.success("Sector actualizado exitosamente");
        onClose();
      },
      onError: (error) => {
        console.error(error);
        toast.error("Error al actualizar el sector");
      }
    });
  };

  return (
    <ModalContainer>
      <Modal>
        <FormTitle>Editar Sector <X onClick={onClose} className="cursor-pointer" /></FormTitle>
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
                <label htmlFor="volumen">Volumen (m³)</label>
                <input className="border border-slate-200 rounded-lg p-2" type="number" id="volumen" step="0.01" {...register("volumen", { required: "El volumen es obligatorio" })} />
                {errors.volumen && <ErrorMessage>{errors.volumen.message}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="profundidad">Profundidad (m)</label>
                <input className="border border-slate-200 rounded-lg p-2" type="number" id="profundidad" step="0.01" {...register("profundidad", { required: "La profundidad es obligatoria" })} />
                {errors.profundidad && <ErrorMessage>{errors.profundidad.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>
          <FormDivisor>
            {/* Subtitulo */}
            <div className="flex-1/2">
              <FormSubtitle>Estado del Sector</FormSubtitle>
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

          {/* Botones - Cancelar y Guardar*/}
          <div className="flex flex-row justify-end gap-4">
            <button type="button" className="bg-slate-100 text-slate-500 py-3 px-6 rounded-lg"
              onClick={onClose}>
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={!isDirty || isPending} 
              className={`py-3 px-6 rounded-lg ${!isDirty ? 'bg-blue-300' : 'bg-blue-500'} text-white`}
            >
              <span className="flex items-center gap-2">
                <Save />
                {isPending ? "Guardando..." : "Guardar"}
              </span>
            </button>
          </div>
        </form>
      </Modal>
    </ModalContainer>
  );
};

export default EditarSector;
