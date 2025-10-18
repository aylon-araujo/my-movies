# MY-MOVIES: Movie Catalog

> 🇧🇷 [Leia em Português](./README.pt-BR.md)

[](https://nodejs.org/)
[](https://reactjs.org/)
[](https://www.typescriptlang.org/)
[](https://vitejs.dev/)

## About the Project

This project is an interactive movie catalog (inspired by platforms like TMDb), built with a modern and scalable frontend architecture.

The main goal is to demonstrate the capabilities of React combined with a feature-based architecture, ensuring easy maintenance, testability, and low coupling between modules.

### Features

* **Real-Time Search:** Movie search with URL synchronization.
* **Dynamic Listing:** Display of movies in an efficient grid layout.
* **Movie Details:** Navigation to a dedicated movie detail page.
* **Persistent Favorites System:** Add and remove favorite movies, managed via Context API.

## Architecture and Folder Structure

The project follows a **Feature-Based Architecture**, applying **Clean Architecture** principles to separate code by responsibility and business domain.

| Folder          | Responsibility     | Description                                                                                                    |
| :-------------- | :----------------- | :------------------------------------------------------------------------------------------------------------- |
| `src/app/`      | **Composition**    | Global configuration: `App.tsx`, `main.tsx`, routes, providers, and global styles.                             |
| `src/domain/`   | **Pure Domain**    | Definition of core entities and data types (e.g., `Movie.ts`). It does not depend on frameworks or APIs.       |
| `src/features/` | **Features**       | Isolated business domains (e.g., `movies`, `favorites`). Each feature has its own UI, hooks, and services.     |
| `src/shared/`   | **Infrastructure** | Reusable components (e.g., `Button`, `If`), hooks (e.g., `useDebounce`), and generic services (`http client`). |
| `src/tests/`    | **Tests**          | Test configuration files (e.g., `setupTests.ts`).                                                              |

## Technologies Used

* **Frontend:** React (Hooks and Context API)
* **Language:** TypeScript
* **Tooling:** Vite
* **Routing:** React Router DOM
* **Styling:** CSS Modules (default)
* **Unit Testing:** Jest / React Testing Library
* **Code Quality:** ESLint

## How to Run the Project

Follow the steps below to get a local copy of the project up and running.

### Prerequisites

* Node.js (version 18+)
* Yarn or npm

### 1. Installation

Clone the repository and navigate to the project folder:

```bash
git clone https://github.com/aylon-araujo/my-movies.git
cd my-movies
```

Install the dependencies:

```bash
yarn install
# or
npm install
```

### 2. Environment Variables Configuration

Create a `.env` file at the root of the project with the required API keys (example for a movie project):

```
# .env
VITE_MOVIE_API_KEY="YOUR_API_KEY_HERE"
VITE_MOVIE_API_ENDPOINT="https://api.themoviedb.org/3"
```

### 3. Run the Project

Start the development server:

```bash
yarn dev
# or
npm run dev
```

The application will be available at `http://localhost:5173/` (or the port indicated by Vite).

### 4. Production Build

To generate the final build:

```bash
yarn build
# or
npm run build
```

The optimized static files will be created in the `dist/` folder.

## Tests and Code Quality

### Unit Tests

To run the tests:

```bash
yarn test
# or
npm run test
```

### Automatic Lint Fix

The project uses ESLint with custom import sorting rules to ensure architectural consistency.

To automatically fix lint and formatting issues (including import order):

```bash
yarn lint:fix
# or
npm run lint:fix
```

-----

## Author

* **[Aylon Araújo / @aylon-araujo]** - [linkedin.com/in/aylon-araujo]

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
