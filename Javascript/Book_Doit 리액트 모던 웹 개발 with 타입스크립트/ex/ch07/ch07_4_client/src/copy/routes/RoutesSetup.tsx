import {Routes, Route} from 'react-router-dom'
import NoMatch from './NoMatch'

export default function RoutesSetup() {
  return (
    <Routes>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}
