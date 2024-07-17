import { NavLink } from 'react-router-dom'
import { Icon, Divider } from '@mui/material'

export default function Desktop(props) {
  const { user, links } = props

  const filteredLinks = links.filter(
    (link) => !link.availableRoles || (link.availableRoles.includes(user.role) && link.visible)
  )

  const currentYear = new Date().getFullYear()

  return (
    <aside className="block h-screen w-60 overflow-auto bg-[#1C253F]">
      <div className="flex h-full w-full flex-col justify-between pt-4">
        <div>
          <header className="flex flex-col items-center gap-y-5 px-5 pb-11">
            <img src="/assets/pgcomp_2.png" alt="Logo" className="block w-52" />
          </header>
          <ul className=" flex w-full flex-col items-center">
            {filteredLinks.map((link) => (
              <li key={link.name} className="w-full text-white hover:bg-[#323a52]">
                <NavLink
                  to={link.path}
                  className="flex h-full w-full items-center justify-start gap-x-2 border-l-4 border-transparent py-4 px-5 text-base outline-none hover:border-blue-500 hover:bg-blue-100 focus:outline-none"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? '#323a52' : 'transparent',
                    borderColor: isActive ? '#3b82f6' : 'transparent'
                  })}
                >
                  <Icon sx={{ fontSize: 32 }}>{link.icon}</Icon>
                  <span className="text-center font-inter font-medium text-white">{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="pb-4">
          <Divider className="bg-white" variant="middle" />
          <div className="flex flex-col items-center">
            <a href="/" className="block p-2 text-center font-poppins font-semibold text-white">
              Sistema de Gerenciamento de Bolsas
            </a>
            <span className="text-white"> {currentYear} &copy; </span>
          </div>
        </div>
      </div>
    </aside>
  )
}
