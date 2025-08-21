import { FC } from 'react'
import 'remixicon/fonts/remixicon.css'

const IconButtonModel = {
    primary: "bg-blue-50 text-blue-500 hover:bg-blue-400 hover:text-white rounded font-medium w-8 h-8 flex items-center justify-center",
    secondary: "bg-indigo-50 text-indigo-500 hover:bg-indigo-400 hover:text-white rounded font-medium w-8 h-8 flex items-center justify-center",
    danger: "bg-rose-50 text-rose-500 hover:bg-rose-400 hover:text-white rounded font-medium w-8 h-8 flex items-center justify-center",
    warning: "bg-amber-50 text-amber-500 hover:bg-amber-400 hover:text-white rounded font-medium w-8 h-8 flex items-center justify-center",
    dark: "bg-zinc-50 text-zinc-500 hover:bg-zinc-500 hover:bg-zinc-400 hover:text-white rounded font-medium w-8 h-8 flex items-center justify-center",
    success: "bg-green-50 text-green-500 hover:bg-green-400 hover:text-white rounded font-medium w-8 h-8 flex items-center justify-center",
    info: "bg-cyan-50 text-cyan-500 hover:bg-cyan-400 hover:text-white rounded font-medium w-8 h-8 flex items-center justify-center"
}

interface IconButtonInterface {
    type?: "primary" | "secondary" | "danger" | "warning" | "dark" | "success" | "info"
    onClick?: ()=>void
    icon: string
    key?: string | number
}

const IconButton: FC<IconButtonInterface> = ({ type="primary", onClick, icon})=>{
    return (
        <button className={IconButtonModel[type]} onClick={onClick}>
            <i className={`ri-${icon} text-base`}></i>
        </button>
    )
}

export default IconButton