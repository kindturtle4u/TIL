import type {FC, PropsWithChildren} from 'react'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../contexts'

type RequireAuthProps = {}

const RequireAuth: FC<PropsWithChildren<RequireAuthProps>> = ({children}) => {
  const {loggedUser} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loggedUser) navigate(-1) // 허가되지 않은 사용자이므로 앞 페이지로 돌아가게 함
  }, [loggedUser, navigate])

  return <>{children}</> // 허가된 사용자 이므로 children이 element 가 되도록 함
}
export default RequireAuth
