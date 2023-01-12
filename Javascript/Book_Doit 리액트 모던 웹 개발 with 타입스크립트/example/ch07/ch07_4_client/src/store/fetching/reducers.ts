import * as T from './types'

const initialState: T.State = {
  loading: false,
  errorMessage: ''
}

export const reducer = (state: T.State = initialState, action: T.Actions) => {
  switch (action.type) {
    case '@fetching/setLoading':
      return {...state, loading: action.payload}
    case '@fetching/setErrorMessage':
      return {...state, errorMessage: action.payload}
  }
  return state
}
