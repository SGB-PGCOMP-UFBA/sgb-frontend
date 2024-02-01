import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import RequireAuth from './context/requireAuth'
import {
  AdminLista,
  AdminBolsasExpiradas,
  AdminRelatorios,
  PageForgetPassword,
  Login,
  PageNotFound,
  DashboardMetricas,
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
          <Route path="admin/dashboard" element={<DashboardMetricas />} />
          <Route path="admin/bolsas-ativas" element={<AdminLista />} />
          <Route path="admin/bolsas-expiradas" element={<AdminBolsasExpiradas />} />
          <Route path="admin/relatorios" element={<AdminRelatorios />} />
          <Route path="admin/agencias" element={<GerenciamentoAgencias />} />
          <Route path="admin/estudantes" element={<GerenciamentoEstudantes />} />
          <Route path="admin/orientadores" element={<GerenciamentoOrientadores />} />
        </Route>

        {/* Qualquer rota */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}
