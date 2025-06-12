import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { X, Save } from "lucide-react";
// Componentes de UI
import ModalContainer from "@/components/ui/modalContainer";
import Modal from "@/components/ui/Modal";
import Separador from "@/components/ui/Separador";
import FormTitle from "@/components/ui/FormTitle";
import FormSubtitle from "@/components/ui/FormSubtitle";
import FormDivisor from "@/components/ui/FormDivisor";
import FormGroup from "@/components/ui/FormGroup";
import ErrorMessage from "@/components/ui/ErrorMessage";

// Servicio de Proyecto
import proyectoService from "@/services/proyectoService";

const EditarProyecto = ({ onClose, proyecto }) => {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      nombre: proyecto.nombre,
      razon_social: proyecto.razon_social,
      direccion: proyecto.direccion,
      estado: proyecto.estado,
      profundidad: proyecto.profundidad,
      area: proyecto.area,
      responsable: proyecto.responsable,
      residente: proyecto.residente
    }
  });

  const onSubmit = async (id, data) => {
    try {
      await proyectoService.update(id, data);
      toast.success("Proyecto editado exitosamente");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error al editar el proyecto");
    }
  }

  return (
    <ModalContainer>
      <Modal>
        <FormTitle>Editar Proyecto <X onClick={onClose} className="cursor-pointer" /></FormTitle>
        <form onSubmit={handleSubmit((data) => onSubmit(proyecto.id_proyecto, data))} className="space-y-4">
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
                <label htmlFor="razon_social">Razon Social</label>
                <input className="border border-slate-200 rounded-lg p-2" type="text" id="razon_social" {...register("razon_social", { required: "La razon social es obligatoria" })} />
                {errors.razon_social && <ErrorMessage>{errors.razon_social.message}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="direccion">Dirección</label>
                <input className="border border-slate-200 rounded-lg p-2" type="text" id="direccion" {...register("direccion", { required: "La direccion es obligatoria" })} />
                {errors.direccion && <ErrorMessage>{errors.direccion.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>
          <FormDivisor>
            { /* Subtitulo */}
            <div className="flex-1/2">
              <FormSubtitle>Estado del Proyecto</FormSubtitle>
            </div>
            { /* Contenido */}
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
            { /* Subtitulo */}
            <div className="flex-1/2">
              <FormSubtitle>Metrado del Proyecto</FormSubtitle>
            </div>
            <div className="flex-1/2 space-y-2">
              <FormGroup>
                <label htmlFor="profundidad">Profundidad (m)</label>
                <input className="border border-slate-200 rounded-lg p-2" type="number" id="profundidad" {...register("profundidad", { required: "La profundidad es obligatoria" })} />
                {errors.profundidad && <ErrorMessage>{errors.profundidad.message}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="area">Área (m²)</label>
                <input className="border border-slate-200 rounded-lg p-2" type="number" id="area" {...register("area", { required: "El area es obligatoria" })} />
                {errors.area && <ErrorMessage>{errors.area.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>

          <FormDivisor>
            <div className="flex-1/2">
              <FormSubtitle>Responsables</FormSubtitle>
            </div>
            <div className="flex-1/2 space-y-2">
              <FormGroup>
                <label htmlFor="responsable">Responsable</label>
                <input className="border border-slate-200 rounded-lg p-2" type="text" id="responsable" {...register("responsable", { required: "El responsable es obligatorio" })} />
                {errors.responsable && <ErrorMessage>{errors.responsable.message}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="residente">Residente</label>
                <input className="border border-slate-200 rounded-lg p-2" type="text" id="residente" {...register("residente", { required: "El residente es obligatorio" })} />
                {errors.residente && <ErrorMessage>{errors.residente.message}</ErrorMessage>}
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

export default EditarProyecto;