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

// Servicio de Panel
import panelService from "@/services/excavacion/panelService";

const EditarPanel = ({ panel, onClose }) => {
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      nombre: panel.nombre,
      volumen: panel.volumen,
      profundidad: panel.profundidad,
      estado: panel.estado,
    }
  });

  // Mutación con React Query
  const { mutate, isPending } = panelService.usePanelUpdateMutation();

  const onSubmit = (data) => {
    // Convertir valores numéricos
    const panelData = {
      ...data,
      volumen: parseFloat(data.volumen),
      profundidad: parseFloat(data.profundidad),
      id_sector: panel.id_sector
    };

    mutate({
      id: panel.id_panel,
      data: panelData
    }, {
      onSuccess: () => {
        toast.success("Panel actualizado exitosamente");
        onClose();
      },
      onError: (error) => {
        console.error(error);
        toast.error("Error al actualizar el panel");
      }
    });
  };

  return (
    <ModalContainer>
      <Modal>
        <FormTitle>Editar Panel <X onClick={onClose} className="cursor-pointer" /></FormTitle>
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
                <input className="border border-slate-200 rounded-lg p-2" type="number" step="0.01" id="volumen" {...register("volumen", { required: "El volumen es obligatorio" })} />
                {errors.volumen && <ErrorMessage>{errors.volumen.message}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="profundidad">Profundidad (m)</label>
                <input className="border border-slate-200 rounded-lg p-2" type="number" step="0.01" id="profundidad" {...register("profundidad", { required: "La profundidad es obligatoria" })} />
                {errors.profundidad && <ErrorMessage>{errors.profundidad.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>
          <FormDivisor>
            {/* Subtitulo */}
            <div className="flex-1/2">
              <FormSubtitle>Estado y Fechas</FormSubtitle>
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

export default EditarPanel;
