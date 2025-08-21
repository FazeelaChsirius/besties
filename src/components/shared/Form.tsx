import { FC, FormEvent, ReactNode } from "react"

interface FormInterface {
    children: ReactNode
    className: string
    onValue: (value: DataType)=>void
}

type DataType = Record<string, string>

const Form: FC<FormInterface> = ({children, className, onValue}) => {
    const handleForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)
        const data: DataType = {}
        formData.forEach((value, name) => {
            data[name] = value.toString()
        })
        onValue(data)
    }

    return (
        <form className={className} onSubmit={handleForm}>
            {children}
        </form>
    )
}

export default Form