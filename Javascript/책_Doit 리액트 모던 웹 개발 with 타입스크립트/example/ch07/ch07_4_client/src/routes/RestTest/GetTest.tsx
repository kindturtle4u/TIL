import {useState, useCallback} from 'react'
import {get} from '../../server'
import {useAuth} from '../../contexts'

export default function GetTest() {
  const {jwt} = useAuth()

  const [data, setData] = useState<object>({})
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const getAllTest = useCallback(() => {
    get('/test', jwt)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => setErrorMessage(error.message))
  }, [jwt])
  const getTest = useCallback(() => {
    get('/test/1234', jwt)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => setErrorMessage(error.message))
  }, [jwt])

  return (
    <div className="mb-4">
      <div className="flex justify-center mb-4">
        <button onClick={getAllTest} className="mr-12 btn btn-primary">
          GET ALL
        </button>
        <button onClick={getTest} className="btn btn-primary">
          GET id 1234
        </button>
      </div>
      <div className="mt-4 text-center">
        <p>data: {JSON.stringify(data, null, 2)}</p>
        {errorMessage && <p>error: {errorMessage}</p>}
      </div>
    </div>
  )
}
