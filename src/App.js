import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import RequireAuth from './hooks/requireAuth'
import {
  PageForgetPassword,
  Login,
  LoggedUserSettings,
  PageNotFound,
  DashboardMetricas,
  GerenciamentoBolsistas,
  GerenciamentoAgencias,
  GerenciamentoOrientandos,
  GerenciamentoOrientadores
} from './pages'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/esqueci-a-senha" element={<PageForgetPassword />} />
        <Route path="/settings" element={<LoggedUserSettings />} />

        {/* Rotas de usuário administrador */}
        <Route element={<RequireAuth allowedRoles="ADMIN" />}>
          <Route path="dashboard" element={<DashboardMetricas />} />
          <Route path="bolsistas" element={<GerenciamentoBolsistas />} />
          <Route path="agencias" element={<GerenciamentoAgencias />} />
          <Route path="orientadores" element={<GerenciamentoOrientadores />} />
        </Route>

        {/* Rotas de usuário orientador */}
        <Route element={<RequireAuth allowedRoles="ADVISOR" />}>
          <Route path="orientandos" element={<GerenciamentoOrientandos />} />
        </Route>

        {/* Qualquer rota desconhecida */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}
