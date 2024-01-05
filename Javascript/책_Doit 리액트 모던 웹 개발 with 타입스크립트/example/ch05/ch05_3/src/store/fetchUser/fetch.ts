import {Dispatch} from 'redux'
import * as L from '../loading'
import * as E from '../errorMessage'
import {setUser, changeName, changeEmail, changePicture} from './actions'
import * as D from '../../data'

export const getRemoteUser = () => (dispatch: Dispatch) => {
  dispatch(L.setLoading(true))
  dispatch(E.setErrorMessage(''))
  D.fetchRandomUser()
    .then(user => dispatch(setUser(user)))
    .catch((e: Error) => E.setErrorMessage(e.message))
    .finally(() => dispatch(L.setLoading(false)))
}
export const changeNameByFetching = () => (dispatch: Dispatch) => {
  dispatch(L.setLoading(true))
  dispatch(E.setErrorMessage(''))
  D.fetchRandomUser()
    .then(user => dispatch(changeName(user.name)))
    .catch((e: Error) => E.setErrorMessage(e.message))
    .finally(() => dispatch(L.setLoading(false)))
}

export const changeEmailByFetching = () => (dispatch: Dispatch) => {
  dispatch(L.setLoading(true))
  dispatch(E.setErrorMessage(''))
  D.fetchRandomUser()
    .then(user => dispatch(changeEmail(user.email)))
    .catch((e: Error) => E.setErrorMessage(e.message))
    .finally(() => dispatch(L.setLoading(false)))
}

export const changePictureByFetching = () => (dispatch: Dispatch) => {
  dispatch(L.setLoading(true))
  dispatch(E.setErrorMessage(''))
  D.fetchRandomUser()
    .then(user => dispatch(changePicture(user.picture)))
    .catch((e: Error) => E.setErrorMessage(e.message))
    .finally(() => dispatch(L.setLoading(false)))
}
