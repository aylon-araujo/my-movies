# MY-MOVIES: Catálogo de Filmes

[](https://nodejs.org/)
[](https://reactjs.org/)
[](https://www.typescriptlang.org/)
[](https://vitejs.dev/)

## Sobre o Projeto

Este projeto é um catálogo interativo de filmes (inspirado em plataformas como TMDb), construído com uma arquitetura moderna e escalável no frontend.

O objetivo principal é demonstrar as capacidades do React em conjunto com uma arquitetura baseada em features, garantindo fácil manutenção, testabilidade e baixo acoplamento entre os módulos.

### Funcionalidades

  * **Busca em Tempo Real:** Pesquisa de filmes com sincronização de URL.
  * **Listagem Dinâmica:** Visualização de filmes em um grid eficiente.
  * **Detalhes do Filme:** Navegação para uma tela de detalhes específica.
  * **Sistema de Favoritos (Persistente):** Adição e remoção de filmes favoritos, gerenciados via Context API.

## Arquitetura e Estrutura de Pastas

O projeto adota uma **Arquitetura Baseada em Features** (*Feature-Based Structure*), seguindo princípios da **Clean Architecture** (Arquitetura Limpa), para separar o código por responsabilidade e domínio de negócio.

| Pasta | Responsabilidade | Descrição |
| :--- | :--- | :--- |
| `src/app/` | **Composição** | Configuração global: `App.tsx`, `main.tsx`, `routes`, `providers` e estilos globais. |
| `src/domain/` | **Domínio Puro** | Definição das entidades e tipos de dados centrais (ex: `Movie.ts`). Não depende de frameworks ou API. |
| `src/features/` | **Funcionalidades** | Domínios de negócio isolados (ex: `movies`, `favorites`). Cada feature tem sua própria UI, hooks e serviços. |
| `src/shared/` | **Infraestrutura** | Componentes (ex: `Button`, `If`), hooks (ex: `useDebounce`), e serviços genéricos (`http client`). |
| `src/tests/` | **Testes** | Arquivos de configuração de testes (ex: `setupTests.ts`). |

## Tecnologias Utilizadas

  * **Frontend:** React (Hooks e Context API)
  * **Linguagem:** TypeScript
  * **Tooling:** Vite
  * **Roteamento:** React Router DOM
  * **Estilização:** CSS Modules (Padrão)
  * **Testes Unitários:** Jest/React Testing Library
  * **Qualidade de Código:** ESLint

## Como Executar o Projeto

Siga os passos abaixo para ter uma cópia local do projeto rodando em sua máquina.

### Pré-requisitos

  * Node.js (versão 18+)
  * Yarn ou npm

### 1\. Instalação

Clone o repositório e navegue até a pasta do projeto:

```bash
git clone [URL_DO_SEU_REPO] my-movies
cd my-movies
```

Instale as dependências:

```bash
yarn install
# ou
npm install
```

### 2\. Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as chaves de API necessárias (exemplo para um projeto de filmes):

```
# .env
VITE_MOVIE_API_KEY="SUA_CHAVE_DE_API_AQUI"
VITE_MOVIE_API_ENDPOINT="https://api.themoviedb.org/3"
```

### 3\. Execução

Rode o projeto em modo desenvolvimento:

```bash
yarn dev
# ou
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173/` (ou a porta que o Vite indicar).

### 4\. Build de Produção

Para gerar o *build* final:

```bash
yarn build
# ou
npm run build
```

Os arquivos estáticos otimizados serão criados na pasta `dist/`.

## 🧪 Testes e Qualidade de Código

### Testes Unitários

Para executar os testes:

```bash
yarn test
# ou
npm run test
```

### Correção Automática (Lint)

O projeto utiliza ESLint com regras de ordenação de *imports* customizadas para garantir consistência arquitetural.

Para corrigir automaticamente os erros de lint e formatação (incluindo a ordem dos *imports*):

```bash
yarn lint:fix
# ou
npm run lint:fix
```

-----

## Autor

  * **[Aylon Araújo / @aylon-araujo]** - [linkedin.com/in/aylon-araujo]

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.