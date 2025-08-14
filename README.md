## Operations Frontend

Its a Vue 3 SPA, that performs mathematical operations for authenticated users, tracks usage as records, and manages user balance.

### Tech stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vite** for dev/build
- **Tailwind CSS** for styling
- **Shadcn Vue / Radix** components (customized)
- **Vue Router** for routing
- **Axios** via a small repository layer
- **Pinia** for Auth managemement

### Getting started

1. Requirements

   - Node.js 22 (LTS recommended)
   - Yarn Classic (1.x)

2. Install

```bash
yarn
```

3. Run dev server

```bash
yarn dev
```

Open `http://localhost:5173`.

4. Build and preview

```bash
yarn build
yarn preview
```

### Configuration

- API base URL is configured in `src/lib/api-client.js`.

### Architecture (brief)

- `src/components` UI components (Tailwind + shadcn/radix). Prefer small, focused components.
- `src/views` feature pages (operations management flows) composed from UI components.
- `src/repositories` data access layer (Axios-based):
  - `auth-repository` → login, logout, user authentication
  - `operations-repository` → mathematical operations, records management
  - `user-repository` → user profile, balance management
- `src/stores` Pinia stores for global state (e.g., auth, user balance).
- `src/router` central route definitions.
- `src/lib` utilities and the Axios client.

### Conventions

- Composition API everywhere, no Options API.
- Use composables for reusable logic; helpers for pure functions.
- Keep components small and declarative; prefer slots/props.
- Formatting via ESLint + Prettier.
