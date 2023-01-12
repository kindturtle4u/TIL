import Bootstrap from './pages/Bootstrap'
import Icon from './pages/Icon'
import Style from './pages/Style'
import UsingIcon from './pages/UsingIcon'
import UsingIconWithCSSClass from './pages/UsingIconWithCSSClass'
import './App.css'

export default function App() {
  return (
    <div>
      <UsingIconWithCSSClass />
      <UsingIcon />
      <Style />
      <Icon />
      <Bootstrap />
    </div>
  )
}
