import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export interface DetailActionButtonProps {
  /** Quando presente, o botao fica desabilitado e o tooltip mostra o motivo. */
  disabledReason?: string
  children: React.ReactNode
  variant?: 'outline' | 'destructive'
  onClick: () => void
}

/** Botao de acao do cabecalho das paginas de detalhe. */
function DetailActionButton({
  disabledReason,
  children,
  variant = 'outline',
  onClick,
}: DetailActionButtonProps) {
  const button = (
    <Button
      variant={variant}
      aria-disabled={Boolean(disabledReason) || undefined}
      className={disabledReason ? 'cursor-not-allowed opacity-50' : undefined}
      onClick={disabledReason ? undefined : onClick}
    >
      {children}
    </Button>
  )

  if (!disabledReason) return button

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent className='max-w-xs text-center'>
        {disabledReason}
      </TooltipContent>
    </Tooltip>
  )
}

export { DetailActionButton }
