import { useRef, useState } from 'react'
import './styles.css'

export interface FileInputProps {
  /** Filtro do seletor de arquivos, no formato do atributo `accept`. */
  accept?: string
  /** Recebe `null` quando o usuario remove o arquivo escolhido. */
  onFileSelected: (file: File | null) => void
}

export default function FileInput({
  accept = '.csv',
  onFileSelected
}: FileInputProps) {
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const updateFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const uploadedFile = event.target.files[0]
      setFile(uploadedFile)
      onFileSelected(uploadedFile)
    }
  }

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const uploadedFile = event.dataTransfer.files[0]
      setFile(uploadedFile)
      onFileSelected(uploadedFile)
    }
  }

  const removeFile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setFile(null)
    onFileSelected(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div
      className={file ? 'dropZoneWithFile' : 'dropZone'}
      onDragOver={handleDragOver}
      onDrop={handleFileDrop}
      onClick={handleFileUploadClick}
    >
      {file ? (
        <div className="filePresentation">
          <span style={{ fontSize: '1.4rem' }}>{file.name}</span>
          <button className="removeFileButton" onClick={removeFile}>
            &#10005;
          </button>
        </div>
      ) : (
        <span style={{ fontSize: '1.4rem' }}>
          Escolha o arquivo ou arraste-o até aqui
        </span>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        onChange={updateFile}
      />
    </div>
  )
}
