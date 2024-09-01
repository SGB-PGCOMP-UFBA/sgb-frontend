import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api'
import { GerenciamentoDadosView } from './GerenciamentoDadosView'
import { formattedNow } from '../../helpers/formatters'
import { delay } from '../../helpers/delay'

function GerenciamentoDados() {
  const [isLoading, setIsLoading] = useState(false)
  const [importErrors, setImportErrors] = useState([])

  const handleImportScholarships = async (file) => {
    if (file) {
      await handleExportScholarships()
      setIsLoading(true)
      const formData = new FormData()
      formData.append('file', file)

      try {
        await delay(5000)
        const response = await api.dataManager.importData(formData)
        await delay(5000)

        if (response.status === 201) {
          toast.success('Bolsas importadas com sucesso.')
          setIsLoading(false)
          setImportErrors(response.data.errors)
        }
      } catch (error) {
        toast.error(`Erro ao enviar o arquivo: ${error.message}`)
      }
    } else {
      toast.error('Por favor, selecione um arquivo antes de enviar.')
    }
  }

  const handleExportScholarships = async () => {
    try {
      const response = await api.dataManager.exportData();

      if (response.status === 200) {
        // Cria um Blob a partir dos dados da resposta
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        // Define o nome do arquivo
        const filename = 'backup_' + formattedNow() + '.csv'

        // Cria um link para download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);

        // Simula o clique no link
        document.body.appendChild(link);
        link.click();

        // Remove o link do DOM
        document.body.removeChild(link);

        // Libera o objeto URL
        window.URL.revokeObjectURL(url);
      } else {
        toast.error(`[${response.status}]: ${response.data.error}`);
      }
    } catch (error) {
      toast.error(`Erro ao baixar o backup: ${error.message}`);
    }
  }

  const handleErrors = () => {
    setImportErrors([])
  }

  return (
    <GerenciamentoDadosView
      isLoading={isLoading}
      importErrors={importErrors}
      handleErrors={handleErrors}
      onImport={handleImportScholarships}
      onExport={handleExportScholarships}
    />
  )
}

export { GerenciamentoDados }
