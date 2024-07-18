import { Box, Icon } from '@mui/material'
import Sidebar from '../../components/Sidebar'
import MenuAppBar from '../../components/Navbar'

function AreaDoEstudanteView() {
  return (
    <div className="flex h-screen flex-col overflow-auto bg-gray-100 md:flex-row">
      <Sidebar />
      <div className="flex w-full flex-col justify-start">
        <MenuAppBar />
        <section className="flex w-full justify-center p-4">
          <div className="shadow-base h-max w-full rounded-lg bg-white p-6 lg:w-full">
            <div className="mb-8 flex items-center gap-x-4">
              <div className="rounded-md bg-red-400 p-2 leading-none">
                <Icon sx={{ fontSize: 32 }}>school</Icon>
              </div>
              <div>
                <h2 className="poppins text-xl font-semibold text-gray-900">Área do Estudante</h2>
                <p className="poppins font-medium text-gray-500">Matrículas e Bolsas</p>
              </div>
            </div>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
              </Box>
          </div>
        </section>
      </div>
    </div>
  )
}

export { AreaDoEstudanteView }
