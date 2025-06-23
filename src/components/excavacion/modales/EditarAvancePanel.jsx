import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from 'react';
import { X, Save, Upload, Image } from 'lucide-react';
import { toast } from 'sonner';
import avance_panelService from '@/services/excavacion/avance_panelService';
import camionService from '@/services/camionService';
import cloudinaryService from '@/services/cloudinaryService';
// Componentes de UI
import ModalContainer from "@/components/ui/ModalContainer";
import Modal from "@/components/ui/Modal";
import Separador from "@/components/ui/Separador";
import FormTitle from "@/components/ui/FormTitle";
import FormSubtitle from "@/components/ui/FormSubtitle";
import FormDivisor from "@/components/ui/FormDivisor";
import ErrorMessage from "@/components/ui/ErrorMessage";
import FormGroup from "@/components/ui/FormGroup";

const EditarAvancePanel = ({ avance, onClose, onSuccess }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm({
    defaultValues: {
      id_panel: avance.id_panel,
      id_camion: avance.id_camion || '',
      volumen_removido: avance.volumen_removido || '',
      tipo_material: avance.tipo_material || '',
      hora: avance.hora || '',
      turno: avance.turno || '',
      clima: avance.clima || '',
      observaciones: avance.observaciones || '',
      fecha: avance.fecha ? new Date(avance.fecha).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    }
  });

  const [serverError, setServerError] = useState('');

  // Obtener camiones usando React Query
  const { data: camiones = [], isLoading: loadingCamiones } = camionService.useGetCamiones();

  // Mutación con React Query (si está disponible)
  const { mutate, isPending } = avance_panelService.useUpdateAvance ?
    avance_panelService.useUpdateAvance() :
    { mutate: null, isPending: false };

  // Referencia al input de archivo
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(avance.imagenurl || null);

  // Manejar cambio de archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Crear una URL para previsualizar la imagen
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Manejar envío del formulario
  const onSubmit = async (data) => {
    setServerError('');
    setIsUploading(true);

    try {
      // Subir imagen a Cloudinary si hay un archivo seleccionado
      let imageUrl = avance.imagenurl;
      const imageFile = fileInputRef.current?.files[0];

      if (imageFile) {
        try {
          const uploadResult = await cloudinaryService.uploadImage(imageFile);
          imageUrl = uploadResult.secure_url;
          toast.success('Imagen subida correctamente');
        } catch (error) {
          console.error('Error al subir la imagen:', error);
          toast.error('Error al subir la imagen, pero continuaremos con la actualización');
        }
      }

      // Actualizar datos con la URL de la imagen
      const updatedData = {
        ...data,
        imagenurl: imageUrl
      };

      if (mutate) {
        // Usar React Query si está disponible
        mutate({ id: avance.id_avance_panel, data: updatedData }, {
          onSuccess: () => {
            toast.success('Avance actualizado correctamente');
            onClose();
            if (onSuccess) onSuccess();
          },
          onError: (error) => {
            console.error('Error al actualizar avance:', error);
            setServerError(error.response?.data?.error || 'Error al actualizar el avance');
          },
          onSettled: () => {
            setIsUploading(false);
          }
        });
      } else {
        // Usar método tradicional si React Query no está disponible
        await avance_panelService.update(avance.id_avance_panel, updatedData);
        toast.success('Avance actualizado correctamente');
        onClose();
        if (onSuccess) onSuccess();
        setIsUploading(false);
      }
    } catch (error) {
      console.error('Error al actualizar avance:', error);
      if (error.response?.data?.error) {
        setServerError(error.response.data.error);
      } else {
        toast.error('Error al actualizar el avance');
      }
      setIsUploading(false);
    }
  };

  return (
    <ModalContainer>
      <Modal>
        <FormTitle>Editar Avance de Panel <X onClick={onClose} className="cursor-pointer" /></FormTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Separador />

          {/* Mensaje de error del servidor */}
          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="text-sm">{serverError}</p>
            </div>
          )}

          <FormDivisor>
            {/* Subtitulo */}
            <div className="flex-1/2">
              <FormSubtitle>Información del Avance</FormSubtitle>
            </div>

            {/* Contenido */}
            <div className="flex-1/2 space-y-2">
              {/* Camión */}
              <FormGroup>
                <label htmlFor="id_camion">Camión</label>
                <select
                  id="id_camion"
                  className="border border-slate-200 rounded-lg p-2 w-full"
                  disabled={loadingCamiones}
                  {...register("id_camion", { required: "Debe seleccionar un camión" })}
                >
                  <option value="">Seleccionar camión</option>
                  {camiones.map(camion => (
                    <option key={camion.id_camion} value={camion.id_camion}>
                      {camion.placa} - Capacidad: {camion.capacidad_carga} m³
                    </option>
                  ))}
                </select>
                {errors.id_camion && <ErrorMessage>{errors.id_camion.message}</ErrorMessage>}
              </FormGroup>

              {/* Volumen cargado */}
              <FormGroup>
                <label htmlFor="volumen_removido">Volumen Removido (m³)</label>
                <input
                  type="number"
                  id="volumen_removido"
                  step="0.01"
                  min="0"
                  className="border border-slate-200 rounded-lg p-2 w-full"
                  {...register("volumen_removido", {
                    required: "El volumen removido es obligatorio",
                    min: { value: 0.01, message: "El volumen debe ser mayor a 0" }
                  })}
                />
                {errors.volumen_removido && <ErrorMessage>{errors.volumen_removido.message}</ErrorMessage>}
              </FormGroup>
              {/* Tipo de material */}
              <FormGroup>
                <label htmlFor="tipo_material">Tipo de Material</label>
                <select
                  id="tipo_material"
                  className="border border-slate-200 rounded-lg p-2 w-full"
                  {...register("tipo_material", { required: "El tipo de material es obligatorio" })}
                >
                  <option value="">Seleccionar tipo de material</option>
                  <option value="Arena">Arena</option>
                  <option value="Grava">Grava</option>
                  <option value="Arena y Grava">Arena y Grava</option>
                </select>
                {errors.tipo_material && <ErrorMessage>{errors.tipo_material.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>

          <FormDivisor>
            {/* Subtitulo */}
            <div className="flex-1/2">
              <FormSubtitle>Información del Tiempo</FormSubtitle>
            </div>

            {/* Contenido */}
            <div className="flex-1/2 space-y-2">
              {/* Fecha */}
              <FormGroup>
                <label htmlFor="fecha">Fecha</label>
                <input
                  type="date"
                  id="fecha"
                  className="border border-slate-200 rounded-lg p-2 w-full"
                  {...register("fecha", { required: "La fecha es obligatoria" })}
                />
                {errors.fecha && <ErrorMessage>{errors.fecha.message}</ErrorMessage>}
              </FormGroup>

              {/* Hora */}
              <FormGroup>
                <label htmlFor="hora">Hora</label>
                <input
                  type="time"
                  id="hora"
                  className="border border-slate-200 rounded-lg p-2 w-full"
                  {...register("hora", { required: "La hora es obligatoria" })}
                />
                {errors.hora && <ErrorMessage>{errors.hora.message}</ErrorMessage>}
              </FormGroup>

              {/* Turno */}
              <FormGroup>
                <label htmlFor="turno">Turno</label>
                <select
                  id="turno"
                  className="border border-slate-200 rounded-lg p-2 w-full"
                  {...register("turno", { required: "El turno es obligatorio" })}
                >
                  <option value="">Seleccionar turno</option>
                  <option value="Mañana">Mañana</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noche">Noche</option>
                </select>
                {errors.turno && <ErrorMessage>{errors.turno.message}</ErrorMessage>}
              </FormGroup>

              {/* Clima */}
              <FormGroup>
                <label htmlFor="clima">Clima</label>
                <select name="clima" id="clima"
                  className="border border-slate-200 rounded-lg p-2 w-full"
                  {...register("clima", { required: "El clima es obligatorio" })}>
                  <option value="">Seleccionar clima</option>
                  <option value="Soleado">Soleado</option>
                  <option value="Nublado">Nublado</option>
                  <option value="Lluvioso">Lluvioso</option>
                  <option value="Ventoso">Ventoso</option>
                </select>
                {errors.clima && <ErrorMessage>{errors.clima.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>

          {/* Extra */}
          <FormDivisor>
            {/* Subtitulo */}
            <div className="flex-1/2">
              <FormSubtitle>Información Extra</FormSubtitle>
            </div>

            {/* Contenido */}
            <div className="flex-1/2 space-y-2">
              {/* Observaciones */}
              <FormGroup>
                <label htmlFor="observaciones">Observaciones</label>
                <textarea
                  id="observaciones"
                  className="border border-slate-200 rounded-lg p-2 w-full"
                  {...register("observaciones")}
                />
              </FormGroup>


              {/* Imagen */}
              <FormGroup>
                <label htmlFor="imagenurl" className="block text-sm font-medium text-slate-700 mb-3">
                  Imagen del avance
                </label>

                <div className="space-y-4">
                  {/* Área de drop personalizada */}
                  <div className="relative">
                    <input
                      type="file"
                      id="imagenurl"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />

                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 bg-slate-50/50 group">
                      <div className="flex flex-col items-center gap-4">
                        {/* Icono principal */}
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>

                        {/* Texto principal */}
                        <div className="space-y-2">
                          <p className="text-base font-medium text-slate-700 group-hover:text-blue-700 transition-colors">
                            Haz clic para subir una imagen
                          </p>
                          <p className="text-sm text-slate-500">
                            o arrastra y suelta aquí
                          </p>
                        </div>

                        {/* Formatos aceptados */}
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="px-2 py-1 bg-white rounded-full border border-slate-200">PNG</span>
                          <span className="px-2 py-1 bg-white rounded-full border border-slate-200">JPG</span>
                          <span className="px-2 py-1 bg-white rounded-full border border-slate-200">JPEG</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vista previa mejorada */}
                  {imagePreview && (
                    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-slate-700">Imagen cargada</span>
                        </div>

                        {/* Botón para cambiar imagen */}
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                        >
                          Cambiar imagen
                        </button>
                      </div>

                      {/* Imagen de vista previa */}
                      <div className="relative overflow-hidden rounded-lg border-2 border-slate-100 bg-slate-50">
                        <img
                          src={imagePreview}
                          alt="Vista previa"
                          className="w-full h-48 object-cover"
                        />

                        {/* Overlay con información */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                          <p className="text-white text-sm font-medium">Vista previa de la imagen</p>
                        </div>

                        {/* Botón para eliminar */}
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                          }}
                          className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                          title="Eliminar imagen"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
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
              disabled={!isDirty || isPending || loadingCamiones || isUploading}
              className={`py-3 px-6 rounded-lg ${!isDirty ? 'bg-blue-300' : 'bg-blue-500'} text-white`}
            >
              <span className="flex items-center gap-2">
                {isUploading ? <Upload className="animate-pulse" /> : <Save />}
                {isPending || loadingCamiones || isUploading ? "Guardando..." : "Guardar"}
              </span>
            </button>
          </div>
        </form>
      </Modal>
    </ModalContainer>
  );
};

export default EditarAvancePanel;
