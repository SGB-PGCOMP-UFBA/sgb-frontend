import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import AppSidebar from '@/components/sidebar'
import MenuAppBar from '@/components/navbar'
import { cn } from '@/lib/utils'

export interface AppLayoutProps {
  children: React.ReactNode
  className?: string
}

export default function AppLayout({ children, className }: AppLayoutProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <SidebarProvider className="bg-gray-100">
        <AppSidebar />
        <SidebarInset>
          <MenuAppBar />
          <div className="min-w-0 flex-1 overflow-y-auto p-4">
            <div
              className={cn(
                'shadow-base w-full min-w-0 space-y-8 rounded-lg bg-white p-6',
                className
              )}
            >
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
