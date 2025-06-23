/**
 * Servicio para manejar la carga de imágenes a Cloudinary
 */

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET; // Preset definido en Cloudinary
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; // Reemplazar con tu cloud name
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const cloudinaryService = {
  /**
   * Sube una imagen a Cloudinary
   * @param {File} file - Archivo de imagen a subir
   * @returns {Promise<Object>} - Respuesta de Cloudinary con la URL de la imagen
   */
  uploadImage: async (file) => {
    if (!file) return null;
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    
    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Error al subir la imagen');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al subir imagen a Cloudinary:', error);
      throw error;
    }
  }
};

export default cloudinaryService;
