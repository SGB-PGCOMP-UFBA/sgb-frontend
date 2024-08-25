import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api'
import { GerenciamentoDadosView } from './GerenciamentoDadosView'

function GerenciamentoDados() {
  const [isLoading, setIsLoading] = useState(false)

  const handleImportScholarships = async (file) => {
    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await api.scholarship.importScholarships(formData)

        if (response.status === 201) {
          toast.success('Bolsas importadas com sucesso.')
          setIsLoading(false)
        }
      } catch (error) {
        toast.error('Erro ao enviar o arquivo')
      }
    } else {
      toast.error('Por favor, selecione um arquivo antes de enviar.')
    }
  }

  return (
    <GerenciamentoDadosView
      isLoading={isLoading}
      onImport={handleImportScholarships}
      onExport={() => {}}
    />
  )
}

export { GerenciamentoDados }
