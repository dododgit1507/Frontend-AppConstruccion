import { useForm } from "react-hook-form";
import { useState, useRef } from 'react';
import { X, Save, Upload, Activity, Clock, Camera, FileText } from 'lucide-react';
import { toast } from 'sonner';
import avance_panelService from '@/services/excavacion/avance_panelService';
import camionService from '@/services/camionService';
import cloudinaryService from '@/services/cloudinaryService';
// Componentes de UI
import ModalContainer from "@/components/ui/ModalContainer";
import Modal from "@/components/ui/Modal";
import FormSubtitle from "@/components/ui/FormSubtitle";
import ErrorMessage from "@/components/ui/ErrorMessage";
import FormGroup from "@/components/ui/FormGroup";

const RegistrarAvancePanel = ({ panelId, onClose, onSuccess }) => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      fecha: new Date().toISOString().split('T')[0],
      hora: new Date().toLocaleTimeString('en-GB', { hour12: false }).slice(0, 5),
      fase: '',
      responsable: '',
      descripcion: '',
      estado_fase: 'Completado', // Agregar valor por defecto
    }
  });

  const [serverError, setServerError] = useState('');
  
  // Observar la fase seleccionada para mostrar campos específicos
  const faseSeleccionada = watch('fase');

  // Obtener camiones usando React Query (solo si es excavación)
  const { data: camiones = [], isLoading: loadingCamiones } = camionService.useGetCamiones();

  // Mutación con React Query (si está disponible)
  const { mutate, isPending } = avance_panelService.useCreateAvance ?
    avance_panelService.useCreateAvance() :
    { mutate: null, isPending: false };

  // Referencia al input de archivo
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Configuración de fases
  const fasesConfig = {
    'Marcado': { descripcion: 'Marcado y señalización del área de trabajo' },
    'Excavación': { descripcion: 'Excavación y remoción de material' },
    'Proyección': { descripcion: 'Proyección de materiales' },
    'Armadura': { descripcion: 'Colocación y amarre de armadura' },
    'Encofrado': { descripcion: 'Instalación de encofrado' },
    'Vaciado de Concreto': { descripcion: 'Vaciado y nivelación de concreto' },
    'Desencofrado': { descripcion: 'Retiro de encofrado' },
    'Tensado': { descripcion: 'Tensado de cables y elementos' },
    'Revisión': { descripcion: 'Inspección y control de calidad' }
  };

  // Manejar cambio de archivo
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Manejar envío del formulario
  const onSubmit = async (data) => {
    setServerError('');
    setIsUploading(true);

    try {
      let imageUrl = null;
      const imageFile = fileInputRef.current?.files[0];

      if (imageFile) {
        try {
          const uploadResult = await cloudinaryService.uploadImage(imageFile);
          imageUrl = uploadResult.secure_url;
          toast.success('Imagen subida correctamente');
        } catch (error) {
          console.error('Error al subir la imagen:', error);
          toast.error('Error al subir la imagen, pero continuaremos con el registro');
        }
      }

      // Preparar datos para enviar (asegurar que coincidan con la BD)
      const avanceData = {
        // Campos principales
        id_panel: panelId,
        fase: data.fase,
        responsable: data.responsable,
        descripcion: data.descripcion,
        
        // Información temporal
        fecha: data.fecha,
        hora: data.hora,
        turno: data.turno || null,
        clima: data.clima || null,
        
        // Estado
        estado_fase: data.estado_fase || 'Completado',
        
        // Campos específicos para Excavación
        ...(data.fase === 'Excavación' && {
          volumen_removido: data.volumen_removido ? parseFloat(data.volumen_removido) : null,
          tipo_material: data.tipo_material || null,
          id_camion: data.id_camion || null,
        }),
        
        // Campos específicos para otras fases
        ...(data.fase !== 'Excavación' && {
          area_trabajada: data.area_trabajada ? parseFloat(data.area_trabajada) : null,
          materiales_utilizados: data.materiales_utilizados || null,
          equipos_utilizados: data.equipos_utilizados || null,
        }),
        
        // Documentación
        observaciones: data.observaciones || null,
        imagenurl: imageUrl,
        
        // Timestamps (se manejan automáticamente en el backend)
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      console.log('Datos a enviar:', avanceData); // Para debugging

      if (mutate) {
        mutate(avanceData, {
          onSuccess: () => {
            toast.success('Avance registrado correctamente');
            onClose();
            if (onSuccess) onSuccess();
          },
          onError: (error) => {
            console.error('Error al registrar avance:', error);
            setServerError(error.response?.data?.error || error.message || 'Error al registrar el avance');
          },
          onSettled: () => {
            setIsUploading(false);
          }
        });
      } else {
        const result = await avance_panelService.create(avanceData);
        console.log('Resultado del backend:', result); // Para debugging
        toast.success('Avance registrado correctamente');
        onClose();
        if (onSuccess) onSuccess();
        setIsUploading(false);
      }
    } catch (error) {
      console.error('Error al registrar avance:', error);
      if (error.response?.data?.error) {
        setServerError(error.response.data.error);
      } else if (error.response?.data?.message) {
        setServerError(error.response.data.message);
      } else {
        setServerError(error.message || 'Error al registrar el avance');
        toast.error('Error al registrar el avance');
      }
      setIsUploading(false);
    }
  };

  return (
    <ModalContainer>
      <Modal>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 border border-gray-200 rounded-lg">
                <Activity className="text-gray-600" size={20} />
              </div>
              <span className="text-xl font-semibold text-gray-800">Registrar Avance de Panel</span>
            </div>
            <X onClick={onClose} className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors" size={24} />
          </div>

          {/* Mensaje de error del servidor */}
          {serverError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Información del Avance */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <Activity className="text-gray-500" size={18} />
                <FormSubtitle className="text-gray-700 font-medium">Información del Avance</FormSubtitle>
              </div>

              <FormGroup>
                <label htmlFor="fase" className="block text-sm font-medium text-gray-700 mb-1">
                  Fase del Proyecto *
                </label>
                <select
                  id="fase"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  {...register("fase", { required: "Debe seleccionar una fase" })}
                >
                  <option value="">Seleccionar fase del proyecto</option>
                  {Object.entries(fasesConfig).map(([fase, config]) => (
                    <option key={fase} value={fase}>
                      {fase}
                    </option>
                  ))}
                </select>
                {errors.fase && <ErrorMessage>{errors.fase.message}</ErrorMessage>}
                
                {/* Descripción de la fase seleccionada */}
                {faseSeleccionada && (
                  <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-md">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-700">Descripción:</span> {fasesConfig[faseSeleccionada]?.descripcion}
                    </p>
                  </div>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="responsable" className="block text-sm font-medium text-gray-700 mb-1">
                  Responsable/Ingeniero *
                </label>
                <input
                  type="text"
                  id="responsable"
                  placeholder="Nombre del responsable o ingeniero"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  {...register("responsable", { 
                    required: "El responsable es obligatorio",
                    minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" }
                  })}
                />
                {errors.responsable && <ErrorMessage>{errors.responsable.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción del Trabajo Realizado *
                </label>
                <textarea
                  id="descripcion"
                  rows={4}
                  placeholder="Describe detalladamente el trabajo realizado en esta fase..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  {...register("descripcion", { 
                    required: "La descripción del trabajo es obligatoria",
                    minLength: { value: 10, message: "La descripción debe tener al menos 10 caracteres" }
                  })}
                />
                {errors.descripcion && <ErrorMessage>{errors.descripcion.message}</ErrorMessage>}
              </FormGroup>
            </div>

            {/* Campos específicos por fase */}
            {faseSeleccionada && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                  <FileText className="text-gray-500" size={18} />
                  <FormSubtitle className="text-gray-700 font-medium">Información Específica - {faseSeleccionada}</FormSubtitle>
                </div>

                {/* Campos específicos para Excavación */}
                {faseSeleccionada === 'Excavación' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormGroup>
                      <label htmlFor="volumen_removido" className="block text-sm font-medium text-gray-700 mb-1">
                        Volumen Excavado (m³)
                      </label>
                      <input
                        type="number"
                        id="volumen_removido"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        {...register("volumen_removido", {
                          min: { value: 0, message: "El volumen debe ser mayor o igual a 0" }
                        })}
                      />
                      {errors.volumen_removido && <ErrorMessage>{errors.volumen_removido.message}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                      <label htmlFor="tipo_material" className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo de Material Excavado
                      </label>
                      <select
                        id="tipo_material"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        {...register("tipo_material")}
                      >
                        <option value="">Seleccionar tipo de material</option>
                        <option value="Arena">Arena</option>
                        <option value="Grava">Grava</option>
                        <option value="Arena y Grava">Arena y Grava</option>
                        <option value="Roca">Roca</option>
                        <option value="Tierra">Tierra</option>
                      </select>
                    </FormGroup>

                    <div className="md:col-span-2">
                      <FormGroup>
                        <label htmlFor="id_camion" className="block text-sm font-medium text-gray-700 mb-1">
                          Camión Utilizado
                        </label>
                        <select
                          id="id_camion"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          disabled={loadingCamiones}
                          {...register("id_camion")}
                        >
                          <option value="">Seleccionar camión (opcional)</option>
                          {camiones.map(camion => (
                            <option key={camion.id_camion} value={camion.id_camion}>
                              {camion.placa} - Capacidad: {camion.capacidad_carga} m³
                            </option>
                          ))}
                        </select>
                      </FormGroup>
                    </div>
                  </div>
                )}

                {/* Campos para otras fases */}
                {faseSeleccionada !== 'Excavación' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormGroup>
                      <label htmlFor="area_trabajada" className="block text-sm font-medium text-gray-700 mb-1">
                        Área Trabajada (m²)
                      </label>
                      <input
                        type="number"
                        id="area_trabajada"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        {...register("area_trabajada")}
                      />
                    </FormGroup>

                    <FormGroup>
                      <label htmlFor="materiales_utilizados" className="block text-sm font-medium text-gray-700 mb-1">
                        Materiales Utilizados
                      </label>
                      <input
                        type="text"
                        id="materiales_utilizados"
                        placeholder="Ej: Concreto f'c=210, Acero corrugado, etc."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        {...register("materiales_utilizados")}
                      />
                    </FormGroup>

                    <div className="md:col-span-2">
                      <FormGroup>
                        <label htmlFor="equipos_utilizados" className="block text-sm font-medium text-gray-700 mb-1">
                          Equipos Utilizados
                        </label>
                        <input
                          type="text"
                          id="equipos_utilizados"
                          placeholder="Ej: Vibrador, Mezcladora, Grúa, etc."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          {...register("equipos_utilizados")}
                        />
                      </FormGroup>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Información del Tiempo */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <Clock className="text-gray-500" size={18} />
                <FormSubtitle className="text-gray-700 font-medium">Información del Tiempo</FormSubtitle>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormGroup>
                  <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha *
                  </label>
                  <input
                    type="date"
                    id="fecha"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register("fecha", { required: "La fecha es obligatoria" })}
                  />
                  {errors.fecha && <ErrorMessage>{errors.fecha.message}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <label htmlFor="hora" className="block text-sm font-medium text-gray-700 mb-1">
                    Hora *
                  </label>
                  <input
                    type="time"
                    id="hora"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register("hora", { required: "La hora es obligatoria" })}
                  />
                  {errors.hora && <ErrorMessage>{errors.hora.message}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <label htmlFor="turno" className="block text-sm font-medium text-gray-700 mb-1">
                    Turno
                  </label>
                  <select
                    id="turno"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register("turno")}
                  >
                    <option value="">Seleccionar turno</option>
                    <option value="Mañana">Mañana</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noche">Noche</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label htmlFor="clima" className="block text-sm font-medium text-gray-700 mb-1">
                    Condiciones Climáticas
                  </label>
                  <select 
                    id="clima"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register("clima")}
                  >
                    <option value="">Seleccionar condiciones</option>
                    <option value="Soleado">Soleado</option>
                    <option value="Nublado">Nublado</option>
                    <option value="Lluvioso">Lluvioso</option>
                    <option value="Ventoso">Ventoso</option>
                  </select>
                </FormGroup>
              </div>
            </div>

            {/* Documentación */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <Camera className="text-gray-500" size={18} />
                <FormSubtitle className="text-gray-700 font-medium">Documentación</FormSubtitle>
              </div>

              <FormGroup>
                <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700 mb-1">
                  Observaciones Adicionales
                </label>
                <textarea
                  id="observaciones"
                  rows={3}
                  placeholder="Observaciones, problemas encontrados, recomendaciones..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  {...register("observaciones")}
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="imagenurl" className="block text-sm font-medium text-gray-700 mb-3">
                  Foto de Evidencia
                </label>

                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="file"
                      id="imagenurl"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />

                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                          <Camera className="w-6 h-6 text-gray-500" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-700">
                            Subir foto de evidencia
                          </p>
                          <p className="text-xs text-gray-500">
                            Arrastra una imagen aquí o haz clic para seleccionar
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="px-2 py-1 bg-gray-100 rounded border">PNG</span>
                          <span className="px-2 py-1 bg-gray-100 rounded border">JPG</span>
                          <span className="px-2 py-1 bg-gray-100 rounded border">JPEG</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {imagePreview && (
                    <div className="bg-white rounded-md border border-gray-200 p-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-gray-700">Foto cargada</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                        >
                          Cambiar foto
                        </button>
                      </div>

                      <div className="relative overflow-hidden rounded border border-gray-200">
                        <img
                          src={imagePreview}
                          alt="Vista previa"
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                          <p className="text-white text-xs font-medium">Evidencia del avance - {faseSeleccionada || 'Sin fase'}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                          }}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                          title="Eliminar imagen"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </FormGroup>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 transition-colors"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isPending || loadingCamiones || isUploading || !faseSeleccionada}
                className={`flex-1 bg-blue-600 text-white py-2 px-4 rounded-md font-medium transition-colors ${
                  isSubmitting || isPending || loadingCamiones || isUploading || !faseSeleccionada
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {isUploading ? <Upload className="animate-pulse" size={16} /> : <Save size={16} />}
                  {isSubmitting || isPending || isUploading ? "Registrando..." : "Registrar Avance"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </ModalContainer>
  );
};

export default RegistrarAvancePanel;