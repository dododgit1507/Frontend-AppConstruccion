import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { X, Save, Users } from "lucide-react";
import { useState, useEffect } from "react";

// Componentes de UI
import ModalContainer from "@/components/ui/ModalContainer";
import Modal from "@/components/ui/Modal";
import Separador from "@/components/ui/Separador";
import FormTitle from "@/components/ui/FormTitle";
import FormSubtitle from "@/components/ui/FormSubtitle";
import FormDivisor from "@/components/ui/FormDivisor";
import FormGroup from "@/components/ui/FormGroup";
import ErrorMessage from "@/components/ui/ErrorMessage";

// Servicios
import proyectoService from "@/services/proyectoService";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/api";

const RegistrarProyecto = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm();
  const { usuario } = useAuth();
  
  // Estados para usuarios disponibles
  const [usuarios, setUsuarios] = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(false);

  // Usar el hook de mutación de React Query
  const createProyectoMutation = proyectoService.useProyectoCreateMutation();

  // Cargar usuarios disponibles para asignación
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoadingUsuarios(true);
        const response = await api.get("/usuario");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
        toast.error("Error al cargar la lista de usuarios");
      } finally {
        setLoadingUsuarios(false);
      }
    };

    // Solo cargar usuarios si es administrador
    if (usuario?.rol === 'administrador') {
      fetchUsuarios();
    }
  }, [usuario]);

  const onSubmit = async (data) => {
    try {
      // Si no se selecciona usuario responsable, asignar al usuario actual
      const proyectoData = {
        ...data,
        id_usuario_responsable: data.id_usuario_responsable || undefined
      };

      await createProyectoMutation.mutateAsync(proyectoData);
      toast.success("Proyecto creado exitosamente");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el proyecto: " + (error.message || 'Error desconocido'));
    }
  }

  return (
    <ModalContainer>
      <Modal>
        <FormTitle>Registrar Proyecto <X onClick={onClose} className="cursor-pointer" /></FormTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Separador />
          
          {/* Información General */}
          <FormDivisor>
            <div className="flex-1/2">
              <FormSubtitle>Información General</FormSubtitle>
            </div>
            <div className="flex-1/2 space-y-2">
              <FormGroup>
                <label htmlFor="nombre">Nombre</label>
                <input 
                  className="border border-slate-200 rounded-lg p-2" 
                  type="text" 
                  id="nombre" 
                  {...register("nombre", { required: "El nombre es obligatorio" })} 
                />
                {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="razon_social">Razón Social</label>
                <input 
                  className="border border-slate-200 rounded-lg p-2" 
                  type="text" 
                  id="razon_social" 
                  {...register("razon_social", { required: "La razón social es obligatoria" })} 
                />
                {errors.razon_social && <ErrorMessage>{errors.razon_social.message}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="direccion">Dirección</label>
                <input 
                  className="border border-slate-200 rounded-lg p-2" 
                  type="text" 
                  id="direccion" 
                  {...register("direccion", { required: "La dirección es obligatoria" })} 
                />
                {errors.direccion && <ErrorMessage>{errors.direccion.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>

          {/* Asignación de Usuario - Solo para administradores */}
          {usuario?.rol === 'administrador' && (
            <FormDivisor>
              <div className="flex-1/2">
                <FormSubtitle>
                  <Users className="inline mr-2" size={18} />
                  Asignación de Usuario
                </FormSubtitle>
              </div>
              <div className="flex-1/2 space-y-2">
                <FormGroup>
                  <label htmlFor="id_usuario_responsable">Usuario Responsable</label>
                  <select 
                    className="border border-slate-200 rounded-lg p-2" 
                    id="id_usuario_responsable" 
                    {...register("id_usuario_responsable")}
                    disabled={loadingUsuarios}
                  >
                    <option value="">Seleccionar usuario (opcional)</option>
                    {usuarios.map((user) => (
                      <option key={user.id_usuario} value={user.id_usuario}>
                        {user.nombre} - {user.rol} ({user.correo})
                      </option>
                    ))}
                  </select>
                  {loadingUsuarios && (
                    <p className="text-sm text-slate-500">Cargando usuarios...</p>
                  )}
                  <p className="text-xs text-slate-600">
                    Si no seleccionas un usuario, el proyecto se asignará automáticamente a ti.
                  </p>
                </FormGroup>
              </div>
            </FormDivisor>
          )}

          {/* Estado del Proyecto */}
          <FormDivisor>
            <div className="flex-1/2">
              <FormSubtitle>Estado del Proyecto</FormSubtitle>
            </div>
            <div className="flex-1/2 space-y-2">
              <FormGroup>
                <label htmlFor="estado">Estado</label>
                <select 
                  className="border border-slate-200 rounded-lg p-2" 
                  name="estado" 
                  id="estado" 
                  {...register("estado", { required: "El estado es obligatorio" })}
                >
                  <option value="">Seleccione un estado</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="iniciada">Iniciada</option>
                  <option value="finalizada">Finalizada</option>
                </select>
                {errors.estado && <ErrorMessage>{errors.estado.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>

          {/* Metrado del Proyecto */}
          <FormDivisor>
            <div className="flex-1/2">
              <FormSubtitle>Metrado del Proyecto</FormSubtitle>
            </div>
            <div className="flex-1/2 space-y-2">
              <FormGroup>
                <label htmlFor="profundidad">Profundidad (m)</label>
                <input 
                  className="border border-slate-200 rounded-lg p-2" 
                  type="number" 
                  step="0.01"
                  id="profundidad" 
                  {...register("profundidad", { 
                    required: "La profundidad es obligatoria",
                    min: { value: 0.01, message: "La profundidad debe ser mayor a 0" }
                  })} 
                />
                {errors.profundidad && <ErrorMessage>{errors.profundidad.message}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="area">Área (m²)</label>
                <input 
                  className="border border-slate-200 rounded-lg p-2" 
                  type="number" 
                  step="0.01"
                  id="area" 
                  {...register("area", { 
                    required: "El área es obligatoria",
                    min: { value: 0.01, message: "El área debe ser mayor a 0" }
                  })} 
                />
                {errors.area && <ErrorMessage>{errors.area.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>

          {/* Responsables */}
          <FormDivisor>
            <div className="flex-1/2">
              <FormSubtitle>Responsables del Proyecto</FormSubtitle>
            </div>
            <div className="flex-1/2 space-y-2">
              <FormGroup>
                <label htmlFor="responsable">Responsable</label>
                <input 
                  className="border border-slate-200 rounded-lg p-2" 
                  type="text" 
                  id="responsable" 
                  {...register("responsable", { required: "El responsable es obligatorio" })} 
                  placeholder="Nombre del responsable del proyecto"
                />
                {errors.responsable && <ErrorMessage>{errors.responsable.message}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <label htmlFor="residente">Residente</label>
                <input 
                  className="border border-slate-200 rounded-lg p-2" 
                  type="text" 
                  id="residente" 
                  {...register("residente", { required: "El residente es obligatorio" })} 
                  placeholder="Nombre del residente de obra"
                />
                {errors.residente && <ErrorMessage>{errors.residente.message}</ErrorMessage>}
              </FormGroup>
            </div>
          </FormDivisor>

          {/* Botones */}
          <div className="flex flex-row justify-end gap-4 pt-4">
            <button 
              type="button" 
              className="bg-slate-100 text-slate-500 py-3 px-6 rounded-lg hover:bg-slate-200 transition-colors"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting || loadingUsuarios} 
              className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center gap-2">
                <Save size={18} />
                {isSubmitting ? "Registrando..." : "Registrar Proyecto"}
              </span>
            </button>
          </div>
        </form>
      </Modal>
    </ModalContainer>
  )
}

export default RegistrarProyecto;