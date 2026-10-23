export interface InfoItemProps {
  label: string
  value: React.ReactNode
}

/** Par rotulo/valor das paginas de detalhe. Deve ficar dentro de um `<dl>`. */
function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className='space-y-1'>
      <dt className='text-xs font-medium uppercase text-gray-500'>{label}</dt>
      <dd className='break-words text-sm text-gray-900'>{value}</dd>
    </div>
  )
}

export { InfoItem }
