/*
import ReduxClock from './pages/ReduxClock'
import UseReducerClock from './pages/UseReducerClock'

export default function App() {
  return (
    <main className="p-8">
      <UseReducerClock />
      <ReduxClock />
    </main>
  )
}
*/
/*
import type {Action} from 'redux'
import {Provider as ReduxProvider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'

import ReduxClock from './pages/ReduxClock'
import UseReducerClock from './pages/UseReducerClock'

type AppState = {
  today: Date
}
const initialAppState = {
  today: new Date()
}
const rootReducer = (state: AppState = initialAppState, action: Action) => state
const store = configureStore({reducer: rootReducer, middleware: []})

export default function App() {
  return (
    <ReduxProvider store={store}>
      <main className="p-8">
        <UseReducerClock />
        <ReduxClock />
      </main>
    </ReduxProvider>
  )
}
*/

import {Provider as ReduxProvider} from 'react-redux'
import {useStore} from './store'

import ReduxClock from './pages/ReduxClock'
import UseReducerClock from './pages/UseReducerClock'

export default function App() {
  const store = useStore()
  return (
    <ReduxProvider store={store}>
      <main className="p-8">
        <UseReducerClock />
        <ReduxClock />
      </main>
    </ReduxProvider>
  )
}
