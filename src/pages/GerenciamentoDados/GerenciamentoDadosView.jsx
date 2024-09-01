import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Icon, Typography } from '@mui/material'
import Sidebar from '../../components/Sidebar'
import Loading from '../../components/Loading'
import MenuAppBar from '../../components/Navbar'
import { FileInput } from '../../components'
import { Download, Upload } from '@mui/icons-material'

function GerenciamentoDadosView(props) {
  const { isLoading, onImport, onExport } = props
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileSelected = (file) => {
    setSelectedFile(file)
  }

  return (
    <div className="flex h-screen flex-col overflow-auto bg-gray-100 md:flex-row">
      <Sidebar />
      <div className="flex w-full flex-col justify-start">
        <MenuAppBar />
        <section className="flex w-full justify-center p-4">
          <div className="shadow-base h-max w-full space-y-8 rounded-lg bg-white p-6 lg:w-full">
            <div className="mb-8 flex justify-between">
              <div className="flex items-center gap-x-4">
                <div className="rounded-md bg-black p-2 leading-none">
                  <Icon sx={{ fontSize: 32, color: 'white' }}>cloud</Icon>
                </div>
                <div>
                  <h2 className="poppins text-xl font-semibold text-gray-900">Gestão de Dados</h2>
                  <p className="poppins font-medium text-gray-500">Upload e Download de Informações do Sistema</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-x-4">
                <Button
                  variant="contained"
                  color="info"
                  startIcon={<Download />}
                  onClick={onExport}
                >
                  Exportar Bolsistas (CSV)
                </Button>
              </div>
            </div>
            {isLoading ? (
              <Loading />
            ) : (
              <Box display="flex" justifyContent="center" width="100%">
                <div className="mt-2 flex min-w-[395px] max-w-[595px] flex-col font-inter">
                  <Typography variant="h3" marginBottom="2rem">Importar Bolsistas</Typography>
                  <p style={{ textAlign: 'justify' }}><b>Atenção!</b> Esta ação irá apagar todas as bolsas já cadastradas no sistema e recriar a base de dados levando em consideração as informações contidas no arquivo que está sendo importado.</p>
                  <br/>
                  <p style={{ textAlign: 'justify' }}>Ao clicar em "Enviar", você automaticamente fará download de um arquivo <b>*.csv</b>, se tratando de um backup referente ao estado atual da base de dados do sistema. Se preferir, você também pode fazer um backup clicando diretamente no botão "Exportar Bolsistas (CSV)" no canto superior direito da página.</p>
                  <br/>
                  <FileInput onFileSelected={handleFileSelected} />
                  <br/>
                  <p style={{ textAlign: 'justify' }}>Apenas arquivos <b>*.csv</b> são permitidos para importação. Além disso, esta funcionalidade necessita que o caractere <b>","</b> (comma) seja utilizado como delimitador de campos do csv. <b>Caso algum outro caractere como, por exemplo, o ";" (semicolon) seja utilizado como delimitador, o bom funcionamento da importação não é garantido.</b></p>
                  <br/>
                  <Button variant="outlined" color="success" startIcon={<Upload />} sx={{ marginTop: '2rem' }} onClick={() => onImport(selectedFile)}>
                    Enviar
                  </Button>
                </div>
              </Box>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

GerenciamentoDadosView.prototypes = {
  isLoading: PropTypes.boolean,
  onImport: PropTypes.func,
  onExport: PropTypes.func
}

export { GerenciamentoDadosView }
