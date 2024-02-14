import {Routes, Route} from 'react-router-dom'
import Layout from './Layout'
import RequireAuth from './Auth/RequireAuth'
import LandingPage from './LandingPage'
import Board from '../pages/Board'
import Signup from './Auth/SignUp'
import Login from './Auth/Login'
import Logout from './Auth/Logout'
import NoMatch from './NoMatch'

export default function RoutesSetup() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route
          path="/board"
          element={
            <RequireAuth>
              <Board />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/logout"
        element={
          <RequireAuth>
            <Logout />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}
