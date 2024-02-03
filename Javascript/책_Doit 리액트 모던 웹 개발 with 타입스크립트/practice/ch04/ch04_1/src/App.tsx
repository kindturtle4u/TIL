import Clock from './pages/Clock'
import {useClock} from "./hooks";

export default function App() {
  const today = useClock()
  return <Clock today={today}/>
}

// export default function App() {
//   const [today, setToday] = useState(new Date());
//
//   useEffect(() => {
//     const duration = 1000;
//     let id = setInterval(() => {
//       setToday(new Date());
//     }, duration);
//
//     return () => { clearInterval(id)}
//
//   }, [])
//
//   return <Clock today={today}/>
// }
