import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import ShellFooter from './ShellFooter'
import ShellNavbar from './ShellNavbar'
import ShellSidebar from './ShellSidebar'

export default function AppShell({ children }) {
  const { auth, logout } = useAuth()
  const location = useLocation()
  const clinicName = auth?.user?.klinik || 'Klinik'
  const displayName = auth?.user?.nama_lengkap || auth?.user?.name || auth?.user?.username || 'Tenaga Medis'
  const roleName = auth?.user?.is_admin ? 'Admin' : 'User'
  const breadcrumb = location.pathname.startsWith('/ruangan')
    ? ['Rawat Inap', 'Pengaturan Kategori Ruangan']
    : null

  return (
    <div className="app-shell">
      <ShellNavbar clinicName={clinicName} displayName={displayName} roleName={roleName} onLogout={logout} />

      <div className="app-shell__body">
        <ShellSidebar />

        <div className="app-shell__content">
          {breadcrumb ? (
            <nav className="app-shell__breadcrumb" aria-label="breadcrumb">
              <Link to="/ruangan">{breadcrumb[0]}</Link>
              <span aria-hidden="true">/</span>
              <span>{breadcrumb[1]}</span>
            </nav>
          ) : null}

          <div className="app-shell__page">{children}</div>
        </div>
      </div>

      <ShellFooter />
    </div>
  )
}