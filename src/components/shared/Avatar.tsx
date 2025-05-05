import { FC } from "react"

interface AvatarInterface {
    title?: string
    subtitle?: string
    image?: string
    titleColor?: string
    subtitleColor?: string
}

const Avatar: FC<AvatarInterface> = ({title, subtitle='Subtitle missing', image, titleColor="#000000", subtitleColor="#f5f5f5" }) => {
    return (
        <div className="flex gap-3 items-center">
            {
                image &&
                <img 
                    src={image}
                    className="w-12 h-12 rounded-full object-cover"
                />
            }
            {
                (title && subtitle) &&
                <div className="flex flex-col">
                    <h1 className="text-lg/6 font-medium" style={{color: titleColor}}>{title}</h1>
                    <label className="text-sm" style={{color: subtitleColor}}>{subtitle}</label>
                </div>
            }
        </div>
    )
}

export default Avatar