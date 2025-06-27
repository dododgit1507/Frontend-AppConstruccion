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
import estadoService from "@/services/excavacion/estadoService";
import faseService from "@/services/excavacion/faseService";

const RegistrarPanel = ({ sectorId, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      id_fase: "",
      id_estado: "",
    },
  });

  // Mutación con React Query
  const { mutate, isPending } = panelService.usePanelCreateMutation();

  // Consultas para estados y fases con manejo de carga y error
  const {
    data: estados,
    isLoading: estadosLoading,
    isError: estadosError
  } = estadoService.useEstadoQuery();

  const {
    data: fases,
    isLoading: fasesLoading,
    isError: fasesError
  } = faseService.useFaseQuery();

  const onSubmit = (data) => {
    // Usar la mutación en lugar de llamar directamente al servicio
    mutate(
      { ...data, id_sector: sectorId },
      {
        onSuccess: () => {
          toast.success("Panel creado exitosamente");
          onClose();
        },
        onError: (error) => {
          console.error(error);
          toast.error("Error al crear el panel");
        }
      }
    );
  };

  return (
    <ModalContainer>
      <Modal>
        <FormTitle>Registrar Panel <X onClick={onClose} className="cursor-pointer" /></FormTitle>
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
                <label htmlFor="volumen_proyectado">Volumen Proyectado (m³)</label>
                <input className="border border-slate-200 rounded-lg p-2" type="number" step="0.01" id="volumen_proyectado" {...register("volumen_proyectado", { required: "El volumen proyectado es obligatorio" })} />
                {errors.volumen_proyectado && <ErrorMessage>{errors.volumen_proyectado.message}</ErrorMessage>}
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
              <FormSubtitle>Fases y Estado</FormSubtitle>
            </div>
            {/* Contenido */}
            <div className="flex-1/2 space-y-2">
              <FormGroup>
                <label htmlFor="id_fase">Fase</label>
                <select
                  className="border border-slate-200 rounded-lg p-2"
                  name="id_fase"
                  id="id_fase"
                  disabled={fasesLoading}
                  {...register("id_fase", { required: "La fase es obligatoria" })}
                >
                  {fasesLoading ? (
                    <option value="">Cargando fases...</option>
                  ) : fasesError ? (
                    <option value="">Error al cargar fases</option>
                  ) : fases && fases.length > 0 ? (
                    fases.map((fase) => (
                      <option key={fase.id_fase} value={fase.id_fase}>
                        {fase.nombre}
                      </option>
                    ))
                  ) : (
                    <option value="">No hay fases disponibles</option>
                  )}
                </select>
                {errors.fase && <ErrorMessage>{errors.fase.message}</ErrorMessage>}
                {fasesError && <ErrorMessage>Error al cargar las fases</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="id_estado">Estado</label>
                <select
                  className="border border-slate-200 rounded-lg p-2"
                  name="id_estado"
                  id="id_estado"
                  disabled={estadosLoading}
                  {...register("id_estado", { required: "El estado es obligatorio" })}
                >
                  {estadosLoading ? (
                    <option value="">Cargando estados...</option>
                  ) : estadosError ? (
                    <option value="">Error al cargar estados</option>
                  ) : estados && estados.length > 0 ? (
                    estados.map((estado) => (
                      <option key={estado.id_estado} value={estado.id_estado}>
                        {estado.nombre}
                      </option>
                    ))
                  ) : (
                    <option value="">No hay estados disponibles</option>
                  )}
                </select>
                {errors.estado && <ErrorMessage>{errors.estado.message}</ErrorMessage>}
                {estadosError && <ErrorMessage>Error al cargar los estados</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>

          {/* Botones - Cancelar y Registrar*/}
          <div className="flex flex-row justify-end gap-4">
            <button type="button" className="bg-slate-100 text-slate-500 py-3 px-6 rounded-lg"
              onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" disabled={isPending} className="bg-blue-500 text-white py-3 px-6 rounded-lg">
              <span className="flex items-center gap-2"><Save />{isPending ? "Registrando..." : "Registrar"}</span>
            </button>
          </div>
        </form>
      </Modal>
    </ModalContainer>
  );
};

export default RegistrarPanel;
