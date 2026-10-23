import { cn } from '@/lib/utils'

export interface DetailSectionProps {
  title?: string
  /** Acao do canto direito do titulo, ex.: botao "Ver usuário". */
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}

/** Bloco com borda das paginas de detalhe. */
function DetailSection({
  title,
  action,
  children,
  className,
}: DetailSectionProps) {
  const headingId = title
    ? `secao-${title.toLowerCase().replace(/\s+/g, '-')}`
    : undefined

  return (
    <section
      aria-labelledby={headingId}
      className={cn('rounded-xl border border-gray-200 p-5', className)}
    >
      {(title || action) && (
        <div className='mb-4 flex flex-wrap items-center justify-between gap-2'>
          {title && (
            <h2
              id={headingId}
              className='text-base font-semibold text-gray-900'
            >
              {title}
            </h2>
          )}
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

export { DetailSection }
