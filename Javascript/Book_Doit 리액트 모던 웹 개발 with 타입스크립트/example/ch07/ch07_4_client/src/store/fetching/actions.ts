import type * as T from './types'

export const setLoading = (loading: boolean): T.SetLoading => ({
  type: '@fetching/setLoading',
  payload: loading
})

export const setErrorMessage = (errorMessage: string = '') => ({
  type: '@fetching/setErrorMessage',
  payload: errorMessage
})
