import {useClock} from './hooks'
import Clock from './pages/Clock'

export default function App() {
  const today = useClock()
  return <Clock today={today} />
}
