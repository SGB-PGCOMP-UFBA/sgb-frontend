import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../api'
import { GerenciamentoDadosView } from './GerenciamentoDadosView'
import { formattedNow } from '../../helpers/formatters'

function GerenciamentoDados() {
  const [isLoading, setIsLoading] = useState(false)

  const handleImportScholarships = async (file) => {
    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await api.dataManager.importScholarships(formData)

        if (response.status === 201) {
          toast.success('Bolsas importadas com sucesso.')
          setIsLoading(false)
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
      const response = await api.dataManager.exportScholarships();

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

  return (
    <GerenciamentoDadosView
      isLoading={isLoading}
      onImport={handleImportScholarships}
      onExport={handleExportScholarships}
    />
  )
}

export { GerenciamentoDados }
