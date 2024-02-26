import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import RequireAuth from './context/requireAuth'
import {
  PageForgetPassword,
  Login,
  PageNotFound,
  DashboardMetricas,
  GerenciamentoBolsas,
  GerenciamentoAgencias,
  GerenciamentoEstudantes,
  GerenciamentoOrientadores
} from './pages'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/esqueci-a-senha" element={<PageForgetPassword />} />

        {/* Rotas de usuário administrador */}
        <Route element={<RequireAuth allowedRoles="ADMIN" />}>
          <Route path="dashboard" element={<DashboardMetricas />} />
          <Route path="bolsas" element={<GerenciamentoBolsas />} />
          <Route path="agencias" element={<GerenciamentoAgencias />} />
          <Route path="estudantes" element={<GerenciamentoEstudantes />} />
          <Route path="orientadores" element={<GerenciamentoOrientadores />} />
        </Route>

        {/* Qualquer rota desconhecida */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}
