import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Menu } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const SIDEBAR_WIDTH = '15rem'
const SIDEBAR_WIDTH_MOBILE = '18rem'
const SIDEBAR_WIDTH_ICON = '3rem'

interface SidebarContextValue {
  state: 'expanded' | 'collapsed'
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)

  if (!context) {
    throw new Error('useSidebar precisa ser usado dentro de um SidebarProvider.')
  }

  return context
}

export interface SidebarProviderProps extends React.ComponentProps<'div'> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
    const open = openProp ?? internalOpen

    const setOpen = React.useCallback(
      (value: boolean) => {
        if (setOpenProp) {
          setOpenProp(value)
          return
        }

        setInternalOpen(value)
      },
      [setOpenProp]
    )

    const toggleSidebar = React.useCallback(() => {
      if (isMobile) {
        setOpenMobile((current) => !current)
        return
      }

      setOpen(!open)
    }, [isMobile, open, setOpen])

    const contextValue = React.useMemo<SidebarContextValue>(
      () => ({
        state: open ? 'expanded' : 'collapsed',
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar
      }),
      [open, setOpen, openMobile, isMobile, toggleSidebar]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          ref={ref}
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              ...style
            } as React.CSSProperties
          }
          className={cn('flex h-screen w-full overflow-hidden', className)}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = 'SidebarProvider'

export interface SidebarProps extends React.ComponentProps<'div'> {
  collapsible?: 'offcanvas' | 'icon' | 'none'
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ collapsible = 'offcanvas', className, children, ...props }, ref) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent
            side="left"
            hideCloseButton
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            style={{ '--sidebar-width': SIDEBAR_WIDTH_MOBILE } as React.CSSProperties}
          >
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetDescription className="sr-only">Navegacao principal do sistema</SheetDescription>
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        ref={ref}
        data-state={state}
        data-collapsible={state === 'collapsed' ? collapsible : ''}
        className="group peer hidden text-sidebar-foreground md:block"
        {...props}
      >
        <div
          className={cn(
            'relative h-screen w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear',
            'group-data-[collapsible=offcanvas]:w-0',
            'group-data-[collapsible=icon]:w-[--sidebar-width-icon]'
          )}
        />
        <div
          className={cn(
            'fixed inset-y-0 left-0 z-[9999] hidden h-screen w-[--sidebar-width] transition-[left,width] duration-200 ease-linear md:flex',
            'group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]',
            'group-data-[collapsible=icon]:w-[--sidebar-width-icon]',
            className
          )}
        >
          <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col overflow-hidden bg-sidebar"
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
)
Sidebar.displayName = 'Sidebar'

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      aria-label="Alternar menu"
      className={className}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <Menu className="!size-8" />
    </Button>
  )
})
SidebarTrigger.displayName = 'SidebarTrigger'

const SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<'main'>>(
  ({ className, ...props }, ref) => (
    <main
      ref={ref}
      className={cn('flex h-screen min-w-0 flex-1 flex-col overflow-hidden', className)}
      {...props}
    />
  )
)
SidebarInset.displayName = 'SidebarInset'

const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-2 p-2', className)} {...props} />
  )
)
SidebarHeader.displayName = 'SidebarHeader'

const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mt-auto flex flex-col gap-2 p-2', className)} {...props} />
  )
)
SidebarFooter.displayName = 'SidebarFooter'

const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex min-h-0 flex-1 flex-col gap-2 overflow-auto', className)}
      {...props}
    />
  )
)
SidebarContent.displayName = 'SidebarContent'

const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex w-full min-w-0 flex-col', className)} {...props} />
  )
)
SidebarMenu.displayName = 'SidebarMenu'

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('group/menu-item relative', className)} {...props} />
  )
)
SidebarMenuItem.displayName = 'SidebarMenuItem'

const sidebarMenuButtonVariants = cva(
  'flex w-full items-center gap-x-3 overflow-hidden border-l-4 border-transparent text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sidebar-ring disabled:pointer-events-none disabled:opacity-50 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'hover:border-sidebar-accent hover:bg-sidebar-accent data-[active=true]:border-sidebar-accent data-[active=true]:bg-sidebar-active',
        ghost: 'hover:bg-sidebar-accent/50'
      },
      size: {
        default: 'px-5 py-4 text-base',
        sm: 'px-3 py-2 text-sm'
      }
    },
    defaultVariants: { variant: 'default', size: 'default' }
  }
)

export interface SidebarMenuButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string
}

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ asChild = false, isActive = false, variant, size, tooltip, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    const { isMobile, state } = useSidebar()

    const button = (
      <Comp
        ref={ref}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    )

    if (!tooltip || state !== 'collapsed' || isMobile) {
      return button
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right">{tooltip}</TooltipContent>
      </Tooltip>
    )
  }
)
SidebarMenuButton.displayName = 'SidebarMenuButton'

export {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
}
