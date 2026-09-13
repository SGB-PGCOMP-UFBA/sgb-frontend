import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export interface FileInputProps {
  accept?: string
  onFileSelected: (file: File | null) => void
}

export default function FileInput({
  accept = '.csv',
  onFileSelected,
}: FileInputProps) {
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleDragOver = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const updateFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const uploadedFile = event.target.files[0]
      setFile(uploadedFile)
      onFileSelected(uploadedFile)
    }
  }

  const handleFileDrop = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const uploadedFile = event.dataTransfer.files[0]
      setFile(uploadedFile)
      onFileSelected(uploadedFile)
    }
  }

  const removeFile = () => {
    setFile(null)
    onFileSelected(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div
      className={cn(
        'relative flex h-full min-h-fit items-center justify-center rounded-md border-2 border-dashed p-2 text-4xl',
        file
          ? 'border-[#4888e9] text-[#4888e9]'
          : 'border-gray-300 text-gray-400'
      )}
    >
      <button
        type='button'
        aria-label={file ? `Trocar o arquivo ${file.name}` : 'Escolher arquivo'}
        className='flex h-full w-full cursor-pointer items-center justify-center rounded-md px-8 text-[1.4rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        onClick={handleFileUploadClick}
        onDragOver={handleDragOver}
        onDrop={handleFileDrop}
      >
        {file ? file.name : 'Escolha o arquivo ou arraste-o até aqui'}
      </button>

      {file && (
        <button
          type='button'
          aria-label='Remover arquivo'
          className='absolute right-2 cursor-pointer text-[1.2rem] text-red-600'
          onClick={removeFile}
        >
          &#10005;
        </button>
      )}

      <input
        ref={fileInputRef}
        type='file'
        accept={accept}
        className='hidden'
        onChange={updateFile}
      />
    </div>
  )
}
