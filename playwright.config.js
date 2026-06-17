// @ts-check
import { defineConfig, devices } from '@playwright/test';

module.exports = defineConfig({
  testDir: './tests', // se aplica somente aos testes simples (essa linha está perguntando onde estão meus testes)
  timeout: 60 * 1000, // tempo máximo que um teste pode levar para ser executado ("1000" é o número de milissegundos em um segundo, então "60 * 1000" é o número de milissegundos em um minuto, ou seja, cada teste pode levar no máximo 1 minuto para ser executado)
  /* Run tests in files in parallel */
  fullyParallel: true,      // se quero que execute os testes em paralelo ou não (essa linha está dizendo que sim, quero executar os testes em paralelo)
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,   // se estou rodando os testes em um ambiente de integração contínua (CI), quero que o processo falhe se eu tiver deixado um teste marcado como "only" (essa linha está dizendo que sim, quero que o processo falhe se eu tiver deixado um teste marcado como "only")
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,  // se estou rodando os testes em um ambiente de integração contínua (CI), quero que os testes sejam reexecutados até 2 vezes se falharem (essa linha está dizendo que sim, quero que os testes sejam reexecutados até 2 vezes se falharem)
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,  // se estou rodando os testes em um ambiente de integração contínua (CI), quero que os testes sejam executados em um único processo (essa linha está dizendo que sim, quero que os testes sejam executados em um único processo)
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [     // se quero que os resultados dos testes sejam exibidos em formato de lista no console (essa linha está dizendo que sim, quero que os resultados dos testes sejam exibidos em formato de lista no console)
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report'}]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {         // tem endereço base para onde os testes devem navegar, se os testes devem ser executados em modo headless ou não, e quais artefatos devem ser coletados quando um teste falha (essa linha está dizendo que sim, quero que os testes sejam executados em modo headless, e quero que os artefatos sejam coletados quando um teste falha)
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'http://blazedemo.com',  // se quero que os testes naveguem para o endereço "http://blazedemo.com" quando usarem a função "page.goto('')" (essa linha está dizendo que sim, quero que os testes naveguem para o endereço "http://blazedemo.com" quando usarem a função "page.goto('')")
    headless: process.env.HEADLESS !==  'false',  // se a variável de ambiente "HEADLESS" for definida como "false", quero que os testes sejam executados em modo não headless (essa linha está dizendo que sim, quero que os testes sejam executados em modo não headless se a variável de ambiente "HEADLESS" for definida como "false")
  

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',        // se um teste falhar e for reexecutado, quero que uma trilha de execução seja coletada para o teste (essa linha está dizendo que sim, quero que uma trilha de execução seja coletada para o teste se ele falhar e for reexecutado)
    screnenshot: 'only-on-failure', // se um teste falhar, quero que uma captura de tela seja coletada para o teste (essa linha está dizendo que sim, quero que uma captura de tela seja coletada para o teste se ele falhar)
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

