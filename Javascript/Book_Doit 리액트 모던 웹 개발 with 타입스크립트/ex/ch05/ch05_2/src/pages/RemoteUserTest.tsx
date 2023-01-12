import {useState, useCallback, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useToggle} from '../hooks'
import {Title, Avatar} from '../components'
import {Button} from '../theme/daisyui'
import * as D from '../data'
import type {AppState} from '../store'
import * as R from '../store/remoteUser'

export default function RemoteUserTest() {
  const dispatch = useDispatch()
  const user = useSelector<AppState, R.State>(({remoteUser}) => remoteUser)
  const [loading, toggleLoading] = useToggle()
  const [error, setError] = useState<Error | null>(null)

  const getRemoteUser = useCallback(() => {
    toggleLoading()
    D.fetchRandomUser()
      .then(user => dispatch(R.setUser(user)))
      .catch(setError)
      .finally(toggleLoading)
  }, [dispatch, toggleLoading])
  const changeName = useCallback(() => {
    toggleLoading()
    D.fetchRandomUser()
      .then(user => dispatch(R.changeName(user.name)))
      .catch(setError)
      .finally(toggleLoading)
  }, [dispatch, toggleLoading])
  const changeEmail = useCallback(
    () => dispatch(R.changeEmail(D.randomEmail())),
    [dispatch]
  )
  const changePicture = useCallback(
    () => dispatch(R.changePicture({large: D.randomAvatar()})),
    [dispatch]
  )

  useEffect(getRemoteUser, [getRemoteUser])

  return (
    <section className="mt-4">
      <Title>RemoteUserTest</Title>
      <div className="flex justify-center mt-4">
        <Button className="btn-sm btn-primary" onClick={getRemoteUser}>
          get remote user
        </Button>
        <Button className="ml-4 btn-sm btn-accent" onClick={changeName}>
          change name
        </Button>
        <Button className="ml-4 btn-sm btn-success" onClick={changeEmail}>
          change email
        </Button>
        <Button className="ml-4 btn-sm btn-secondary" onClick={changePicture}>
          change picture
        </Button>
      </div>
      {loading && (
        <div className="flex items-center justify-center">
          <button className="btn btn-circle loading"></button>
        </div>
      )}
      {error && (
        <div className="p-4 mt-4 bg-red-200">
          <p className="text-3xl text-red-500 text-bold">{error.message}</p>
        </div>
      )}

      <div className="flex justify-center p-4 mt-4">
        <Avatar src={user.picture.large} />
        <div className="ml-4">
          <p className="text-xl text-bold">
            {user.name.title}. {user.name.first} {user.name.last}
          </p>
          <p className="italic text-gray-600">{user.email}</p>
        </div>
      </div>
    </section>
  )
}
