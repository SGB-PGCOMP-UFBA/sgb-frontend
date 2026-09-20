# Convenções de código — SGB Front-end

Documento curto e normativo. A regra vale para código novo e para qualquer
arquivo tocado num PR. Em caso de dúvida entre "seguir a convenção" e "seguir o
que o arquivo vizinho faz", a convenção ganha.

## 1. Nomes de arquivo

Sempre `kebab-case` com sufixo que declara o tipo:

```
<assunto>.<tipo>.<ts|tsx>
```

| Tipo                       | Sufixo          | Exemplo                       |
| -------------------------- | --------------- | ----------------------------- |
| Página (container)         | `.page.tsx`     | `login.page.tsx`              |
| View (apresentação)        | `.view.tsx`     | `login.view.tsx`              |
| Componente                 | `.tsx`          | `data-table.tsx`              |
| Hook                       | prefixo `use-`  | `use-mobile.ts`               |
| Service HTTP               | `.service.ts`   | `agency.service.ts`           |
| Tipo / contrato            | `.type.ts`      | `data-table.type.ts`          |
| Constante                  | `.constant.ts`  | `status.constant.ts`          |
| Helper compartilhado       | `.helper.ts`    | `formatters.helper.ts`        |
| Função utilitária local    | `.util.ts`      | `export-csv.util.ts`          |
| Mock de teste              | `.mock.ts`      | `file.mock.ts`                |
| Teste                      | `.test.ts(x)`   | `formatters.helper.test.ts`   |
| CSS de um componente       | `.css`          | `loading.css`                 |

O hook é a única exceção sem sufixo: o prefixo `use-` já declara o tipo, e
`use-mobile.hook.ts` só adiciona ruído.

Proibido: `PascalCase.tsx`, `camelCase.tsx`, sufixo no plural (`.types.ts`,
`.utils.ts`), pasta ou arquivo com `__underscore__`, nome genérico
(`styles.css`, `helpers.ts`, `index.tsx` com implementação).

Exceções deliberadas, por serem referenciadas de fora do TypeScript:
`src/index.tsx` e `src/index.css` (entrada, citados no `index.html`),
`src/vite-env.d.ts`, `src/lib/utils.ts` (alias `utils` do `components.json`) e
todo `src/components/ui/` — esses são gerados pela CLI do shadcn, que sobrescreve
o arquivo no nome dela; não renomeie.

## 2. `index.ts` é só barrel

`index.ts` existe para reexportar, nunca para implementar:

```ts
✓ // src/components/sidebar/index.ts
  export * from './sidebar'
  export { default } from './sidebar'

✗ // src/components/sidebar/index.tsx com 200 linhas de JSX
```

Motivo: uma pilha de `index.tsx` abertos no editor é indistinguível, e o
`git log` de um arquivo chamado `index` não conta nada.

## 3. Pastas

### 3.1 Pastas de camada, no plural

`components/`, `pages/`, `services/`, `hooks/`, `helpers/`, `constants/`,
`types/`, `routes/`, `tests/` e `lib/`. São fixas: existem independentemente da
quantidade de arquivos dentro e não se criam novas camadas sem discussão.

Não crie uma segunda pasta de utilitários. Função pura compartilhada vai em
`helpers/`; cliente ou configuração de biblioteca de terceiro vai em `lib/`.

### 3.2 Anatomia de um componente compartilhado

Todo componente de `src/components/` mora numa pasta própria com barrel:

```
components/<componente>/
  <componente>.tsx
  <componente>.view.tsx      # só quando há par container/apresentação
  <componente>.type.ts       # só quando o tipo é consumido de fora
  <componente>.css           # só quando há CSS próprio
  index.ts
```

Assim o import de fora é `@/components/data-table`, e mover arquivo dentro da
pasta não toca em import nenhum.

### 3.3 Anatomia de uma página

```
pages/<pagina>/
  <pagina>.page.tsx
  <pagina>.view.tsx
  index.ts
  components/                # componentes locais da página
    <componente>.tsx
```

### 3.4 Componente local de página não ganha pasta

Enquanto é um arquivo só, ele fica solto em `components/` da página:

```
✗ pages/gerenciamento-agencias/components/dialog-edicao-agencia/dialog-edicao-agencia.tsx
✓ pages/gerenciamento-agencias/components/dialog-edicao-agencia.tsx
```

Ganha pasta quando aparece um satélite — view, CSS ou subcomponente. Aí segue a
anatomia de 3.2, como os cards do dashboard:

```
pages/dashboard-metricas/components/cards/card-bolsas-capes/
  card-bolsas-capes.tsx
  card-bolsas-capes.view.tsx
  index.ts
```

### 3.5 Anatomia de um service

Um domínio da API por pasta:

```
services/
  index.ts                   # agrega tudo no objeto `api`
  <dominio>/
    <dominio>.service.ts
    index.ts
```

### 3.6 Teste mora ao lado do que testa

`formatters.helper.ts` e `formatters.helper.test.ts` na mesma pasta, nunca numa
pasta `__tests__`. Só a infraestrutura de teste (setup do Jest, mocks de
asset) vive em `src/tests/`.

## 4. Container e view

O par existe para separar decisão de renderização:

- `.page.tsx` / `<componente>.tsx` — estado, efeitos, chamadas de service,
  handlers, tratamento de erro. Não tem JSX de layout além de montar a view.
- `.view.tsx` — recebe tudo por props. Sem `useEffect` de dados, sem
  `import ... from '@/services'`, sem `toast` de erro de rede.

Se a view precisa de um dado novo, ele entra como prop; não se busca o dado
dentro dela.

## 5. Imports

- **Entre pastas diferentes: sempre o alias `@/`.** Nunca `../`.
- **Mesma pasta ou uma subpasta dela: `./`.**

```ts
✓ import { api } from '@/services'
✓ import { LoginView } from './login.view'
✓ import { DataGridAgencias } from './components/data-grid-agencias'
✗ import { api } from '../../services'
```

Motivo: `../` quebra a cada arquivo movido. Com `@/`, mover um arquivo dentro da
própria pasta não toca em import nenhum.

## 6. Dependências entre camadas

A direção é sempre uma só:

```
page (container)  ->  service  ->  lib/api  ->  backend
        |
        +->  view  ->  components
```

Regras:

1. **View não chama service.** Ela recebe dado e callback por prop.
2. **Componente de `src/components/` não importa de `@/pages`.** Se precisa de
   algo de uma página, o dado vem por prop ou o componente não é compartilhado.
3. **Componente local de uma página não importa de outra página.** O que é
   comum às duas sobe para `src/components/`.
4. **Só service fala com `@/lib/api`.** Página, view e componente nunca montam
   URL nem usam `axios` direto — sempre `api.<dominio>.<funcao>()`.
5. **Service não importa componente nem hook.** Ele é código de transporte.
6. Payload e resposta específicos de um endpoint moram no próprio
   `.service.ts`; tipo de domínio compartilhado com o backend fica em
   `src/types/`.

## 7. Comentários

Código bom não precisa de narração. Não comente o que o nome já diz:

```ts
✗ /** Busca as agências. */
  export const getAgencys = async () => ...

✗ // Estado do dialog
  const [open, setOpen] = useState(false)
```

Comente só o que o código não consegue contar — e aí explique o **porquê**, não
o quê:

```ts
✓ /**
   * O index signature é exigido pelo `AxiosRequestHeaders` do axios 0.27,
   * que é um `Record<string, string>`.
   */
```

O teste prático: se alguém pode ler o comentário e "corrigir" o código de volta
para o jeito errado sem ele, o comentário se paga. Caso contrário, apague. Um
nome melhor vale mais que um comentário.

## 8. Onde as coisas vão

| Escopo                                | Lugar                                       |
| ------------------------------------- | ------------------------------------------- |
| Usado por uma página só               | dentro da pasta da página                   |
| UI usada por duas ou mais páginas     | `src/components/`                           |
| Função pura usada por duas ou mais    | `src/helpers/`                              |
| Chamada HTTP                          | `src/services/<dominio>/`                   |
| Cliente ou config de terceiro         | `src/lib/`                                  |
| Tipo de domínio espelhando o backend  | `src/types/`                                |
| Rótulo, enum de exibição, opção fixa  | `src/constants/`                            |
| Setup e mock de teste                 | `src/tests/`                                |

## 9. Dívidas conhecidas

Corrija ao tocar no arquivo; não abra PR só para isso.

- Cinco páginas carregam o prefixo `page-`, redundante com o sufixo
  `.page.tsx` (`page-not-found.page.tsx`). Ao mexer nelas, renomeie o assunto
  para `not-found`, `register`, `register-advisor`, `about-system` e
  `forget-password` — pasta, arquivos e o símbolo exportado.
- Existem três `custom-scrollbar.css` idênticos (em `area-do-estudante`,
  `gerenciamento-bolsistas` e `relatorio-quadrienal`). Devem virar um
  utilitário único em `src/index.css`. O de `area-do-estudante` não é importado
  por ninguém.
- `components/student-profile-view/` é um componente, não a metade `.view` de
  um par; o nome engana.
