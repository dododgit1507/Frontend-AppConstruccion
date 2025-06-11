import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { X } from "lucide-react";
// Componentes de UI
import ModalContainer from "@/components/ui/modalContainer";
import Separador from "@/components/ui/Separador";
import FormTitle from "@/components/ui/FormTitle";
import FormSubtitle from "@/components/ui/FormSubtitle";
import FormDivisor from "@/components/ui/FormDivisor";

// Servicio de Excavacion
import excavacionService from "@/services/excavacion/excavacionService";

const RegistrarExcavacion = ({ onClose }) => {

  const { register, handleSubmit, formState: { errors }, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await excavacionService.create(data);
      toast.success("Excavacion creada exitosamente");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error al crear la excavacion");
    }
  }

  return (
    <ModalContainer>
      <div className="flex flex-col gap-4 p-8 w-[700px] h-auto max-h-[700px] overflow-y-auto border border-slate-200 rounded-lg">
        <FormTitle>Registrar Proyeccion <X onClick={onClose} className="cursor-pointer" /></FormTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Separador />
          <FormDivisor>
            {/* Titulo */}
            <div className="flex-1/2">
              <FormSubtitle>Información General</FormSubtitle>
            </div>
            {/* Contenido */}
            <div className="flex-1/2 space-y-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="nombre">Nombre</label>
                <input className="border border-slate-200 rounded-lg p-2" type="text" id="nombre" {...register("nombre", { required: "El nombre es obligatorio" })} />
                {errors.nombre && <p>{errors.nombre.message}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="profundidad">Profundidad</label>
                <input className="border border-slate-200 rounded-lg p-2" type="number" id="profundidad" {...register("profundidad", { required: "La profundidad es obligatoria" })} />
                {errors.profundidad && <p>{errors.profundidad.message}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="volumen">Volumen</label>
                <input className="border border-slate-200 rounded-lg p-2" type="number" id="volumen" {...register("volumen", { required: "El volumen es obligatorio" })} />
                {errors.volumen && <p>{errors.volumen.message}</p>}
              </div>
            </div>
          </FormDivisor>
          <FormDivisor>
            <div className="flex-1/2">
              <FormSubtitle>Estado del Proyecto</FormSubtitle>
            </div>
            <div className="flex-1/2 space-y-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="estado">Estado</label>
                <select className="border border-slate-200 rounded-lg p-2" name="estado" id="estado" {...register("estado", { required: "El estado es obligatorio" })}>
                  <option value="">Seleccione un estado</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="iniciada">Iniciada</option>
                  <option value="finalizada">Finalizada</option>
                </select>
                {errors.estado && <p>{errors.estado.message}</p>}
              </div>
            </div>
          </FormDivisor>
          <FormDivisor>
            <div className="flex-1/2">
              <FormSubtitle>Fechas</FormSubtitle>
            </div>
            <div className="flex-1/2 space-y-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="fecha_inicio">Fecha de Inicio</label>
                <input className="border border-slate-200 rounded-lg p-2" type="date" id="fecha_inicio" {...register("fecha_inicio", { required: "La fecha de inicio es obligatoria" })} />
                {errors.fecha_inicio && <p>{errors.fecha_inicio.message}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="fecha_fin">Fecha de Fin</label>
                <input className="border border-slate-200 rounded-lg p-2" type="date" id="fecha_fin" {...register("fecha_fin", { required: "La fecha de fin es obligatoria" })} />
                {errors.fecha_fin && <p>{errors.fecha_fin.message}</p>}
              </div>
            </div>
          </FormDivisor>
          {/* <div>
            <label htmlFor="id_proyecto">Proyecto</label>
            <input type="text" id="id_proyecto" {...register("id_proyecto")} />
          </div> */}
          <div className="flex flex-row justify-end gap-4">
            <button type="button" className="bg-slate-100 text-slate-500 py-2 px-4 rounded-lg"
            onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
              {isSubmitting ? <span className="animate-spin">Registrando...</span> : "Registrar"}
            </button>
          </div>
        </form>
      </div>
    </ModalContainer>
  )

}

export default RegistrarExcavacion
