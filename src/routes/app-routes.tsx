import { Navigate, Routes, Route, useParams } from 'react-router-dom'
import RequireAuth from '@/components/require-auth'
import {
  PageForgetPassword,
  Login,
  LoggedUserSettings,
  PageNotFound,
  PageRegister,
  PageRegisterAdvisor,
  DashboardMetricas,
  GerenciamentoBolsas,
  GerenciamentoAgencias,
  GerenciamentoAlocacoes,
  GerenciamentoOrientandos,
  GerenciamentoOrientadores,
  GerenciamentoUsuarios,
  DetalhesUsuario,
  DetalhesBolsa,
  CadastroUsuario,
  AreaDoEstudante,
  PageAboutSystem,
  RelatorioQuadrienal
} from '@/pages'

/** Links antigos de /bolsistas/:id continuam abrindo a bolsa. */
function RedirectBolsista() {
  const { id } = useParams()
  return <Navigate to={`/bolsas/${id}`} replace />
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/sobre" element={<PageAboutSystem />} />
      <Route path="/cadastro-estudante" element={<PageRegister />} />
      <Route path="/cadastro-orientador" element={<PageRegisterAdvisor />} />
      <Route path="/esqueci-a-senha" element={<PageForgetPassword />} />
      <Route path="/configuracoes" element={<LoggedUserSettings />} />

      {/* Rotas de usuário administrador */}
      <Route element={<RequireAuth allowedRoles={["ADMIN", "ADVISOR_WITH_ADMIN_PRIVILEGES"]} />}>
        <Route path="dashboard" element={<DashboardMetricas />} />
        <Route path="bolsas" element={<GerenciamentoBolsas />} />
        <Route path="bolsas/:id" element={<DetalhesBolsa />} />
        <Route path="bolsistas" element={<Navigate to="/bolsas" replace />} />
        <Route path="bolsistas/:id" element={<RedirectBolsista />} />
        <Route path="quadrienal" element={<RelatorioQuadrienal />} />
        <Route path="agencias" element={<GerenciamentoAgencias />} />
        <Route path="alocacoes" element={<GerenciamentoAlocacoes />} />
        <Route path="orientadores" element={<GerenciamentoOrientadores />} />
        <Route path="usuarios" element={<GerenciamentoUsuarios />} />
        <Route path="usuarios/novo" element={<CadastroUsuario />} />
        <Route path="usuarios/:id" element={<DetalhesUsuario />} />
      </Route>

      {/* Rotas de usuário orientador */}
      <Route element={<RequireAuth allowedRoles={["ADVISOR"]} />}>
        <Route path="orientandos" element={<GerenciamentoOrientandos />} />
      </Route>

      {/* Rotas de usuário estudante */}
      <Route element={<RequireAuth allowedRoles={["STUDENT"]} />}>
        <Route path="area-do-estudante" element={<AreaDoEstudante />} />
      </Route>

      {/* Qualquer rota desconhecida */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}
