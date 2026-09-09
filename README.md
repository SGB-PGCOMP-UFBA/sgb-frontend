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

-   Node.js >= 22
-   NPM >= 10

#### Estrutura dos diretórios

-   `.github` — Manter workflows de integração com o github.
-   `.vscode` — Manter estilos de codificação consistentes.
-   `public` — Aquivos estáticos, como imagens e favicon.
-   `src` — Código-fonte do aplicativo, incluindo páginas, componentes, estilos.
-   `src/types` — Tipos de domínio da API, espelhando os mappers do `sgb-backend`.

#### Scripts

-   `npm run dev` — Inicia o aplicativo no modo de desenvolvimento em http://localhost:3000.
-   `npm run start` — Apelido para `npm run dev`.
-   `npm run build` — Cria uma compilação de produção otimizada do seu aplicativo em `build/`.
-   `npm run preview` — Serve localmente o resultado do `npm run build`.
-   `npm run check-types` — Roda o TypeScript (`tsc --noEmit`) sem gerar arquivos.
-   `npm run lint` — Executa o ESLint em todo o projeto.
-   `npm run lint:fix` — Executa o ESLint corrigindo o que for auto-corrigível.
-   `npm test` — Executa a suíte de testes com Jest.
-   `npm run start:prod` — Inicia o aplicativo no modo de produção a partir do build gerado com o `npm run build`.

#### TypeScript

O projeto está em migração incremental para TypeScript: arquivos `.js`/`.jsx` e
`.ts`/`.tsx` convivem (`allowJs: true`). Arquivos JS legados ficam fora do
type-check (`checkJs: false`) e passam a ser verificados assim que forem
convertidos. A camada `src/api` e os tipos em `src/types` já estão convertidos.

Variáveis de ambiente seguem o padrão do Vite: precisam do prefixo `VITE_` e são
lidas via `import.meta.env`, não `process.env`.
