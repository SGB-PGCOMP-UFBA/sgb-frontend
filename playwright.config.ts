import { defineConfig, devices } from '@playwright/test'
import { API_URL, WEB_URL } from './e2e/fixtures/environment'

const isCI = Boolean(process.env.CI)
const webPort = new URL(WEB_URL).port

export default defineConfig({
  testDir: './e2e',
  // Os cenários compartilham o mesmo seed; em série a ordem dos dados é previsível.
  fullyParallel: false,
  workers: 1,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  timeout: 30_000,
  expect: { timeout: 10_000 },
  reporter: isCI ? [['list'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL: WEB_URL,
    locale: 'pt-BR',
    timezoneId: 'America/Bahia',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: [
    { name: 'setup', testMatch: /auth\.setup\.ts/ },
    {
      name: 'chromium',
      testMatch: /specs\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup']
    }
  ],
  webServer: {
    command: `npx vite --port ${webPort} --strictPort --open false`,
    url: WEB_URL,
    reuseExistingServer: !isCI,
    timeout: 60_000,
    env: { VITE_BASE_URL_API: API_URL }
  }
})
