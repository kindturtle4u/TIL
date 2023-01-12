import type {AppState} from '../store'
import * as F from '../store/fetching'
import {useSelector} from 'react-redux'

export default function LoadingAndErrorMessage() {
  const {loading, errorMessage} = useSelector<AppState, F.State>(({fetching}) => fetching)

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center">
          <button className="btn btn-circle btn-sm btn-secondary loading"></button>
        </div>
      )}
      {errorMessage && (
        <p className="text-3xl font-bold text-center text-secondary">{errorMessage}</p>
      )}
    </div>
  )
}
