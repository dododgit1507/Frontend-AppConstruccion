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

import camionService from '@/services/camionService';

const EditarCamion = ({ onClose, camion }) => {

  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm({
    defaultValues: {
      placa: camion.placa,
      marca: camion.marca,
      modelo: camion.modelo,
      anio_fabricacion: camion.anio_fabricacion,
      tipo_camion: camion.tipo_camion,
      capacidad_carga: camion.capacidad_carga,
      estado: camion.estado
    }
  });

  // Usar el hook de mutación de React Query
  const updateCamionMutation = camionService.useUpdateCamion();

  const onSubmit = async (id, data) => {
    try {
      await updateCamionMutation.mutateAsync({ id, data });
      toast.success("Camión actualizado exitosamente");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.data.error.message);
    }
  }

  return (
    <ModalContainer>
      <Modal>
        <FormTitle>Editar Camión <X onClick={onClose} className="cursor-pointer" /></FormTitle>
        <form onSubmit={handleSubmit((data) => onSubmit(camion.id_camion, data))} className="space-y-4">
          <Separador />
          <FormDivisor>
            {/* Titulo */}
            <div className="flex-1/2">
              <FormSubtitle>Información General</FormSubtitle>
            </div>
            {/* Contenido */}
            <div className="flex-1/2 space-y-2">
              <FormGroup>
                <label htmlFor="placa">Placa</label>
                <input className="border border-slate-200 rounded-lg p-2" type="text" id="placa" placeholder="Ejemplo: ABC-123"
                  {...register("placa", { required: "La placa es obligatoria" })} />
                {errors.placa && <ErrorMessage>{errors.placa.message}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="marca">Marca</label>
                <input className="border border-slate-200 rounded-lg p-2" type="text" id="marca" placeholder="Ejemplo: Mercedes-Benz"
                  {...register("marca", { required: "La marca es obligatoria" })} />
                {errors.marca && <ErrorMessage>{errors.marca.message}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="modelo">Modelo</label>
                <input className="border border-slate-200 rounded-lg p-2" type="text" id="modelo" placeholder="Ejemplo: Clase A"
                  {...register("modelo", { required: "El modelo es obligatorio" })} />
                {errors.modelo && <ErrorMessage>{errors.modelo.message}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="anio_fabricacion">Año de Fabricación</label>
                <input className="border border-slate-200 rounded-lg p-2" type="number" id="anio_fabricacion" placeholder="Ejemplo: 2025"
                  {...register("anio_fabricacion", { required: "El año de fabricación es obligatorio" })} />
                {errors.anio_fabricacion && <ErrorMessage>{errors.anio_fabricacion.message}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="tipo_camion">Tipo de Camión</label>
                <input className="border border-slate-200 rounded-lg p-2" type="text" id="tipo_camion" placeholder="Ejemplo: Camion Grua - Camion Cisterna"
                  {...register("tipo_camion", { required: "El tipo de camión es obligatorio" })} />
                {errors.tipo_camion && <ErrorMessage>{errors.tipo_camion.message}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="capacidad_carga">Capacidad de Carga (m³) </label>
                <input className="border border-slate-200 rounded-lg p-2" type="number" id="capacidad_carga" placeholder="Ejemplo: 1000"
                  {...register("capacidad_carga", { required: "La capacidad de carga es obligatoria" })} />
                {errors.capacidad_carga && <ErrorMessage>{errors.capacidad_carga.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>
          <FormDivisor>
            { /* Subtitulo */}
            <div className="flex-1/2">
              <FormSubtitle>Estado del Camión</FormSubtitle>
            </div>
            { /* Contenido */}
            <div className="flex-1/2 space-y-2">
              <FormGroup>
                <label htmlFor="estado">Estado</label>
                <select className="border border-slate-200 rounded-lg p-2" name="estado" id="estado" {...register("estado", { required: "El estado es obligatorio" })}>
                  <option value="">Seleccione un estado</option>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="mantenimiento">En Mantenimiento</option>
                </select>
                {errors.estado && <ErrorMessage>{errors.estado.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>

          <div className="flex flex-row justify-end gap-4">
            <button type="button" className="bg-slate-100 text-slate-500 py-3 px-6 rounded-lg"
              onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting || !isDirty} className={`bg-blue-500 text-white py-3 px-6 rounded-lg ${isSubmitting || !isDirty ? "opacity-50 cursor-not-allowed" : ""}`}>
              <span className="flex items-center gap-2"><Save />{isSubmitting ? "Guardando..." : "Guardar"}</span>
            </button>
          </div>
        </form>
      </Modal>
    </ModalContainer>
  )

}

export default EditarCamion;