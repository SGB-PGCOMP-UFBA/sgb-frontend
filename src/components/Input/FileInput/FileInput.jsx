import React, { useRef, useState } from "react";
import "./styles.css";

export default function FileInput({ accept = ".csv", onFileSelected }) {
  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileUploadClick = () => {
    fileInputRef.current?.click()
  };

  const handleDragOver = (event) => {
    event.preventDefault()
  };

  const updateFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      const uploadedFile = event.target.files[0];
      setFile(uploadedFile);
      onFileSelected(uploadedFile);
    }
  };

  const handleFileDrop = (event) => {
    event.preventDefault()
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const uploadedFile = event.dataTransfer.files[0];
      setFile(uploadedFile);
      onFileSelected(uploadedFile);
    }
  };

  const removeFile = (event) => {
    event.stopPropagation()
    setFile(null)
    onFileSelected(null)
    fileInputRef.current.value = ""
  }

  return (
    <div
      className={file ? "dropZoneWithFile" : "dropZone"}
      onDragOver={handleDragOver}
      onDrop={handleFileDrop}
      onClick={handleFileUploadClick}
    >
      {file ? (
        <div className="filePresentation">
          <span style={{ fontSize: '1.4rem' }}>{file.name}</span>
          <button className="removeFileButton"onClick={removeFile}>
            &#10005;
          </button>
        </div>
      ) : (
        <span style={{ fontSize: '1.4rem' }}>Escolha o arquivo ou arraste-o até aqui</span>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        style={{ display: "none" }}
        onChange={updateFile}
      />
    </div>
  )
}
