
const Modal = ({ children }) => {
  return (
    <div className="flex flex-col gap-4 p-8 w-[700px] h-auto max-h-[800px] overflow-y-auto border bg-slate-50 border-slate-200 rounded-lg">
      {children}
    </div>
  )
}

export default Modal;