import ResponsiveContextTest from './pages/ResponsiveContextTest'
import {ResponsiveProvider} from './contexts'

export default function App() {
  return (
    <ResponsiveProvider>
      <main>
        <ResponsiveContextTest />
      </main>
    </ResponsiveProvider>
  )
}
