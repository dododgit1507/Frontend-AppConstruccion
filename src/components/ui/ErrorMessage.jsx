import { OctagonAlert } from "lucide-react"

const ErrorMessage = ({ children }) => {
  return (
    <div className="flex items-center gap-2 justify-center text-red-500 text-sm text-center"> <OctagonAlert className="w-5 h-5" /> {children}</div>
  )
}

export default ErrorMessage