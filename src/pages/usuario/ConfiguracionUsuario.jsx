import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, Building, Shield, Camera, Calendar, MapPin,
  Lock, Award, Edit3, Save, Eye, EyeOff, Key, Loader2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import api from '@/api/api';

const ConfiguracionUsuario = () => {
  const { usuario, Logout } = useAuth();
  
  // Estados para formulario de datos personales
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    direccion: '',
    fechaNacimiento: '',
    especialidad: '',
    avatar: null
  });

  // Estados para cambio de contraseña
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [activeTab, setActiveTab] = useState('perfil');
  const [isEditing, setIsEditing] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Cargar datos del usuario autenticado al montar el componente
  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre || '',
        email: usuario.email || '',
        telefono: usuario.telefono || '',
        empresa: usuario.empresa || '',
        direccion: usuario.direccion || '',
        fechaNacimiento: usuario.fechaNacimiento || '',
        especialidad: usuario.especialidad || '',
        avatar: null
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        toast.error('Por favor selecciona una imagen válida');
        return;
      }
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('La imagen no debe superar los 5MB');
        return;
      }
      setFormData(prev => ({
        ...prev,
        avatar: file
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingUpdate(true);
    
    try {
      // Crear FormData para enviar archivos
      const formDataToSend = new FormData();
      
      // Agregar todos los campos del formulario
      Object.keys(formData).forEach(key => {
        if (key === 'avatar' && formData[key]) {
          formDataToSend.append('avatar', formData[key]);
        } else if (key !== 'avatar') {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await api.put('/users/profile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Actualizar datos en localStorage y contexto
      const updatedUser = { ...usuario, ...response.data.usuario };
      localStorage.setItem('usuario', JSON.stringify(updatedUser));
      
      toast.success('Información actualizada correctamente');
      setIsEditing(false);
      
      // Opcional: Forzar recarga de la página para actualizar el contexto
      // window.location.reload();
      
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      toast.error(error.response?.data?.message || 'Error al actualizar la información');
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Todos los campos son obligatorios');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Las contraseñas nuevas no coinciden');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      toast.error('La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }

    setLoadingPassword(true);
    
    try {
      await api.put('/users/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      toast.success('Contraseña actualizada correctamente');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      toast.error(error.response?.data?.message || 'Error al cambiar la contraseña');
    } finally {
      setLoadingPassword(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const renderTabContent = () => {
    if (activeTab === 'perfil') {
      return (
        <div className="space-y-8">
          {/* Información del perfil */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Información Personal</h2>
                  <p className="text-slate-600 text-sm">Actualiza tu información básica y datos de contacto</p>
                </div>
                {isEditing ? (
                  <button 
                    onClick={() => setIsEditing(false)} 
                    className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors border border-blue-200"
                    disabled={loadingUpdate}
                  >
                    <Save size={16} />
                    Cancelar
                  </button>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)} 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Edit3 size={16} />
                    Editar
                  </button>
                )}
              </div>
            </div>

            <div className="p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Avatar y información básica */}
                <div className="lg:w-1/3 flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                      {formData.avatar ? (
                        <img src={URL.createObjectURL(formData.avatar)} alt="Avatar" className="w-full h-full object-cover" />
                      ) : usuario?.avatar ? (
                        <img src={usuario.avatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <User size={48} className="text-blue-500" />
                      )}
                    </div>
                    {isEditing && (
                      <label htmlFor="avatar" className="absolute -bottom-2 -right-2 bg-blue-500 p-3 rounded-full text-white cursor-pointer shadow-lg hover:bg-blue-600 transition-colors">
                        <Camera size={16} />
                        <input 
                          type="file" 
                          id="avatar" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{formData.nombre || 'Usuario'}</h3>
                  <p className="text-blue-600 font-medium mb-4">{usuario?.rol || 'Usuario'}</p>
                  
                  <div className="w-full space-y-3">
                    <div className="bg-slate-50 p-4 rounded-xl border">
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <Building size={16} />
                        <span className="text-sm font-medium">Empresa</span>
                      </div>
                      <p className="text-slate-800 font-medium">{formData.empresa || 'No especificada'}</p>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-xl border">
                      <div className="flex items-center gap-2 text-slate-600 mb-1">
                        <Calendar size={16} />
                        <span className="text-sm font-medium">Fecha de registro</span>
                      </div>
                      <p className="text-slate-800 font-medium">
                        {usuario?.fechaCreacion ? new Date(usuario.fechaCreacion).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'No disponible'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Formulario */}
                <div className="lg:w-2/3">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre completo</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className="text-slate-400" size={18} />
                          </div>
                          <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="block w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500 transition-colors"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Correo electrónico</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="text-slate-400" size={18} />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="block w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500 transition-colors"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Teléfono</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Phone className="text-slate-400" size={18} />
                          </div>
                          <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="block w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500 transition-colors"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Especialidad</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Award className="text-slate-400" size={18} />
                          </div>
                          <input
                            type="text"
                            name="especialidad"
                            value={formData.especialidad}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="block w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500 transition-colors"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Empresa</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Building className="text-slate-400" size={18} />
                          </div>
                          <input
                            type="text"
                            name="empresa"
                            value={formData.empresa}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="block w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500 transition-colors"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Fecha de nacimiento</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Calendar className="text-slate-400" size={18} />
                          </div>
                          <input
                            type="date"
                            name="fechaNacimiento"
                            value={formData.fechaNacimiento}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="block w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500 transition-colors"
                          />
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Dirección</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <MapPin className="text-slate-400" size={18} />
                          </div>
                          <input
                            type="text"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="block w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500 transition-colors"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Rol en el sistema</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Shield className="text-slate-400" size={18} />
                          </div>
                          <input
                            type="text"
                            value={usuario?.rol || 'Usuario'}
                            disabled
                            className="block w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl bg-slate-50 text-slate-500"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {isEditing && (
                      <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors font-medium"
                          disabled={loadingUpdate}
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50"
                          disabled={loadingUpdate}
                        >
                          {loadingUpdate ? (
                            <>
                              <Loader2 className="animate-spin" size={16} />
                              Guardando...
                            </>
                          ) : (
                            <>
                              <Save size={16} />
                              Guardar Cambios
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'seguridad') {
      return (
        <div className="space-y-8">
          {/* Cambio de contraseña */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 border-b border-red-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Lock className="text-red-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Seguridad de la Cuenta</h2>
                  <p className="text-slate-600 text-sm">Actualiza tu contraseña para mantener tu cuenta segura</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-md">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Contraseña actual</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Key className="text-slate-400" size={18} />
                    </div>
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="block w-full pl-12 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Introduce tu contraseña actual"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nueva contraseña</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="text-slate-400" size={18} />
                    </div>
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="block w-full pl-12 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Introduce tu nueva contraseña"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Confirmar nueva contraseña</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="text-slate-400" size={18} />
                    </div>
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="block w-full pl-12 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Confirma tu nueva contraseña"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <h4 className="text-sm font-semibold text-blue-800 mb-2">Requisitos de la contraseña:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Mínimo 8 caracteres</li>
                    <li>• Al menos una letra mayúscula</li>
                    <li>• Al menos un número</li>
                    <li>• Al menos un carácter especial</li>
                  </ul>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })}
                    className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors font-medium"
                    disabled={loadingPassword}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50"
                    disabled={loadingPassword}
                  >
                    {loadingPassword ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Cambiando...
                      </>
                    ) : (
                      <>
                        <Lock size={16} />
                        Cambiar Contraseña
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  };

  // Si no hay usuario autenticado
  if (!usuario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <User className="mx-auto mb-4 text-slate-400" size={48} />
          <h2 className="text-xl font-bold text-slate-800 mb-2">No hay sesión activa</h2>
          <p className="text-slate-600">Por favor, inicia sesión para acceder a tu configuración</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header moderno */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto py-8 px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Configuración</h1>
              <p className="text-slate-600 mt-1">Gestiona tu perfil y configuración de seguridad</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                {usuario?.avatar ? (
                  <img src={usuario.avatar} alt="Avatar" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <User size={24} className="text-blue-600" />
                )}
              </div>
              <div>
                <p className="font-semibold text-slate-800">{usuario.nombre}</p>
                <p className="text-sm text-slate-500">{usuario.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto py-8 px-6">
        {/* Navegación por pestañas mejorada */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-8 overflow-hidden">
          <div className="flex">
            <button 
              onClick={() => setActiveTab('perfil')}
              className={`flex-1 px-6 py-4 font-semibold text-sm transition-all ${
                activeTab === 'perfil' 
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              Mi Información
            </button>
            <button 
              onClick={() => setActiveTab('seguridad')}
              className={`flex-1 px-6 py-4 font-semibold text-sm transition-all ${
                activeTab === 'seguridad' 
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              Cambiar Contraseña
            </button>
          </div>
        </div>
        
        {/* Contenido de las pestañas */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ConfiguracionUsuario;