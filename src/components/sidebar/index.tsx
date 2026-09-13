import { Link, NavLink } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { getUserFromLocalStorage } from '@/helpers/auth-user'
import { SIDEBAR_LINKS } from './links'

export default function AppSidebar() {
  const user = getUserFromLocalStorage()
  const currentYear = new Date().getFullYear()

  const links = SIDEBAR_LINKS.filter(
    (link) =>
      !link.availableRoles ||
      (user !== null && link.availableRoles.includes(user.role) && link.visible)
  )

  return (
    <Sidebar>
      <SidebarHeader className="px-5 pb-6 pt-4">
        <Link to="/dashboard" className="flex justify-center">
          <img src="/assets/pgcomp_2.png" alt="Logo" className="block w-52 max-w-full" />
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-0">
        <SidebarMenu>
          {links.map((link) => {
            const Icon = link.icon

            return (
              <SidebarMenuItem key={link.name}>
                <NavLink to={link.path}>
                  {({ isActive }) => (
                    <SidebarMenuButton asChild isActive={isActive} tooltip={link.name}>
                      <span>
                        <Icon className="size-8" />
                        <span className="truncate font-inter font-medium">{link.name}</span>
                      </span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="gap-0 p-0 pb-4">
        <Separator className="mx-4 mb-2 w-auto bg-white" />
        <div className="flex flex-col items-center">
          <a href="/" className="block p-2 text-center font-poppins font-semibold">
            Sistema de Gerenciamento de Bolsas
          </a>
          <span> {currentYear} &copy; </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
