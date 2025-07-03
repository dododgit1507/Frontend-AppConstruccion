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
      <Modal className="max-w-6xl w-full mx-4">
        <div className="p-8">
          <FormTitle className="text-2xl font-bold text-gray-800 mb-6">
            Registrar Nueva Excavación 
            <X onClick={onClose} className="cursor-pointer hover:bg-gray-100 p-1 rounded" size={28} />
          </FormTitle>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* ===== INFORMACIÓN GENERAL ===== */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b border-gray-200 pb-2">
                📋 Información General
              </h3>
              
              {/* Fila 1: Nombre y Área */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="nombre">
                    Nombre/Código de Excavación *
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="text" id="nombre" placeholder="Ej: EXC-001-SOTANO"
                    {...register("nombre", { required: "El nombre es obligatorio" })} 
                  />
                  {errors.nombre && <ErrorMessage className="mt-1">{errors.nombre.message}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="area_total">
                    Área Total de Excavación (m²) *
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="area_total" placeholder="1500.00"
                    {...register("area_total", { required: "El área total es obligatoria" })} 
                  />
                  {errors.area_total && <ErrorMessage className="mt-1">{errors.area_total.message}</ErrorMessage>}
                </FormGroup>
              </div>

              {/* Fila 2: Dimensiones principales */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="profundidad">
                    Profundidad Total (m) *
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="profundidad" placeholder="12.50"
                    {...register("profundidad", { required: "La profundidad es obligatoria" })} 
                  />
                  {errors.profundidad && <ErrorMessage className="mt-1">{errors.profundidad.message}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="volumen">
                    Volumen Total (m³) *
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="volumen" placeholder="18750.00"
                    {...register("volumen", { required: "El volumen es obligatorio" })} 
                  />
                  {errors.volumen && <ErrorMessage className="mt-1">{errors.volumen.message}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="longitud_total">
                    Longitud Total (m)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="longitud_total" placeholder="75.00"
                    {...register("longitud_total")} 
                  />
                </FormGroup>
              </div>

              {/* Fila 3: Datos complementarios */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="ancho_promedio">
                    Ancho Promedio (m)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="ancho_promedio" placeholder="20.00"
                    {...register("ancho_promedio")} 
                  />
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cota_referencia">
                    Cota de Referencia (m.s.n.m.)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="cota_referencia" placeholder="2245.50"
                    {...register("cota_referencia")} 
                  />
                </FormGroup>
              </div>
            </div>

            {/* ===== CARACTERÍSTICAS TÉCNICAS ===== */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b border-blue-200 pb-2">
                ⚙️ Características Técnicas
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="tipo_excavacion">
                    Tipo de Excavación *
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="tipo_excavacion" 
                    {...register("tipo_excavacion", { required: "El tipo de excavación es obligatorio" })}>
                    <option value="">-- Seleccione el tipo --</option>
                    <option value="zanjas_servicios">Zanjas para servicios</option>
                    <option value="cimentaciones">Cimentaciones</option>
                    <option value="sotanos">Sótanos</option>
                    <option value="tuneles">Túneles</option>
                    <option value="explanaciones">Explanaciones</option>
                    <option value="excavacion_masiva">Excavación masiva</option>
                  </select>
                  {errors.tipo_excavacion && <ErrorMessage className="mt-1">{errors.tipo_excavacion.message}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="clasificacion_terreno">
                    Clasificación del Terreno *
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="clasificacion_terreno" 
                    {...register("clasificacion_terreno", { required: "La clasificación del terreno es obligatoria" })}>
                    <option value="">-- Seleccione la clasificación --</option>
                    <option value="suelo_blando">Suelo blando (arcilla, limo)</option>
                    <option value="suelo_semiduro">Suelo semiduro (arena compacta)</option>
                    <option value="suelo_duro">Suelo duro (grava densa)</option>
                    <option value="roca_blanda">Roca blanda (arenisca, caliza)</option>
                    <option value="roca_dura">Roca dura (granito, basalto)</option>
                  </select>
                  {errors.clasificacion_terreno && <ErrorMessage className="mt-1">{errors.clasificacion_terreno.message}</ErrorMessage>}
                </FormGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="metodo_excavacion">
                    Método de Excavación *
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="metodo_excavacion" 
                    {...register("metodo_excavacion", { required: "El método de excavación es obligatorio" })}>
                    <option value="">-- Seleccione el método --</option>
                    <option value="manual">Manual (pico y pala)</option>
                    <option value="mecanico_retroexcavadora">Mecánico con retroexcavadora</option>
                    <option value="mecanico_excavadora">Mecánico con excavadora</option>
                    <option value="voladura_controlada">Voladura controlada</option>
                    <option value="mixto">Método mixto</option>
                  </select>
                  {errors.metodo_excavacion && <ErrorMessage className="mt-1">{errors.metodo_excavacion.message}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="turno_trabajo">
                    Turno de Trabajo
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="turno_trabajo" 
                    {...register("turno_trabajo")}>
                    <option value="">-- Seleccione turno --</option>
                    <option value="1_turno">1 turno (8 horas/día)</option>
                    <option value="2_turnos">2 turnos (16 horas/día)</option>
                    <option value="3_turnos">3 turnos (24 horas/día)</option>
                  </select>
                </FormGroup>
              </div>
            </div>

            {/* ===== CONDICIONES GEOLÓGICAS Y AMBIENTALES ===== */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b border-green-200 pb-2">
                🌍 Condiciones Geológicas y Ambientales
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="nivel_freatico">
                    Nivel Freático (m)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="nivel_freatico" placeholder="3.50"
                    {...register("nivel_freatico")} 
                  />
                  <small className="text-gray-500 mt-1 block">Profundidad del agua subterránea</small>
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="coordenada_norte">
                    Coordenada UTM Norte
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="coordenada_norte" placeholder="8668542.15"
                    {...register("coordenada_norte")} 
                  />
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="coordenada_este">
                    Coordenada UTM Este
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="coordenada_este" placeholder="287543.89"
                    {...register("coordenada_este")} 
                  />
                </FormGroup>
              </div>

              <FormGroup>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="pendiente_terreno">
                  Pendiente Natural del Terreno (%)
                </label>
                <input 
                  className="w-full md:w-1/3 border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  type="number" step="0.1" id="pendiente_terreno" placeholder="2.5"
                  {...register("pendiente_terreno")} 
                />
                <small className="text-gray-500 mt-1 block">Inclinación natural del terreno</small>
              </FormGroup>
            </div>

            {/* ===== PLANIFICACIÓN Y EQUIPO RESPONSABLE ===== */}
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b border-yellow-200 pb-2">
                📅 Planificación y Equipo Responsable
              </h3>
              
              {/* Fechas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="fecha_inicio">
                    Fecha de Inicio *
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="date" id="fecha_inicio" 
                    {...register("fecha_inicio", { required: "La fecha de inicio es obligatoria" })} 
                  />
                  {errors.fecha_inicio && <ErrorMessage className="mt-1">{errors.fecha_inicio.message}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="fecha_fin_estimada">
                    Fecha Estimada de Finalización
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="date" id="fecha_fin_estimada" 
                    {...register("fecha_fin_estimada")} 
                  />
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="duracion_estimada">
                    Duración Estimada (días)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" id="duracion_estimada" placeholder="45"
                    {...register("duracion_estimada")} 
                  />
                </FormGroup>
              </div>

              {/* Responsables */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="ingeniero_responsable">
                    Ingeniero Responsable
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="ingeniero_responsable" 
                    {...register("ingeniero_responsable")}>
                    <option value="">-- Seleccione ingeniero --</option>
                    <option value="ing_1">Ing. Carlos Mendoza</option>
                    <option value="ing_2">Ing. Ana García</option>
                    <option value="ing_3">Ing. Luis Fernández</option>
                  </select>
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="residente_obra">
                    Residente de Obra
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="residente_obra" 
                    {...register("residente_obra")}>
                    <option value="">-- Seleccione residente --</option>
                    <option value="res_1">Res. Pedro Castillo</option>
                    <option value="res_2">Res. María López</option>
                    <option value="res_3">Res. José Vargas</option>
                  </select>
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="supervisor_seguridad">
                    Supervisor de Seguridad
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="supervisor_seguridad" 
                    {...register("supervisor_seguridad")}>
                    <option value="">-- Seleccione supervisor --</option>
                    <option value="sup_1">Sup. Roberto Silva</option>
                    <option value="sup_2">Sup. Carmen Torres</option>
                    <option value="sup_3">Sup. Miguel Ríos</option>
                  </select>
                </FormGroup>
              </div>
            </div>

            {/* ===== ESTADO Y OBSERVACIONES ===== */}
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b border-purple-200 pb-2">
                📊 Estado y Observaciones Técnicas
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="estado">
                    Estado de la Excavación *
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="estado" 
                    {...register("estado", { required: "El estado es obligatorio" })}>
                    <option value="">-- Seleccione estado --</option>
                    <option value="planificada">📋 Planificada</option>
                    <option value="en_proceso">🚧 En proceso</option>
                    <option value="suspendida">⏸️ Suspendida</option>
                    <option value="completada">✅ Completada</option>
                    <option value="cancelada">❌ Cancelada</option>
                  </select>
                  {errors.estado && <ErrorMessage className="mt-1">{errors.estado.message}</ErrorMessage>}
                </FormGroup>
              </div>
              
              <FormGroup>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="observaciones">
                  Observaciones Técnicas
                </label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" 
                  id="observaciones" rows="4"
                  {...register("observaciones")} 
                  placeholder="Incluya notas especiales sobre el suelo, restricciones ambientales, presencia de servicios subterráneos, condiciones especiales de seguridad, etc.">
                </textarea>
                <small className="text-gray-500 mt-1 block">Información adicional relevante para la ejecución de la excavación</small>
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
                disabled={isSubmitting} 
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  {isSubmitting ? "Registrando..." : "Registrar Excavación"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </ModalContainer>
  )
}

export default RegistrarExcavacion