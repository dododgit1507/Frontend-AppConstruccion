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

const RegistrarSector = ({ anilloId, onClose }) => {

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      estado: 'pendiente' // Al registrar inicia como pendiente
    }
  });

  // Mutación con React Query
  const { mutate, isPending } = sectorService.useSectorCreateMutation();

  const onSubmit = (data) => {
    mutate({ ...data, id_anillo: anilloId }, {
      onSuccess: () => {
        toast.success("Sector registrado exitosamente");
      },
      onError: (error) => {
        console.error(error);
        toast.error("Error al crear el sector");
      }
    });
  }

  return (
    <ModalContainer>
      <Modal className="max-w-4xl w-full mx-4">
        <div className="p-8">
          <FormTitle className="text-2xl font-bold text-gray-800 mb-6">
            Registrar Nuevo Sector
            <X onClick={onClose} className="cursor-pointer hover:bg-gray-100 p-1 rounded" size={28} />
          </FormTitle>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* ===== IDENTIFICACIÓN DEL SECTOR ===== */}
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b border-indigo-200 pb-2">
                🔶 Identificación del Sector
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="nombre">
                    Nombre/Código del Sector *
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="text" id="nombre" placeholder="Ej: SECTOR-A1, SEC-01"
                    {...register("nombre", { required: "El nombre es obligatorio" })} 
                  />
                  {errors.nombre && <ErrorMessage className="mt-1">{errors.nombre.message}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="ubicacion_relativa">
                    Ubicación Relativa en el Anillo
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="ubicacion_relativa" 
                    {...register("ubicacion_relativa")}>
                    <option value="">-- Posición en el anillo --</option>
                    <option value="norte">Norte</option>
                    <option value="sur">Sur</option>
                    <option value="este">Este</option>
                    <option value="oeste">Oeste</option>
                    <option value="noreste">Noreste</option>
                    <option value="noroeste">Noroeste</option>
                    <option value="sureste">Sureste</option>
                    <option value="suroeste">Suroeste</option>
                    <option value="centro">Centro</option>
                  </select>
                </FormGroup>
              </div>
            </div>

            {/* ===== DIMENSIONES PLANIFICADAS ===== */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b border-green-200 pb-2">
                📐 Dimensiones Planificadas
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="volumen">
                    Volumen Planificado (m³) *
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="volumen" placeholder="125.50"
                    {...register("volumen", { required: "El volumen es obligatorio" })} 
                  />
                  {errors.volumen && <ErrorMessage className="mt-1">{errors.volumen.message}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="profundidad">
                    Profundidad Planificada (m) *
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="profundidad" placeholder="1.50"
                    {...register("profundidad", { required: "La profundidad es obligatoria" })} 
                  />
                  {errors.profundidad && <ErrorMessage className="mt-1">{errors.profundidad.message}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="area_planificada">
                    Área Planificada (m²)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="area_planificada" placeholder="83.67"
                    {...register("area_planificada")} 
                  />
                </FormGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="longitud_planificada">
                    Longitud Planificada (m)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="longitud_planificada" placeholder="12.50"
                    {...register("longitud_planificada")} 
                  />
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="ancho_planificado">
                    Ancho Planificado (m)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="ancho_planificado" placeholder="6.70"
                    {...register("ancho_planificado")} 
                  />
                </FormGroup>
              </div>
            </div>

            {/* ===== COTAS Y NIVELES DE DISEÑO ===== */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b border-blue-200 pb-2">
                📊 Cotas y Niveles de Diseño
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cota_inicial">
                    Cota Inicial (m.s.n.m.)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="cota_inicial" placeholder="2242.00"
                    {...register("cota_inicial")} 
                  />
                  <small className="text-gray-500 mt-1 block">Nivel donde inicia la excavación</small>
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cota_final_proyecto">
                    Cota Final de Proyecto (m.s.n.m.)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.01" id="cota_final_proyecto" placeholder="2240.50"
                    {...register("cota_final_proyecto")} 
                  />
                  <small className="text-gray-500 mt-1 block">Nivel según diseño final</small>
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="tolerancia_admisible">
                    Tolerancia Admisible (cm)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" step="0.1" id="tolerancia_admisible" placeholder="±2.0"
                    {...register("tolerancia_admisible")} 
                  />
                </FormGroup>
              </div>
            </div>

            {/* ===== PLANIFICACIÓN DE EJECUCIÓN ===== */}
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b border-yellow-200 pb-2">
                📅 Planificación de Ejecución
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
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="duracion_estimada_dias">
                    Duración Estimada (días)
                  </label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    type="number" id="duracion_estimada_dias" placeholder="2"
                    {...register("duracion_estimada_dias")} 
                  />
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="metodo_excavacion_planificado">
                    Método de Excavación Planificado
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="metodo_excavacion_planificado" 
                    {...register("metodo_excavacion_planificado")}>
                    <option value="">-- Método planificado --</option>
                    <option value="manual">Manual</option>
                    <option value="retroexcavadora">Retroexcavadora</option>
                    <option value="excavadora">Excavadora</option>
                    <option value="mini_excavadora">Mini excavadora</option>
                    <option value="corte_mecanico">Corte mecánico</option>
                    <option value="mixto">Método mixto</option>
                  </select>
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="clasificacion_material_esperado">
                    Clasificación de Material Esperado
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="clasificacion_material_esperado" 
                    {...register("clasificacion_material_esperado")}>
                    <option value="">-- Tipo de material esperado --</option>
                    <option value="material_comun">Material común</option>
                    <option value="material_seleccionado">Material seleccionado</option>
                    <option value="roca_suelta">Roca suelta</option>
                    <option value="roca_fija">Roca fija</option>
                    <option value="suelo_mixto">Suelo mixto</option>
                  </select>
                </FormGroup>
              </div>
            </div>

            {/* ===== ESTADO INICIAL Y OBSERVACIONES ===== */}
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-6 border-b border-purple-200 pb-2">
                📋 Estado Inicial y Observaciones
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="estado">
                    Estado Inicial del Sector *
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="estado" 
                    {...register("estado", { required: "El estado es obligatorio" })}>
                    <option value="pendiente">📋 Pendiente</option>
                    <option value="planificado">📝 Planificado</option>
                    <option value="listo_para_inicio">✅ Listo para inicio</option>
                  </select>
                  {errors.estado && <ErrorMessage className="mt-1">{errors.estado.message}</ErrorMessage>}
                </FormGroup>
                
                <FormGroup>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="responsable_asignado">
                    Responsable Asignado
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    id="responsable_asignado" 
                    {...register("responsable_asignado")}>
                    <option value="">-- Asignar responsable --</option>
                    <option value="capataz_1">Capataz Juan Pérez</option>
                    <option value="capataz_2">Capataz María García</option>
                    <option value="operador_1">Operador Carlos López</option>
                    <option value="supervisor_1">Supervisor Miguel Torres</option>
                  </select>
                </FormGroup>
              </div>
              
              <FormGroup>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="observaciones_planificacion">
                  Observaciones de Planificación
                </label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" 
                  id="observaciones_planificacion" rows="4"
                  {...register("observaciones_planificacion")} 
                  placeholder="Incluya consideraciones especiales para la excavación de este sector, condiciones esperadas, restricciones, etc.">
                </textarea>
                <small className="text-gray-500 mt-1 block">Notas importantes para la planificación y ejecución del sector</small>
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
                  {isPending ? "Registrando..." : "Registrar Sector"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </ModalContainer>
  )
}

export default RegistrarSector;