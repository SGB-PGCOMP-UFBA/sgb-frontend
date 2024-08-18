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
-   🗂 Path Mapping — Importar componentes ou imagens pelo caminho absoluto.

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

-   Node.js >= 18.20.4
-   NPM >= 10.7.0

#### Estrutura dos diretórios

-   `.github` — Manter workflows de integração com o github.
-   `.vscode` — Manter estilos de codificação consistentes.
-   `public` — Aquivos estáticos, como imagens e favicon.
-   `src` — Código-fonte do aplicativo, incluindo páginas, componentes, estilos.

#### Scripts

-   `npm run start` — Inicia o aplicativo no modo de desenvolvimento em http://localhost:3000.
-   `npm run build` — Cria uma compilação de produção otimizada do seu aplicativo.
-   `npm run eject` — Remove a dependência build do projeto.
-   `npm run lint` — Executa o ESLint para todos os arquivos no diretório src.
-   `npm run lint:fix` — Executa o ESLint e corrige erros de formatação para todos os arquivos no diretório src.
-   `npm run start:prod` — Inicia o aplicativo no modo de produção a partir do build gerado coom o `npm run build`.
