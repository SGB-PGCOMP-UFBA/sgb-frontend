import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import RequireAuth from './context/requireAuth'
import {
  PageForgetPassword,
  Login,
  LoggedUserProfile,
  LoggedUserSettings,
  PageNotFound,
  DashboardMetricas,
  GerenciamentoBolsas,
  GerenciamentoAgencias,
  GerenciamentoEstudantes,
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
        <Route path="/profile" element={<LoggedUserProfile />} />
        <Route path="/settings" element={<LoggedUserSettings />} />

        {/* Rotas de usuário administrador */}
        <Route element={<RequireAuth allowedRoles="ADMIN" />}>
          <Route path="dashboard" element={<DashboardMetricas />} />
          <Route path="bolsas" element={<GerenciamentoBolsas />} />
          <Route path="agencias" element={<GerenciamentoAgencias />} />
          <Route path="estudantes" element={<GerenciamentoEstudantes />} />
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
