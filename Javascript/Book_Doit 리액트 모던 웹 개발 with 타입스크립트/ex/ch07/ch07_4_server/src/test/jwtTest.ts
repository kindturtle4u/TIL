import * as U from '../utils'

const jwtNomalTest = async () => {
  try {
    const jwt = await U.jwtSignP({name: 'Jack', age: 32})
    console.log('jwt', jwt)
    const decoded = await U.jwtVerifyP(jwt)
    console.log('decoded', decoded)
  } catch (e) {
    if (e instanceof Error) console.log('error', e.message)
  }
}
const jwtExceptionTest = async () => {
  try {
    const decoded = await U.jwtVerifyP('1234')
    console.log('decoded', decoded)
  } catch (e) {
    if (e instanceof Error) console.log('error', e.message)
  }
}
const jwtExpireTest = async () => {
  const jwt = await U.jwtSignP({name: 'Jack', age: 32}, {expiresIn: '1s'})
  const id = setTimeout(async () => {
    try {
      const decoded = await U.jwtVerifyP(jwt)
      console.log('decoded', decoded)
    } catch (e) {
      if (e instanceof Error) console.log('error', e.message)
    }
  }, 2000)
}
jwtNomalTest().then(jwtExceptionTest).then(jwtExpireTest)
