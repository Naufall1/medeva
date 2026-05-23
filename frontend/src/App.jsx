import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import AppShell from './components/AppShell'
import LoginPage from './pages/LoginPage'
import RoomListPage from './pages/RoomListPage'

function ProtectedLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}

export default function App() {
  const { auth } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={auth ? <Navigate to="/ruangan" replace /> : <LoginPage />} />
      <Route element={auth ? <ProtectedLayout /> : <Navigate to="/login" replace />}>
        <Route path="/ruangan" element={<RoomListPage />} />
      </Route>
      <Route path="*" element={<Navigate to={auth ? '/ruangan' : '/login'} replace />} />
    </Routes>
  )
}
