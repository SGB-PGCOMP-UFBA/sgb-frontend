export interface PublicPageLayoutProps {
  subtitle: string
  children: React.ReactNode
  contentClassName?: string
}

function PublicPageLayout({
  subtitle,
  children,
  contentClassName
}: PublicPageLayoutProps) {
  return (
    <div className="flex h-full w-full p-5 md:p-10">
      <main className="mx-auto w-full max-w-screen-sm">
        <div className="flex flex-col items-center">
          <img src="/assets/pgcomp_1.png" alt="PGCOMP" className="max-w-[200px]" />
          <h1 className="mb-6 text-center text-xl font-bold">
            Sistema de Gerenciamento de Bolsas
          </h1>
          <h2 className="text-lg font-medium">{subtitle}</h2>
          <div className={contentClassName ?? 'mt-4 w-full'}>{children}</div>
        </div>
      </main>
    </div>
  )
}

export { PublicPageLayout }
