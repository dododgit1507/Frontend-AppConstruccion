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
      estado_inicial: "planificado"
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
      <Modal className="max-w-4xl w-full mx-4">
        <div className="p-8">
          <FormTitle className="text-2xl font-bold text-gray-800 mb-6">
            Registrar Nuevo Panel
            <X onClick={onClose} className="cursor-pointer hover:bg-gray-100 p-1 rounded" size={28} />
          </FormTitle>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* ===== IDENTIFICACIÓN DEL PANEL ===== */}
            <div className="bg-emerald-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b border-emerald-200 pb-2">
                🟢 Identificación del Panel
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="nombre">
                    Nombre/Código del Panel *
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="text" id="nombre" placeholder="Ej: PANEL-A1-01, P-001"
                    {...register("nombre", { required: "El nombre es obligatorio" })} 
                  />
                  {errors.nombre && <ErrorMessage className="mt-1">{errors.nombre.message}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="numero_secuencial">
                    Número Secuencial
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" id="numero_secuencial" placeholder="1, 2, 3..."
                    {...register("numero_secuencial")} 
                  />
                  <small className="text-gray-500 mt-1 block">Orden de excavación dentro del sector</small>
                </FormGroup>
              </div>

              <FormGroup>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="ubicacion_especifica">
                  Ubicación Específica
                </label>
                <input 
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  type="text" id="ubicacion_especifica" placeholder="Ej: Esquina NE, Centro-Norte, Lateral Oeste"
                  {...register("ubicacion_especifica")} 
                />
                <small className="text-gray-500 mt-1 block">Descripción detallada de la posición dentro del sector</small>
              </FormGroup>
            </div>

            {/* ===== DIMENSIONES DEL PANEL ===== */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b border-blue-200 pb-2">
                📐 Dimensiones del Panel
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="volumen_proyectado">
                    Volumen Proyectado (m³) *
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="volumen_proyectado" placeholder="25.50"
                    {...register("volumen_proyectado", { required: "El volumen proyectado es obligatorio" })} 
                  />
                  {errors.volumen_proyectado && <ErrorMessage className="mt-1">{errors.volumen_proyectado.message}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="profundidad">
                    Profundidad del Panel (m) *
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="profundidad" placeholder="0.75"
                    {...register("profundidad", { required: "La profundidad es obligatoria" })} 
                  />
                  {errors.profundidad && <ErrorMessage className="mt-1">{errors.profundidad.message}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="area_panel">
                    Área del Panel (m²)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="area_panel" placeholder="34.00"
                    {...register("area_panel")} 
                  />
                </FormGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="largo_panel">
                    Largo del Panel (m)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="largo_panel" placeholder="6.00"
                    {...register("largo_panel")} 
                  />
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="ancho_panel">
                    Ancho del Panel (m)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="ancho_panel" placeholder="5.67"
                    {...register("ancho_panel")} 
                  />
                </FormGroup>
              </div>
            </div>

            {/* ===== ESPECIFICACIONES TÉCNICAS ===== */}
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b border-yellow-200 pb-2">
                ⚙️ Especificaciones Técnicas
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cota_superior_panel">
                    Cota Superior (m.s.n.m.)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="cota_superior_panel" placeholder="2241.25"
                    {...register("cota_superior_panel")} 
                  />
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cota_inferior_panel">
                    Cota Inferior (m.s.n.m.)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="cota_inferior_panel" placeholder="2240.50"
                    {...register("cota_inferior_panel")} 
                  />
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="pendiente_diseno">
                    Pendiente de Diseño (%)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.1" id="pendiente_diseno" placeholder="0.5"
                    {...register("pendiente_diseno")} 
                  />
                </FormGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="tipo_excavacion_panel">
                    Tipo de Excavación Específica
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="tipo_excavacion_panel" 
                    {...register("tipo_excavacion_panel")}>
                    <option value="">-- Tipo específico --</option>
                    <option value="excavacion_precision">Excavación de precisión</option>
                    <option value="excavacion_masiva">Excavación masiva</option>
                    <option value="perfilado_taludes">Perfilado de taludes</option>
                    <option value="limpieza_finos">Limpieza de finos</option>
                    <option value="conformacion_base">Conformación de base</option>
                    <option value="excavacion_manual_fina">Excavación manual fina</option>
                  </select>
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="tolerancia_excavacion">
                    Tolerancia de Excavación (cm)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.1" id="tolerancia_excavacion" placeholder="±1.0"
                    {...register("tolerancia_excavacion")} 
                  />
                </FormGroup>
              </div>
            </div>

            {/* ===== PLANIFICACIÓN DE TRABAJO ===== */}
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b border-purple-200 pb-2">
                📅 Planificación de Trabajo
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="fecha_planificada_inicio">
                    Fecha Planificada de Inicio
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="date" id="fecha_planificada_inicio" 
                    {...register("fecha_planificada_inicio")} 
                  />
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="duracion_estimada_horas">
                    Duración Estimada (horas)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.5" id="duracion_estimada_horas" placeholder="4.0"
                    {...register("duracion_estimada_horas")} 
                  />
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="prioridad_panel">
                    Prioridad del Panel
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="prioridad_panel" 
                    {...register("prioridad_panel")}>
                    <option value="">-- Nivel de prioridad --</option>
                    <option value="critica">🔴 Crítica</option>
                    <option value="alta">🟠 Alta</option>
                    <option value="normal">🟡 Normal</option>
                    <option value="baja">🟢 Baja</option>
                  </select>
                </FormGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="equipo_asignado_panel">
                    Equipo/Herramienta Asignada
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="equipo_asignado_panel" 
                    {...register("equipo_asignado_panel")}>
                    <option value="">-- Equipo principal --</option>
                    <option value="mini_excavadora">Mini excavadora</option>
                    <option value="retroexcavadora_pequena">Retroexcavadora pequeña</option>
                    <option value="herramientas_manuales">Herramientas manuales</option>
                    <option value="martillo_hidraulico">Martillo hidráulico</option>
                    <option value="equipo_topografia">Equipo de topografía</option>
                    <option value="bomba_agua">Bomba de agua</option>
                  </select>
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="operador_asignado">
                    Operador/Responsable Asignado
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="operador_asignado" 
                    {...register("operador_asignado")}>
                    <option value="">-- Asignar responsable --</option>
                    <option value="operador_1">Op. Juan Rodríguez</option>
                    <option value="operador_2">Op. Carlos Mendoza</option>
                    <option value="peón_especializado_1">Peón Esp. María Flores</option>
                    <option value="topografo_1">Topógrafo Luis Vega</option>
                    <option value="capataz_1">Capataz Pedro Silva</option>
                  </select>
                </FormGroup>
              </div>
            </div>

            {/* ===== ESTADO INICIAL Y OBSERVACIONES ===== */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b border-gray-200 pb-2">
                📊 Estado Inicial y Observaciones
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fase Inicial
                  </label>
                  <div className="w-full border border-gray-200 bg-gray-100 rounded-lg p-3 text-sm text-gray-600">
                    🔵 Marcado - Marcado y señalización del área
                  </div>
                  <small className="text-gray-500 mt-1 block">El panel iniciará automáticamente en la fase de Marcado</small>
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="id_estado">
                    Estado Inicial del Panel *
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="id_estado"
                    id="id_estado"
                    disabled={estadosLoading}
                    {...register("id_estado", { required: "El estado es obligatorio" })}
                  >
                    <option value="">-- Seleccione estado inicial --</option>
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
                  {errors.id_estado && <ErrorMessage className="mt-1">{errors.id_estado.message}</ErrorMessage>}
                  {estadosError && <ErrorMessage className="mt-1">Error al cargar los estados</ErrorMessage>}
                </FormGroup>
              </div>
              
              <FormGroup>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="observaciones_panel">
                  Observaciones del Panel
                </label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" 
                  id="observaciones_panel" rows="4"
                  {...register("observaciones_panel")} 
                  placeholder="Incluya detalles específicos sobre este panel: condiciones especiales, requisitos de precisión, coordinación con otros trabajos, etc.">
                </textarea>
                <small className="text-gray-500 mt-1 block">Información detallada para la ejecución de este panel específico</small>
              </FormGroup>
            </div>

            {/* ===== BOTONES DE ACCIÓN ===== */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
              <button 
                type="button" 
                className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                onClick={onClose}>
                Cancelar
              </button>
              <button 
                type="submit" 
                disabled={isPending} 
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  {isPending ? "Registrando..." : "Registrar Panel"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </ModalContainer>
  );
};

export default RegistrarPanel;