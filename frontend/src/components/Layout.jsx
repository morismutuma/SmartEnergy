
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Zap, BarChart2, Lightbulb, Settings, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/',           icon: LayoutDashboard, label: 'Home'     },
  { to: '/appliances', icon: Zap,             label: 'Devices'  },
  { to: '/charts',     icon: BarChart2,       label: 'Charts'   },
  { to: '/tips',       icon: Lightbulb,       label: 'Tips'     },
  { to: '/settings',   icon: Settings,        label: 'Settings' },
]

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col max-w-md mx-auto relative">

      {/* Fixed compact top bar */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 bg-dark-800/95 backdrop-blur-xl border-b border-dark-500">

        {/* User row - compact single line */}
        <div className="flex items-center justify-between px-4 pt-5 pb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary-800/60 border border-primary-700/50 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-primary-300">
                {(user?.first_name?.[0] || user?.username?.[0] || 'U').toUpperCase()}
              </span>
            </div>
            <span className="text-sm font-display font-semibold text-white">
              {user?.first_name || user?.username} 👋
            </span>
          </div>
          <button onClick={handleLogout} className="w-7 h-7 rounded-full bg-dark-600 border border-dark-400 flex items-center justify-center hover:bg-dark-500 transition-colors">
            <LogOut size={13} className="text-gray-400" />
          </button>
        </div>

        {/* Nav row */}
        <nav className="flex items-center justify-around px-1 pb-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              {({ isActive }) => (
                <>
                  <div className={`p-1 rounded-lg transition-all duration-200 ${isActive ? 'bg-primary-900/60' : ''}`}>
                    <Icon size={16} className={isActive ? 'text-primary-400' : 'text-gray-500'} />
                  </div>
                  <span className="text-[10px]">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Page content */}
      <main className="flex-1 px-4 pt-32 pb-8 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  )
}


