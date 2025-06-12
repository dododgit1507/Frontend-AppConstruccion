// Componente que envuelve un modal
const ModalContainer = ({ children }) => {

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg`}
    >
      {children}
    </div>
  )
}

export default ModalContainer
