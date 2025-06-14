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

// Servicio de Excavacion
import excavacionService from "@/services/excavacion/excavacionService";

const RegistrarExcavacion = ({ proyectoId, onClose }) => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  // Usar el hook de mutación para crear excavaciones
  const { mutate, isPending: isSubmitting } = excavacionService.useExcavacionCreateMutation();

  const onSubmit = (data) => {
    // Usar la mutación en lugar de llamar directamente al servicio
    mutate(
      { ...data, id_proyecto: proyectoId },
      {
        onSuccess: () => {
          toast.success("Excavación creada exitosamente");
          onClose();
        },
        onError: (error) => {
          console.error(error);
          toast.error("Error al crear la excavación");
        }
      }
    );
  }

  return (
    <ModalContainer>
      <Modal>
        <FormTitle>Registrar Excavacion <X onClick={onClose} className="cursor-pointer" /></FormTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Separador />
          <FormDivisor>
            {/* Titulo */}
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
                <label htmlFor="profundidad">Profundidad (m)</label>
                <input className="border border-slate-200 rounded-lg p-2" type="number" id="profundidad" {...register("profundidad", { required: "La profundidad es obligatoria" })} />
                {errors.profundidad && <ErrorMessage>{errors.profundidad.message}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="area">Area (m2)</label>
                <input className="border border-slate-200 rounded-lg p-2" type="number" id="area" {...register("area", { required: "El area es obligatoria" })} />
                {errors.area && <ErrorMessage>{errors.area.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>
          <FormDivisor>
            <div className="flex-1/2">
              <FormSubtitle>Estado de la Excavacion</FormSubtitle>
            </div>
            <div className="flex-1/2 space-y-2">
              <FormGroup>
                <label htmlFor="estado">Estado</label>
                <select className="border border-slate-200 rounded-lg p-2" name="estado" id="estado" {...register("estado", { required: "El estado es obligatorio" })}>
                  <option value="">Seleccione un estado</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="iniciada">Iniciada</option>
                  <option value="finalizada">Finalizada</option>
                </select>
                {errors.estado && <ErrorMessage>{errors.estado.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>
          <FormDivisor>
            <div className="flex-1/2">
              <FormSubtitle>Fechas</FormSubtitle>
            </div>
            <div className="flex-1/2 space-y-2">
              <FormGroup>
                <label htmlFor="fecha_inicio">Fecha de Inicio</label>
                <input className="border border-slate-200 rounded-lg p-2" type="date" id="fecha_inicio" {...register("fecha_inicio", { required: "La fecha de inicio es obligatoria" })} />
                {errors.fecha_inicio && <ErrorMessage>{errors.fecha_inicio.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>
          <div className="flex flex-row justify-end gap-4">
            <button type="button" className="bg-slate-100 text-slate-500 py-3 px-6 rounded-lg"
              onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white py-3 px-6 rounded-lg">
              <span className="flex items-center gap-2"><Save />{isSubmitting ? "Registrando..." : "Registrar"}</span>
            </button>
          </div>
        </form>
      </Modal>
    </ModalContainer>
  )

}

export default RegistrarExcavacion
