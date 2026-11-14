# Sistema de Gerenciamento de Bolsas (WEB)

<p align="center">
    <img alt = "License" src="https://img.shields.io/github/license/SGB-PGCOMP-UFBA/sgb-frontend">
    <img alt = "Languages" src="https://img.shields.io/github/languages/count/SGB-PGCOMP-UFBA/sgb-frontend">
    <img alt = "Size" src="https://img.shields.io/github/repo-size/SGB-PGCOMP-UFBA/sgb-frontend">
    <img alt = "Commit" src="https://img.shields.io/github/last-commit/SGB-PGCOMP-UFBA/sgb-frontend">
    <img alt = "Issues" src="https://img.shields.io/github/issues/SGB-PGCOMP-UFBA/sgb-frontend">
</p>

### Tecnologias utilizadas

-   ⚛️ React 18.
-   ⛑ Javascript.
-   💅 TailwindCSS 3.
-   📏 ESLint — Encontre e corrija problemas em seu código.
-   💖 Prettier — Formatador de código para estilo consistente.
-   ⚙️ EditorConfig - Manter estilos de codificação consistentes entre editores e IDEs.

### Instruções de instalação

```bash
# Você precisa ter node em sua máquina para executar o projeto
$ node -v

# Clone este repositório na sua máquina:
$ git clone https://github.com/SGB-PGCOMP-UFBA/sgb-frontend.git

# Abra a pasta do projeto
$ cd /sgb-frontend

# Execute o npm install para instalar as dependências
$ npm install

# Inicie o projeto
$ npm run start

# A página será aberta no seu navegador principal em http://localhost:3000.
```

#### Requerimentos

-   Node.js 22.x
-   NPM 10.x

#### Estrutura dos diretórios

-   `.github` — Manter workflows de integração com o github.
-   `.vscode` — Manter estilos de codificação consistentes.
-   `public` — Aquivos estáticos, como imagens e favicon.
-   `src` — Código-fonte do aplicativo, incluindo páginas, componentes, estilos.
-   `src/services` — Chamadas HTTP, um domínio da API por pasta.
-   `src/lib` — Clientes e configuração de terceiros (instância do axios, headers).
-   `src/types` — Tipos de domínio da API, espelhando os mappers do `sgb-backend`.

As convenções de nome de arquivo, anatomia de pasta e dependência entre camadas
estão em [`CONVENTIONS.md`](./CONVENTIONS.md).

#### Scripts

-   `npm run dev` — Inicia o aplicativo no modo de desenvolvimento em http://localhost:3000.
-   `npm run start` — Apelido para `npm run dev`.
-   `npm run build` — Cria uma compilação de produção otimizada do seu aplicativo em `build/`.
-   `npm run preview` — Serve localmente o resultado do `npm run build`.
-   `npm run check-types` — Roda o TypeScript (`tsc --noEmit`) sem gerar arquivos.
-   `npm run lint` — Executa o ESLint em todo o projeto.
-   `npm run lint:fix` — Executa o ESLint corrigindo o que for auto-corrigível.
-   `npm test` — Executa a suíte de testes com Jest.
-   `npm run test:e2e` — Executa os testes e2e com Playwright (ver abaixo).
-   `npm run check-types:e2e` — Roda o TypeScript nos testes e2e.
-   `npm run start:prod` — Inicia o aplicativo no modo de produção a partir do build gerado com o `npm run build`.

#### Testes e2e (Playwright)

Os cenários ficam em `e2e/specs/` e cobrem os quatro perfis (administrador,
orientador com privilégio de admin, orientador e estudante): acesso e
permissões, bolsas, agências, alocações, usuários, dashboard, quadrienal,
cadastro público, recuperação de senha e notificações.

Eles rodam no GitHub Actions a cada PR (`.github/workflows/e2e.yml`). O job
sobe Postgres, Mailpit, a API (`sgb-backend`, na branch de mesmo nome ou na
`main`) e o front dentro do próprio runner. Não existe ambiente de teste
hospedado, e o e2e **nunca** fala com produção:

- `e2e/fixtures/environment.ts` interrompe a suíte se a API, o front ou o
  Mailpit não forem `localhost`.
- No back, a API em `NODE_ENV=test` só sobe com banco e SMTP locais, e o seed
  só roda num banco local cujo nome termine em `_e2e`.
- O workflow não usa nenhum segredo.

Para rodar na sua máquina, prepare o back (README do `sgb-backend`, seção
"Ambiente de testes e2e") e depois:

```bash
# no sgb-backend: banco e Mailpit, migrations + seed e API em http://localhost:3334
docker compose --profile e2e up -d
npm run e2e:prepare
npm run e2e:start

# no sgb-frontend
npx playwright install chromium
npm run test:e2e
```

Os cenários alteram dados (marcam notificações, trocam senha, excluem
registros), então rode `npm run e2e:prepare` no back antes de cada execução. O
`/login` aceita 5 tentativas por conta a cada 15 minutos: o `auth.setup.ts`
reaproveita a sessão salva enquanto o token vale, e reiniciar a API zera os
contadores. Quando um cenário falha, o relatório com trace, vídeo e screenshot
fica em `playwright-report/` (no CI, como artefato do job).

Para criar um cenário, use as sessões salvas
(`test.use({ storageState: storageStatePath('admin') })`), seletores acessíveis
e nomes únicos para os dados que o teste cria. Os usuários do seed estão em
`e2e/fixtures/users.ts`, espelhando o seed do back.

#### TypeScript

O projeto está em migração incremental para TypeScript: arquivos `.js`/`.jsx` e
`.ts`/`.tsx` convivem (`allowJs: true`). Arquivos JS legados ficam fora do
type-check (`checkJs: false`) e passam a ser verificados assim que forem
convertidos. A camada `src/services` e os tipos em `src/types` já estão convertidos.

Variáveis de ambiente seguem o padrão do Vite: precisam do prefixo `VITE_` e são
lidas via `import.meta.env`, não `process.env`.
