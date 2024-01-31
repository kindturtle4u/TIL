import {Div, DivProps} from "./Div";
import {FC} from "react";

export type AvatarProps = DivProps & {
    size?: string
}

export const Avatar: FC<AvatarProps> = ({
                                            className: _className,
                                            style,
                                            src,
                                            size,
                                            ...props
                                        }) => {
    const w_or_h = size ?? '3rem'
    const className = ['rounded-full bg-cover bg-gray-300', _className].join(' ')
    return (
        <Div
            {...props}
            src={src}
            width={w_or_h}
            height={w_or_h}
            className={className}
            style={style}/>
    )
}
