import type * as T from './types'

export const setErrorMessage = (payload: T.State): T.SetErrorMessageAction => ({
  type: '@errorMessage/setErrorMessage',
  payload
})
