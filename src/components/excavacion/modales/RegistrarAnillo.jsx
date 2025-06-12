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
import anilloService from "@/sercices/excavacion/anilloService";

const RegistrarAnillo = ({ excavacionId, onClose }) => {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await anilloService.create({ ...data, id_excavacion: excavacionId })
      toast.success("Anillo registrado exitosamente")
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el anillo");
    }
  }

  return (
    <ModalContainer>
      <Modal>
        <FormTitle>Registrar Anillo <X onClick={onClose} className="cursor-pointer" /></FormTitle>
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
                <label htmlFor="area">Profundidad</label>
                <input className="border border-slate-200 rounded-lg p-2" type="number" id="profundidad" {...register("profundidad", { required: "La profunidad es obligatorio" })} />
                {errors.area && <ErrorMessage>{errors.area.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>
          <FormDivisor>
            {/* Subtitulo */}
            <div className="flex-1/2">
              <FormSubtitle>Estado de la excavación</FormSubtitle>
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

          {/* Botones - Cancelar y Registrar*/}
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

export default RegistrarAnillo;