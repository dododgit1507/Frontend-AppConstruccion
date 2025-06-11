// Componente que envuelve un modal
import { useEffect, useState } from 'react';

const ModalContainer = ({ children }) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay con blur y opacidad animada */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 backdrop-blur-sm bg-opacity-50`}
      />
      {/* Contenido del modal con animación de entrada */}
      <div 
        className={`z-10 transition-all duration-300 transform opacity-100 scale-100`}
      >
        {children}
      </div>
    </div>
  )
}

export default ModalContainer
