import Separador from "./Separador"

const FormDivisor = ({ children }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between">
        {children}
      </div>
      <Separador />
    </>
  )
}

export default FormDivisor