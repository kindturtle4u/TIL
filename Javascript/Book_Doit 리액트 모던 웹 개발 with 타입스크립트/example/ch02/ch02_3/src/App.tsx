import ClassComponent from './ClassComponent'
import ArrowComponent from './ArrowComponent'

export default function App() {
  return (
    <ul>
      <ClassComponent href="http://www.google.com" text="go to Google" />
      <ArrowComponent href="https://twitter.com" text="go to Twitter" />
    </ul>
  )
}
