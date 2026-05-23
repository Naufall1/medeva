import { useLocation } from 'react-router-dom'
import { useState } from 'react'

const navigationGroups = [
  {
    label: 'Rawat Inap',
    icon: 'RI',
    items: [
      { label: 'Pengaturan Ruangan', path: '/ruangan' },
      { label: 'Pengaturan Kelas', path: '/kelas-ruangan' },
    ],
  },
]

export default function ShellSidebar() {
  const location = useLocation()
  const isRuanganPage = location.pathname.startsWith('/ruangan')
  const [openGroup, setOpenGroup] = useState(null)

  return (
    <aside className="app-sidebar pt-6" aria-label="Sidebar navigasi">
      {navigationGroups.map((group) => {
        const isActiveGroup = isRuanganPage && openGroup === null ? true : openGroup === group.label
        return (
          <div
            className={isRuanganPage ? 'app-sidebar__item app-sidebar__item--active' : 'app-sidebar__item'}
            key={group.label}
          >
            <button
              type="button"
              className="app-sidebar__button"
              aria-current={isRuanganPage ? 'page' : undefined}
              aria-expanded={openGroup === group.label ? 'true' : 'false'}
              onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
            >
              <span className="app-sidebar__icon" aria-hidden="true">
                {group.icon}
              </span>
              <span className="app-sidebar__label">{group.label}</span>
            </button>

            <div
              className={`app-sidebar__submenu ${openGroup === group.label ? 'app-sidebar__submenu--open' : ''}`}
              role="menu"
              aria-label={`${group.label} submenu`}
            >
              {group.items.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  className={location.pathname.startsWith(item.path) ? 'app-sidebar__submenu-link app-sidebar__submenu-link--active' : 'app-sidebar__submenu-link'}
                  role="menuitem"
                  aria-current={location.pathname.startsWith(item.path) ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </aside>
  )
}