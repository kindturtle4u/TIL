import {useRef, useEffect} from 'react'
import {Title} from '../components'

export default function InputFocusTest() {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => inputRef.current?.focus(), [])
  // prettier-ignore
  return (
    <section className="mt-4">
      <Title>InputFocusTest</Title>
      <div className="flex justify-center mt-4 ">
        <input ref={inputRef} className="input input-primary"
          placeholder="enter some text"/>
      </div>
    </section>
  )
}
