import { Link, NavLink } from 'react-router-dom'
import { Icon } from '@mui/material'
import { useAppContext } from '../../context/appContext'

export default function Mobile() {
  const { toggleSidebar, expandSidebar } = useAppContext()
  const links = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      path: '/dashboard'
    },
    {
      name: 'Bolsas',
      icon: 'work',
      path: '/bolsas'
    },
    {
      name: 'Estudantes',
      icon: 'school',
      path: '/estudantes'
    },
    {
      name: 'Orientadores',
      icon: 'people',
      path: '/orientadores'
    }
  ]

  return (
    <header className="mb-5 space-y-5 bg-white p-5 pb-2">
      <div className="flex w-full items-center justify-between">
        <Link to="/admin/dashboard" className="w-32 justify-self-center">
          <img src="/assets/pgcomp_1.png" alt="Logo" />
        </Link>
        <Link
          to="/admin/dashboard"
          className="hidden w-56 text-center text-sm font-semibold sm:block"
        >
          Sistema de acompanhamento de bolsistas
        </Link>
        <button type="button" onClick={toggleSidebar}>
          <img src="/assets/icons/menu.svg" alt="Menu" />
        </button>
      </div>
      <nav className={`${expandSidebar ? 'h-max' : 'h-0'} transition-all`}>
        <ul className={`${expandSidebar ? 'opacity-1' : 'opacity-0'} transition-all`}>
          {links.map((link) => (
            <li key={link.name} className={`${expandSidebar ? 'block' : 'hidden'} transition-all`}>
              <NavLink
                to={link.path}
                className="flex w-full items-center gap-x-3 border-l-4 border-transparent p-3 outline-none "
                style={({ isActive }) => ({
                  backgroundColor: isActive ? '#dbeafe' : 'transparent',
                  borderColor: isActive ? '#3b82f6' : 'transparent'
                })}
              >
                <Icon sx={{ fontSize: 32 }}>{link.icon}</Icon>
                <span className="text-center font-inter font-medium text-gray-800">
                  {link.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
