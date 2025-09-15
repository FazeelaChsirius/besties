import { FC } from 'react'
import 'remixicon/fonts/remixicon.css'

const ButtonModel = {
    primary: "bg-blue-400 hover:bg-blue-500 rounded font-medium text-white px-6 py-2 cursor-pointer",
    secondary: "bg-indigo-400 hover:bg-indigo-500 rounded font-medium text-white px-6 py-2 cursor-pointer",
    danger: "bg-rose-400 hover:bg-rose-500 rounded font-medium text-white px-6 py-2 cursor-pointer",
    warning: "bg-amber-400 hover:bg-amber-500 rounded font-medium text-white px-6 py-2 cursor-pointer",
    dark: "bg-zinc-400 hover:bg-zinc-500 rounded font-medium text-white px-6 py-2 cursor-pointer",
    success: "bg-green-400 hover:bg-green-500 rounded font-medium text-white px-6 py-2 cursor-pointer",
    info: "bg-cyan-400 hover:bg-cyan-500 rounded font-medium text-white px-6 py-2 cursor-pointer"
}

interface ButtonInterface {
    children?: string
    type?: "primary" | "secondary" | "danger" | "warning" | "dark" | "success" | "info"
    onClick?: ()=>void
    icon?: string
    key?: string | number
}

const Button: FC<ButtonInterface> = ({ children="Submit", type="primary", onClick, icon})=>{
    return (
        <button className={ButtonModel[type]} onClick={onClick}>
            {
                icon &&
                <i className={`ri-${icon} mr-1`}></i>
            }
            {children}
        </button>
    )
}

export default Button