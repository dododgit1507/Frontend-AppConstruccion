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

const RegistrarAnillo = ({ excavacionId, onClose }) => {

  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm();
  
  // Usar la mutación de React Query para crear anillos
  const anilloCreateMutation = anilloService.useAnilloCreateMutation();

  const onSubmit = async (data) => {
    try {
      await anilloCreateMutation.mutateAsync({ ...data, id_excavacion: excavacionId })
      toast.success("Anillo registrado exitosamente")
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el anillo");
    }
  }

  return (
    <ModalContainer>
      <Modal className="max-w-5xl w-full mx-4">
        <div className="p-8">
          <FormTitle className="text-2xl font-bold text-gray-800 mb-6">
            Registrar Nuevo Anillo
            <X onClick={onClose} className="cursor-pointer hover:bg-gray-100 p-1 rounded" size={28} />
          </FormTitle>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* ===== IDENTIFICACIÓN DEL ANILLO ===== */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b border-blue-200 pb-2">
                🔵 Identificación del Anillo
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="nombre">
                    Nombre/Código del Anillo *
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="text" id="nombre" placeholder="Ej: ANILLO-01, ANILLO-A"
                    {...register("nombre", { required: "El nombre es obligatorio" })} 
                  />
                  {errors.nombre && <ErrorMessage className="mt-1">{errors.nombre.message}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="numero_secuencia">
                    Número de Secuencia
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" id="numero_secuencia" placeholder="1, 2, 3..."
                    {...register("numero_secuencia")} 
                  />
                  <small className="text-gray-500 mt-1 block">Orden de excavación del anillo</small>
                </FormGroup>
              </div>
            </div>

            {/* ===== DIMENSIONES TÉCNICAS ===== */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b border-green-200 pb-2">
                📐 Dimensiones Técnicas
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="profundidad">
                    Profundidad del Anillo (m) *
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="profundidad" placeholder="3.50"
                    {...register("profundidad", { required: "La profundidad es obligatoria" })} 
                  />
                  {errors.profundidad && <ErrorMessage className="mt-1">{errors.profundidad.message}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="volumen">
                    Volumen del Anillo (m³) *
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="volumen" placeholder="875.50"
                    {...register("volumen", { required: "El volumen es obligatorio" })} 
                  />
                  {errors.volumen && <ErrorMessage className="mt-1">{errors.volumen.message}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="altura_anillo">
                    Altura del Anillo (m)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="altura_anillo" placeholder="1.50"
                    {...register("altura_anillo")} 
                  />
                  <small className="text-gray-500 mt-1 block">Espesor vertical del anillo</small>
                </FormGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cota_superior">
                    Cota Superior (m.s.n.m.)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="cota_superior" placeholder="2242.00"
                    {...register("cota_superior")} 
                  />
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cota_inferior">
                    Cota Inferior (m.s.n.m.)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="cota_inferior" placeholder="2240.50"
                    {...register("cota_inferior")} 
                  />
                </FormGroup>
              </div>
            </div>

            {/* ===== CARACTERÍSTICAS GEOTÉCNICAS ===== */}
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b border-yellow-200 pb-2">
                🌍 Características Geotécnicas del Anillo
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="tipo_suelo_predominante">
                    Tipo de Suelo Predominante
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="tipo_suelo_predominante" 
                    {...register("tipo_suelo_predominante")}>
                    <option value="">-- Seleccione tipo de suelo --</option>
                    <option value="arcilla_blanda">Arcilla blanda</option>
                    <option value="arcilla_dura">Arcilla dura</option>
                    <option value="arena_suelta">Arena suelta</option>
                    <option value="arena_compacta">Arena compacta</option>
                    <option value="grava">Grava</option>
                    <option value="roca_meteorizada">Roca meteorizada</option>
                    <option value="roca_sana">Roca sana</option>
                    <option value="suelo_mixto">Suelo mixto</option>
                  </select>
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="estabilidad_talud">
                    Estabilidad del Talud
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="estabilidad_talud" 
                    {...register("estabilidad_talud")}>
                    <option value="">-- Evalúe la estabilidad --</option>
                    <option value="estable">Estable</option>
                    <option value="moderadamente_estable">Moderadamente estable</option>
                    <option value="inestable">Inestable</option>
                    <option value="requiere_sostenimiento">Requiere sostenimiento</option>
                  </select>
                </FormGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="presencia_agua">
                    Presencia de Agua
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="presencia_agua" 
                    {...register("presencia_agua")}>
                    <option value="">-- Estado del agua --</option>
                    <option value="seco">Seco</option>
                    <option value="humedo">Húmedo</option>
                    <option value="goteo">Goteo</option>
                    <option value="filtracion">Filtración</option>
                    <option value="agua_abundante">Agua abundante</option>
                  </select>
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="dificultad_excavacion">
                    Dificultad de Excavación
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="dificultad_excavacion" 
                    {...register("dificultad_excavacion")}>
                    <option value="">-- Nivel de dificultad --</option>
                    <option value="facil">Fácil</option>
                    <option value="moderada">Moderada</option>
                    <option value="dificil">Difícil</option>
                    <option value="muy_dificil">Muy difícil</option>
                  </select>
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="angulo_talud">
                    Ángulo de Talud (°)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.1" id="angulo_talud" placeholder="45.0"
                    {...register("angulo_talud")} 
                  />
                </FormGroup>
              </div>
            </div>

            {/* ===== PLANIFICACIÓN Y EJECUCIÓN ===== */}
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b border-purple-200 pb-2">
                📅 Planificación y Ejecución
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="fecha_inicio_planificada">
                    Fecha Inicio Planificada
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="date" id="fecha_inicio_planificada" 
                    {...register("fecha_inicio_planificada")} 
                  />
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="fecha_fin_planificada">
                    Fecha Fin Planificada
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="date" id="fecha_fin_planificada" 
                    {...register("fecha_fin_planificada")} 
                  />
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="duracion_estimada_dias">
                    Duración Estimada (días)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" id="duracion_estimada_dias" placeholder="5"
                    {...register("duracion_estimada_dias")} 
                  />
                </FormGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="metodo_excavacion_anillo">
                    Método de Excavación para este Anillo
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="metodo_excavacion_anillo" 
                    {...register("metodo_excavacion_anillo")}>
                    <option value="">-- Método específico --</option>
                    <option value="manual">Manual</option>
                    <option value="retroexcavadora">Retroexcavadora</option>
                    <option value="excavadora">Excavadora</option>
                    <option value="voladura_controlada">Voladura controlada</option>
                    <option value="corte_mecanico">Corte mecánico</option>
                    <option value="mixto">Método mixto</option>
                  </select>
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="prioridad">
                    Prioridad de Ejecución
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="prioridad" 
                    {...register("prioridad")}>
                    <option value="">-- Nivel de prioridad --</option>
                    <option value="muy_alta">🔴 Muy Alta</option>
                    <option value="alta">🟠 Alta</option>
                    <option value="media">🟡 Media</option>
                    <option value="baja">🟢 Baja</option>
                  </select>
                </FormGroup>
              </div>
            </div>

            {/* ===== ESTADO Y OBSERVACIONES ===== */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b border-gray-200 pb-2">
                📊 Estado y Observaciones
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="estado">
                    Estado del Anillo *
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="estado" 
                    {...register("estado", { required: "El estado es obligatorio" })}>
                    <option value="">-- Seleccione estado --</option>
                    <option value="pendiente">📋 Pendiente</option>
                    <option value="iniciada">🚧 Iniciada</option>
                    <option value="en_progreso">⚙️ En progreso</option>
                    <option value="finalizada">✅ Finalizada</option>
                    <option value="suspendida">⏸️ Suspendida</option>
                    <option value="requiere_revision">⚠️ Requiere revisión</option>
                  </select>
                  {errors.estado && <ErrorMessage className="mt-1">{errors.estado.message}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="porcentaje_avance">
                    Porcentaje de Avance (%)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" min="0" max="100" id="porcentaje_avance" placeholder="0"
                    {...register("porcentaje_avance")} 
                  />
                </FormGroup>
              </div>
              
              <FormGroup>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="observaciones">
                  Observaciones Técnicas del Anillo
                </label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" 
                  id="observaciones" rows="4"
                  {...register("observaciones")} 
                  placeholder="Incluya observaciones sobre condiciones del suelo, dificultades encontradas, medidas de seguridad especiales, etc.">
                </textarea>
                <small className="text-gray-500 mt-1 block">Información técnica relevante para la excavación de este anillo específico</small>
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
                disabled={isSubmitting || !isDirty} 
                className={`px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium ${isSubmitting || !isDirty ? "opacity-50 cursor-not-allowed" : ""}`}>
                <span className="flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  {isSubmitting ? "Registrando..." : "Registrar Anillo"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </ModalContainer>
  )
}

export default RegistrarAnillo;