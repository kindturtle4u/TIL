import type {FC, PropsWithChildren} from 'react'
import type {AppState} from '../store'
import * as F from '../store/fetching'
import {useSelector} from 'react-redux'

export type LoadingProps = {}
const Loading: FC<PropsWithChildren<LoadingProps>> = ({...props}) => {
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
export default Loading

/*
import type {FC, PropsWithChildren} from 'react'
import type {AppState} from '../store'
import * as F from '../store/fetching'
import {useSelector} from 'react-redux'

export type LoadingProps = {}
const Loading: FC<PropsWithChildren<LoadingProps>> = ({...props}) => {
  const {loading} = useSelector<AppState, F.State>(({fetching}) => fetching)

  return (
    <div className="relative">
      {loading && (
        <div className="absolute z-10 flex items-center justify-center w-full h-full ">
          <button className="btn btn-circle btn-sm btn-secondary loading"></button>
        </div>
      )}
      <div {...props} />
    </div>
  )
}
export default Loading
*/
