export default function ShellNavbar({ clinicName, displayName, roleName, onLogout }) {
  return (
    <header className="app-navbar">
      <div className="app-navbar__brand">
        <span className="app-navbar__clinic">{clinicName}</span>
      </div>

      <div className="app-navbar__center" aria-label="Medeva Mint">
        <svg className="app-navbar__pulse" viewBox="0 0 84 28" aria-hidden="true" focusable="false">
          <path d="M2 14h18l4-7 5 14 4-10h12l4-6 4 16 5-7h24" />
        </svg>
        <span className="app-navbar__title">Medeva Mint</span>
      </div>

      <div className="app-navbar__user">
        <button type="button" className="app-navbar__icon-button" aria-label="Notifikasi">
          <span className="app-navbar__notification-dot">0</span>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 22a2.2 2.2 0 0 0 2.2-2.2h-4.4A2.2 2.2 0 0 0 12 22Zm7.4-5.7V11a7.4 7.4 0 1 0-14.8 0v5.3L3.8 18v1h16.4v-1l-0.8-1.7Z" />
          </svg>
        </button>

        <div className="app-navbar__user-meta">
          <strong>{displayName}</strong>
          <span>{roleName}</span>
        </div>

        <button type="button" className="app-navbar__avatar" onClick={onLogout} aria-label="Logout">
          <span>{String(displayName).slice(0, 1).toUpperCase()}</span>
        </button>
      </div>
    </header>
  )
}