import type {Action} from 'redux'

export type State = {
  loading: boolean
  errorMessage: string
}

export type SetLoading = Action<'@fetching/setLoading'> & {
  payload: boolean
}
export type SetErrorMessage = Action<'@fetching/setErrorMessage'> & {
  payload: string
}

export type Actions = SetLoading | SetErrorMessage
