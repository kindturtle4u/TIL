import type {FC, ReactNode} from "react";

export type PProps = {
    children?: ReactNode
}

const P: FC<PProps> = props => {
    const {children}  = props;
    return <p children={children} />
}

export default P;
