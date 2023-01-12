import type {FC} from 'react'

export type ArrowComponentProps = {
  href: string
  text: string
}
const ArrowComponent: FC<ArrowComponentProps> = props => {
  const {href, text} = props
  return (
    <li>
      <a href={href}>
        <p>{text}</p>
      </a>
    </li>
  )
}
export default ArrowComponent
