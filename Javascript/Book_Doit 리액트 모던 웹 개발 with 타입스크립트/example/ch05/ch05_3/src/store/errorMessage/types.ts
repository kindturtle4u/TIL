import type {Action} from 'redux'

export type State = string

export type SetErrorMessageAction = Action<'@errorMessage/setErrorMessage'> & {
  payload: State
}

export type Actions = SetErrorMessageAction
