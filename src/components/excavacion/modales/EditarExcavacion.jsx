import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { X, Save } from "lucide-react";
import { createPortal } from "react-dom";

// Servicio de Excavacion
import excavacionService from "@/services/excavacion/excavacionService";

const EditarExcavacion = ({ excavacion, onClose }) => {

   const updateExcavacionMutation = excavacionService.useExcavacionUpdateMutation();

  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm({
    defaultValues: {
      nombre: excavacion.nombre,
      profundidad: excavacion.profundidad,
      volumen: excavacion.volumen,
      estado: excavacion.estado,
      fecha_inicio: excavacion.fecha_inicio
    }
  });

  const onSubmit = async (id, data) => {
    try {
      // Usar la mutación en lugar de llamar directamente al servicio
      await updateExcavacionMutation.mutateAsync({ id, data });
      toast.success("Excavacion editada exitosamente");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error al editar la excavacion");
    }
  }

  // Portal simple sin componentes adicionales
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 pb-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Editar Excavacion</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit((data) => onSubmit(excavacion.id_excavacion, data))} className="space-y-6">
            {/* Información General */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Información General</h3>
              </div>
              
              <div className="space-y-1">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="text" 
                  id="nombre" 
                  {...register("nombre", { required: "El nombre es obligatorio" })} 
                />
                {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="profundidad" className="block text-sm font-medium text-gray-700">Profundidad (m)</label>
                <input 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="number" 
                  step="0.01"
                  id="profundidad" 
                  {...register("profundidad", { required: "La profundidad es obligatoria" })} 
                />
                {errors.profundidad && <p className="text-red-500 text-sm">{errors.profundidad.message}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="volumen" className="block text-sm font-medium text-gray-700">Volumen (m³)</label>
                <input 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="number" 
                  step="0.01"
                  id="volumen" 
                  {...register("volumen", { required: "El volumen es obligatorio" })} 
                />
                {errors.volumen && <p className="text-red-500 text-sm">{errors.volumen.message}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  id="estado" 
                  {...register("estado", { required: "El estado es obligatorio" })}
                >
                  <option value="">Seleccione un estado</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="iniciada">Iniciada</option>
                  <option value="finalizada">Finalizada</option>
                </select>
                {errors.estado && <p className="text-red-500 text-sm">{errors.estado.message}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="fecha_inicio" className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
                <input 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  type="date" 
                  id="fecha_inicio" 
                  {...register("fecha_inicio", { required: "La fecha de inicio es obligatoria" })} 
                />
                {errors.fecha_inicio && <p className="text-red-500 text-sm">{errors.fecha_inicio.message}</p>}
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button 
                type="button" 
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting || !isDirty} 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Save size={16} />
                {isSubmitting ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default EditarExcavacion