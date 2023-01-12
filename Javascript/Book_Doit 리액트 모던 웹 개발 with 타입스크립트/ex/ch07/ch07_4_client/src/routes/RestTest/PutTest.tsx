import {useState, useCallback} from 'react'
import {put} from '../../server'
import * as D from '../../data'
import {useAuth} from '../../contexts'

type Body = Record<'id' | string, any>
type Data = {
  ok: boolean
  body?: Body
  errorMessage?: string
}
export default function PutTest() {
  const {jwt} = useAuth()

  const [data, setData] = useState<Data | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const putTest = useCallback(() => {
    put('/test/1234', D.makeRandomCard(), jwt)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => setErrorMessage(error.message))
  }, [jwt])

  return (
    <div className="mb-4">
      <div className="flex justify-center mb-4">
        <button onClick={putTest} className="btn btn-primary">
          PUT id 1234
        </button>
      </div>
      <div className="mt-4 text-center">
        <p>id: {data?.body?.id}</p>
        <p>data: {JSON.stringify(data, null, 2)}</p>
        {errorMessage && <p>error: {errorMessage}</p>}
      </div>
    </div>
  )
}
