import { useState } from 'react'
import { MdCloud } from 'react-icons/md'
import AppLayout from '@/components/app-layout'
import {
  Download,
  Upload
} from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Loading from '../../components/loading'
import { FileInput } from '../../components'
import type { ImportError } from '../../types'

export interface GerenciamentoDadosViewProps {
  isLoading: boolean
  importErrors: ImportError[]
  handleErrors: () => void
  onImport: (file: File | null) => void
  onExport: () => void
}

function GerenciamentoDadosView(props: GerenciamentoDadosViewProps) {
  const { isLoading, importErrors, handleErrors, onImport, onExport } = props
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileSelected = (file: File | null) => {
    setSelectedFile(file)
  }

  return (
    <AppLayout>
      <PageHeader
        title="Gestão de Dados"
        description="Upload e Download de Informações do Sistema"
        icon={MdCloud}
        iconBackgroundClassName="bg-black"
        actions={
          <div className="hidden items-center gap-x-4 md:flex">
            <Button
              className="bg-sky-600 text-white hover:bg-sky-700"
              onClick={onExport}
            >
              <Download />
              Exportar Bolsistas (CSV)
            </Button>
          </div>
        }
      />
      {isLoading && (
        <div className="w-full">
          <h3 className="mb-8 text-center text-2xl">Aguarde enquanto preparamos tudo para você!</h3>
          <Loading />
        </div>
      )}

      {!isLoading && importErrors.length > 0 && (
        <div className="w-full">
          <h3 className="mb-8 text-center text-2xl">Aguarde enquanto preparamos tudo para você!</h3>
          <p className="text-justify"><b>Atenção!</b> Encontramos alguns problemas durante a importação do arquivo csv.</p>
          <p className="text-justify">Isto não significa que toda a importação tenha falhado, apenas quer dizer que alguns recursos podem não ter sido criados, pois algum campo obrigatório faltou ou até mesmo porque já está cadastrado.</p>
          <p className="text-justify">Mais informações abaixo.</p>
          <div className="mt-8 space-y-1.5">
            <Label htmlFor="import-errors">Alertas de Importação</Label>
            <Textarea
              id="import-errors"
              readOnly
              rows={20}
              className="w-full"
              value={importErrors.map(error => JSON.stringify(error, null, 2)).join('\n')}
            />
          </div>
          <Button className="mt-4" onClick={handleErrors}>Concluir Importação</Button>
        </div>
      )}

      {!isLoading && importErrors.length <= 0 && (
        <div className="flex w-full justify-center">
          <div className="mt-2 flex min-w-[395px] max-w-[595px] flex-col font-inter">
            <h3 className="mb-8 text-3xl font-medium">Importar Bolsistas</h3>
            <p className="text-justify"><b>Atenção!</b> Esta ação irá apagar todas as bolsas já cadastradas no sistema e recriar a base de dados levando em consideração as informações contidas no arquivo que está sendo importado.</p>
            <br />
            <p className="text-justify">Ao clicar em "Enviar", você automaticamente fará download de um arquivo <b>*.csv</b>, se tratando de um backup referente ao estado atual da base de dados do sistema. Se preferir, você também pode fazer um backup clicando diretamente no botão "Exportar Bolsistas (CSV)" no canto superior direito da página.</p>
            <br />
            <FileInput onFileSelected={handleFileSelected} />
            <br />
            <p className="text-justify">Apenas arquivos <b>*.csv</b> são permitidos para importação. Além disso, esta funcionalidade necessita que o caractere <b>","</b> (comma) seja utilizado como delimitador de campos do csv. <b>Caso algum outro caractere como, por exemplo, o ";" (semicolon) seja utilizado como delimitador, o bom funcionamento da importação não é garantido.</b></p>
            <br />
            <Button
              variant="outline"
              className="mt-8 border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700"
              onClick={() => onImport(selectedFile)}
            >
              <Upload />
              Enviar
            </Button>
          </div>
        </div>
      )}
    </AppLayout>
  )
}

export { GerenciamentoDadosView }
