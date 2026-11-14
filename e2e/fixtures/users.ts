import type { UserRole } from '@/types'

/**
 * Espelho de `E2E_USERS` em `sgb-backend/src/common/database/seeds/e2e-seed.util.ts`.
 * A senha só existe no banco descartável do e2e.
 */
export const E2E_PASSWORD = 'E2e@Sgb1'

export interface E2eUser {
  name: string
  email: string
  /** Perfil escolhido na tela de login. */
  loginRole: 'ADMIN' | 'ADVISOR' | 'STUDENT'
  /** Perfil que a API devolve depois do login. */
  role: UserRole
}

export const USERS = {
  admin: {
    name: 'Admin E2E',
    email: 'admin.e2e@sgb.test',
    loginRole: 'ADMIN',
    role: 'ADMIN'
  },
  advisorAdmin: {
    name: 'Orientadora Admin E2E',
    email: 'orientador.admin.e2e@sgb.test',
    loginRole: 'ADMIN',
    role: 'ADVISOR_WITH_ADMIN_PRIVILEGES'
  },
  advisor: {
    name: 'Orientador E2E',
    email: 'orientador.e2e@sgb.test',
    loginRole: 'ADVISOR',
    role: 'ADVISOR'
  },
  otherAdvisor: {
    name: 'Outro Orientador E2E',
    email: 'orientador2.e2e@sgb.test',
    loginRole: 'ADVISOR',
    role: 'ADVISOR'
  },
  student: {
    name: 'Estudante E2E',
    email: 'estudante.e2e@sgb.test',
    loginRole: 'STUDENT',
    role: 'STUDENT'
  },
  otherStudent: {
    name: 'Outra Estudante E2E',
    email: 'estudante2.e2e@sgb.test',
    loginRole: 'STUDENT',
    role: 'STUDENT'
  },
  wrongPassword: {
    name: 'Login Bloqueio E2E',
    email: 'login.bloqueio.e2e@sgb.test',
    loginRole: 'ADVISOR',
    role: 'ADVISOR'
  },
  unlinked: {
    name: 'Sem Vinculo E2E',
    email: 'sem.vinculo.e2e@sgb.test',
    loginRole: 'ADVISOR',
    role: 'ADVISOR'
  }
} as const satisfies Record<string, E2eUser>

export type E2eUserKey = keyof typeof USERS

/** Perfis com sessão salva pelo `auth.setup.ts`. */
export const SESSION_USERS = ['admin', 'advisorAdmin', 'advisor', 'student'] as const
export type SessionUserKey = (typeof SESSION_USERS)[number]

export function storageStatePath(user: SessionUserKey): string {
  return `e2e/.auth/${user}.json`
}
