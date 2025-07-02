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

import materialService from '@/services/materialService';
import { useProyecto } from '@/context/ProyectoContext';

const RegistrarMaterial = ({ onClose }) => {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  
  // Obtener el proyecto actual desde el contexto usando el hook personalizado
  const { proyectoActual } = useProyecto();

  // Usar el hook de mutación de React Query
  const createMaterialMutation = materialService.useCreateMaterial();

  const onSubmit = async (data) => {
    try {
      // Agregar el ID del proyecto a los datos
      const materialData = {
        ...data,
        id_proyecto: proyectoActual?.id_proyecto
      };
      
      await createMaterialMutation.mutateAsync(materialData);
      toast.success("Material creado exitosamente");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <ModalContainer>
      <Modal>
        <FormTitle>Registrar Material <X onClick={onClose} className="cursor-pointer" /></FormTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Separador />
          <FormDivisor>
            {/* Titulo */}
            <div className="flex-1/2">
              <FormSubtitle>Información General</FormSubtitle>
            </div>
            {/* Contenido */}
            <div className="flex-1/2 space-y-2">
              <FormGroup>
                <label htmlFor="nombre">Nombre</label>
                <input className="border border-slate-200 rounded-lg p-2" type="text" id="nombre" placeholder="Ejemplo: Cemento Portland"
                  {...register("nombre", { required: "El nombre es obligatorio" })} />
                {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="precio_unitario">Precio Unitario</label>
                <input className="border border-slate-200 rounded-lg p-2" type="number" step="0.01" id="precio_unitario" placeholder="Ejemplo: 25.50"
                  {...register("precio_unitario", { required: "El precio unitario es obligatorio", min: { value: 0, message: "El precio debe ser mayor a 0" } })} />
                {errors.precio_unitario && <ErrorMessage>{errors.precio_unitario.message}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="unidad_medida">Unidad de Medida</label>
                <input className="border border-slate-200 rounded-lg p-2" type="text" id="unidad_medida" placeholder="Ejemplo: kg, m³, unidad"
                  {...register("unidad_medida", { required: "La unidad de medida es obligatoria" })} />
                {errors.unidad_medida && <ErrorMessage>{errors.unidad_medida.message}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="descripcion">Descripción</label>
                <textarea className="border border-slate-200 rounded-lg p-2" id="descripcion" placeholder="Descripción del material" rows="3"
                  {...register("descripcion")} />
              </FormGroup>
              <FormGroup>
                <label htmlFor="tipo_material">Tipo de Material</label>
                <input className="border border-slate-200 rounded-lg p-2" type="text" id="tipo_material" placeholder="Ejemplo: Construcción, Herramientas"
                  {...register("tipo_material", { required: "El tipo de material es obligatorio" })} />
                {errors.tipo_material && <ErrorMessage>{errors.tipo_material.message}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="stock_actual">Stock Actual</label>
                <input className="border border-slate-200 rounded-lg p-2" type="number" step="0.01" id="stock_actual" placeholder="Ejemplo: 100"
                  {...register("stock_actual", { required: "El stock actual es obligatorio", min: { value: 0, message: "El stock debe ser mayor o igual a 0" } })} />
                {errors.stock_actual && <ErrorMessage>{errors.stock_actual.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>
          <FormDivisor>
            { /* Subtitulo */}
            <div className="flex-1/2">
              <FormSubtitle>Estado y Configuración</FormSubtitle>
            </div>
            { /* Contenido */}
            <div className="flex-1/2 space-y-2">
              <FormGroup>
                <label htmlFor="es_peligroso">¿Es Peligroso?</label>
                <select className="border border-slate-200 rounded-lg p-2" name="es_peligroso" id="es_peligroso" {...register("es_peligroso", { required: "Debe especificar si es peligroso" })}>
                  <option value="">Seleccione una opción</option>
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
                {errors.es_peligroso && <ErrorMessage>{errors.es_peligroso.message}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="activo">Estado</label>
                <select className="border border-slate-200 rounded-lg p-2" name="activo" id="activo" {...register("activo", { required: "El estado es obligatorio" })}>
                  <option value="">Seleccione un estado</option>
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
                {errors.activo && <ErrorMessage>{errors.activo.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>

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

export default RegistrarMaterial;