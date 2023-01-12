import type {ChangeEvent, DragEvent} from 'react'
import {useState, useRef, useCallback, useMemo} from 'react'
import {useToggle} from '../hooks'
import {Title, Div} from '../components'
import {imageFileReaderP} from '../utils'

export default function FileDrop() {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [loading, toggleLoading] = useToggle(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const onDivClick = useCallback(() => inputRef.current?.click(), [])

  const makeImageUrls = useCallback(
    (files: File[]) => {
      const promises = Array.from(files).map(imageFileReaderP)
      toggleLoading()
      Promise.all(promises)
        .then(urls => setImageUrls(imageUrls => [...urls, ...imageUrls]))
        .catch(setError)
        .finally(toggleLoading)
    },
    [toggleLoading]
  )

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setError(null)
      const files = e.target.files
      files && makeImageUrls(Array.from(files))
    },
    [makeImageUrls]
  )

  const onDivDragOver = useCallback((e: DragEvent) => e.preventDefault(), [])
  const onDivDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault()
      setError(null)
      const files = e.dataTransfer?.files
      files && makeImageUrls(Array.from(files))
    },
    [makeImageUrls]
  )

  // prettier-ignore
  const images = useMemo( () =>
      imageUrls.map((url, index) => (
        <Div key={index} src={url}
          className="m-2 bg-transparent bg-center bg-no-repeat bg-contain"
          width="5rem" height="5rem" />
      )), [imageUrls])

  // prettier-ignore
  return (
    <section className="mt-4">
      <Title>FileDrop</Title>
      {error && (
        <div className="p-4 mt-4 bg-red-200">
          <p className="text-3xl text-red-500 text-bold">{error.message}</p>
        </div>
      )}

      <div onClick={onDivClick} 
        className="w-full mt-4 bg-gray-200 border border-gray-500">
        {loading && (
          <div className="flex items-center justify-center">
            <button className="btn btn-circle loading"></button>
          </div>
        )}

        <div onDragOver={onDivDragOver} onDrop={onDivDrop}
          className="flex flex-col items-center justify-center h-40 cursor-pointer">
          <p className="text-3xl font-bold">drop images or click me</p>
        </div>
        <input ref={inputRef} onChange={onInputChange}
          multiple className="hidden" type="file" accept="image/*"/>
      </div>

      <div className="flex flex-wrap justify-center">{images}</div>
    </section>
  )
}
