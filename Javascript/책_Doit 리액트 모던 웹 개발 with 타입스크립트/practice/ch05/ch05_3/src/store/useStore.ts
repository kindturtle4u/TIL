import {configureStore, Tuple} from '@reduxjs/toolkit'
import {useMemo} from 'react'
import {rootReducer} from './rootReducer'
import logger from 'redux-logger'
import {thunk} from 'redux-thunk'

const useLogger = process.env.NODE_ENV !== 'production'

const initializeStore = () => {
  const middleware: any = () => new Tuple(thunk,logger)


  const store = configureStore({
    reducer: rootReducer,
    middleware
  })

  return store
}

export function useStore() {
  const store = useMemo(() => initializeStore(), [])
  return store
}
