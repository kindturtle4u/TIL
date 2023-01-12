import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import {Modal, ModalContent, ModalAction} from '../../theme/daisyui'
import {useToggle} from '../../hooks'
import {useAuth} from '../../contexts'

export default function Logout() {
  const [open, toggleOpen] = useToggle(true)

  const navigate = useNavigate()
  const {logout} = useAuth()
  const onAccept = useCallback(() => {
    logout(() => {
      toggleOpen() // 대화상자를 닫습니다
      navigate('/') // 홈 페이지로 이동합니다
    })
  }, [navigate, toggleOpen, logout])
  const onCancel = useCallback(() => {
    toggleOpen() // 대화상자를 닫습니다
    navigate(-1) // 이전 페이지로 돌아갑니다
  }, [navigate, toggleOpen])

  return (
    <Modal open={open}>
      <ModalContent
        closeIconClassName="btn-primary btn-outline"
        onCloseIconClicked={onCancel}>
        <p className="text-xl text-center">Are you sure you want to log out?</p>
        <ModalAction>
          <button className="btn btn-primary btn-sm" onClick={onAccept}>
            Logout
          </button>
          <button className="btn btn-secondary btn-sm" onClick={onCancel}>
            Cancel
          </button>
        </ModalAction>
      </ModalContent>
    </Modal>
  )
}
