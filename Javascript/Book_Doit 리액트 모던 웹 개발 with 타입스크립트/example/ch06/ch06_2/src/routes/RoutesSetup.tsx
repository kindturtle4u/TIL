import {Routes, Route} from 'react-router-dom'
import Layout from './Layout'
import LandingPage from './LandingPage'
import Board from '../pages/Board'
import NoMatch from './NoMatch'

export default function RoutesSetup() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/board" element={<Board />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  )
}
