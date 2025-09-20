import { FC } from "react"

interface ErrorInterface {
  message: string
}

const Error: FC<ErrorInterface> = ({ message }) => {
  return (
    <div className="animate__animated animate__fadeIn flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 shadow-sm">
      <i className="ri-error-warning-line text-red-500 text-2xl"></i>
      <span className="text-red-700 font-medium">{message}</span>
    </div>
  )
}

export default Error
