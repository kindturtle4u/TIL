import {Title, Subtitle} from '../../components'
import {Modal, ModalContent, ModalAction, Button} from '../../theme/daisyui'
import * as D from '../../data'

export default function ModalTest() {
  const open = true // 혹은 false
  const closeClicked = () => alert('closeClicked')
  const acceptClicked = () => alert('acceptClicked')

  return (
    <section className="mt-4">
      <Title>ModalTest</Title>
      <Modal open={open}>
        <ModalContent onCloseIconClicked={closeClicked}>
          <Subtitle>Modal</Subtitle>
          <p className="mt-4 text-justify">{D.randomParagraphs()}</p>
          <ModalAction>
            <Button
              className="w-24 normal-case btn-primary btn-sm"
              onClick={acceptClicked}>
              Accept
            </Button>
            <Button className="w-24 normal-case btn-sm" onClick={closeClicked}>
              Close
            </Button>
          </ModalAction>
        </ModalContent>
      </Modal>
    </section>
  )
}
