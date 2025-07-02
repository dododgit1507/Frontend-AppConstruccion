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
import FormGroup from "@/components/ui/FormGroup";
import ErrorMessage from "@/components/ui/ErrorMessage";

// Servicio de Material
import materialService from "@/services/materialService";

const EditarMaterial = ({ onClose, material }) => {
  // Usar el hook de mutación de React Query
  const updateMaterialMutation = materialService.useUpdateMaterial();

  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm({
    defaultValues: {
      nombre: material.nombre || '',
      descripcion: material.descripcion || '',
      precio_unitario: material.precio_unitario || '',
      unidad_medida: material.unidad_medida || '',
      tipo_material: material.tipo_material || '',
      stock_actual: material.stock_actual || '',
      es_peligroso: material.es_peligroso || false,
      activo: material.activo || false,
      fecha_creacion: material.fecha_creacion || '',
      id_proyecto: material.id_proyecto || ''
    }
  });

  const onSubmit = async (data) => {
    try {
      // Usar la mutación en lugar de llamar directamente al servicio
      await updateMaterialMutation.mutateAsync({ 
        id: material.id_material, 
        data 
      });
      toast.success("Material editado exitosamente");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error al editar el material");
    }
  }

  return (
    <ModalContainer>
      <Modal>
        <FormTitle>Editar Material <X onClick={onClose} className="cursor-pointer" /></FormTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Separador />
          
          <FormDivisor>
            <div className="flex-1/2">
              <FormSubtitle>Información General</FormSubtitle>
            </div>
            <div className="flex-1/2 space-y-2">
              <FormGroup>
                <label htmlFor="nombre">Nombre *</label>
                <input 
                  className="border border-slate-200 rounded-lg p-2 w-full" 
                  type="text" 
                  id="nombre" 
                  {...register("nombre", { required: "El nombre es obligatorio" })} 
                />
                {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="descripcion">Descripción</label>
                <textarea 
                  className="border border-slate-200 rounded-lg p-2 w-full resize-none" 
                  id="descripcion" 
                  rows="3"
                  {...register("descripcion")} 
                />
                {errors.descripcion && <ErrorMessage>{errors.descripcion.message}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="tipo_material">Tipo de Material *</label>
                <input 
                  className="border border-slate-200 rounded-lg p-2 w-full" 
                  type="text" 
                  id="tipo_material" 
                  {...register("tipo_material", { required: "El tipo de material es obligatorio" })} 
                />
                {errors.tipo_material && <ErrorMessage>{errors.tipo_material.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>

          <FormDivisor>
            <div className="flex-1/2">
              <FormSubtitle>Información Comercial</FormSubtitle>
            </div>
            <div className="flex-1/2 space-y-2">
              <FormGroup>
                <label htmlFor="precio_unitario">Precio Unitario *</label>
                <input 
                  className="border border-slate-200 rounded-lg p-2 w-full" 
                  type="number" 
                  id="precio_unitario" 
                  step="0.01"
                  min="0"
                  {...register("precio_unitario", { 
                    required: "El precio unitario es obligatorio",
                    min: { value: 0, message: "El precio debe ser mayor a 0" }
                  })} 
                />
                {errors.precio_unitario && <ErrorMessage>{errors.precio_unitario.message}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="unidad_medida">Unidad de Medida *</label>
                <select 
                  className="border border-slate-200 rounded-lg p-2 w-full" 
                  id="unidad_medida" 
                  {...register("unidad_medida", { required: "La unidad de medida es obligatoria" })}
                >
                  <option value="">Seleccione una unidad</option>
                  <option value="kg">Kilogramos (kg)</option>
                  <option value="m">Metros (m)</option>
                  <option value="m2">Metros cuadrados (m²)</option>
                  <option value="m3">Metros cúbicos (m³)</option>
                  <option value="lt">Litros (lt)</option>
                  <option value="und">Unidades (und)</option>
                  <option value="ton">Toneladas (ton)</option>
                  <option value="saco">Sacos</option>
                  <option value="caja">Cajas</option>
                </select>
                {errors.unidad_medida && <ErrorMessage>{errors.unidad_medida.message}</ErrorMessage>}
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="stock_actual">Stock Actual *</label>
                <input 
                  className="border border-slate-200 rounded-lg p-2 w-full" 
                  type="number" 
                  id="stock_actual" 
                  step="0.01"
                  min="0"
                  {...register("stock_actual", { 
                    required: "El stock actual es obligatorio",
                    min: { value: 0, message: "El stock no puede ser negativo" }
                  })} 
                />
                {errors.stock_actual && <ErrorMessage>{errors.stock_actual.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>

          <FormDivisor>
            <div className="flex-1/2">
              <FormSubtitle>Configuración</FormSubtitle>
            </div>
            <div className="flex-1/2 space-y-2">
              <FormGroup>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="es_peligroso" 
                    {...register("es_peligroso")} 
                  />
                  <label htmlFor="es_peligroso">Material peligroso</label>
                </div>
              </FormGroup>
              
              <FormGroup>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="activo" 
                    {...register("activo")} 
                  />
                  <label htmlFor="activo">Material activo</label>
                </div>
              </FormGroup>
            </div>
          </FormDivisor>

          <FormDivisor>
            <div className="flex-1/2">
              <FormSubtitle>Información del Sistema</FormSubtitle>
            </div>
            <div className="flex-1/2 space-y-2">
              <FormGroup>
                <label htmlFor="fecha_creacion">Fecha de Creación</label>
                <input 
                  className="border border-slate-200 rounded-lg p-2 w-full bg-gray-50" 
                  type="date" 
                  id="fecha_creacion" 
                  {...register("fecha_creacion")} 
                  readOnly
                />
              </FormGroup>
              

            </div>
          </FormDivisor>

          <div className="flex flex-row justify-end gap-4">
            <button 
              type="button" 
              className="bg-slate-100 text-slate-500 py-3 px-6 rounded-lg hover:bg-slate-200 transition-colors"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting || !isDirty} 
              className={`bg-blue-500 text-white py-3 px-6 rounded-lg transition-colors ${
                isSubmitting || !isDirty 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:bg-blue-600"
              }`}
            >
              <span className="flex items-center gap-2">
                <Save size={16} />
                {isSubmitting ? "Guardando..." : "Guardar"}
              </span>
            </button>
          </div>
        </form>
      </Modal>
    </ModalContainer>
  )
}

export default EditarMaterial;