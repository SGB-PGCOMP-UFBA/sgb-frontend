import { NavLink } from 'react-router-dom'
import { Icon } from '@mui/material'

export default function Desktop() {
  const links = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      path: '/dashboard'
    },
    {
      name: 'Bolsas',
      icon: 'event_available_outlined',
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
    <aside className="durantion-300 block !min-h-screen w-60 overflow-auto bg-white pt-4 ">
      <div className="flex w-full flex-col items-center gap-x-2">
        <header className="flex flex-col items-center gap-y-5 px-5 pb-11">
          <img src="/assets/logo.png" alt="Logo" className="block w-52" />
          <a href="/" className="block text-center font-poppins text-base font-semibold">
            Sistema de Acompanhamento de Bolsistas
          </a>
        </header>
        <ul className=" flex w-full flex-col items-center">
          {links.map((link) => (
            <li key={link.name} className="w-full hover:bg-blue-100">
              <NavLink
                to={link.path}
                className="flex h-full w-full items-center justify-start gap-x-2 border-l-4 border-transparent py-4 px-5 text-base outline-none hover:border-blue-500 hover:bg-blue-100 focus:outline-none"
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
      </div>
    </aside>
  )
}
