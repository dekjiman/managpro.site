# Kan

Open-source project management tool. A self-hostable Trello alternative.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: tRPC, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Auth**: Better Auth
- **Internationalization**: Lingui
- **Monorepo**: pnpm workspaces with Turborepo

## Project Structure

```
kan/
├── apps/
│   └── web/              # Next.js web application
├── packages/
│   ├── api/              # tRPC API routers
│   ├── auth/             # Authentication (Better Auth)
│   ├── db/               # Database schema, migrations, repositories
│   ├── email/            # Email templates and sending
│   ├── shared/           # Shared utilities and constants
│   └── stripe/           # Stripe billing integration
├── docker-compose.yml    # Docker deployment
└── turbo.json            # Turborepo config
```

## Getting Started

### Prerequisites

- Node.js >= 20.18.1
- pnpm >= 9.14.2
- PostgreSQL (or use the included Docker setup)

### Installation

```bash
# Clone the repo
git clone <repo-url> && cd kan

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values

# Run database migrations
pnpm db:migrate

# Start the dev server
pnpm dev
```

The app will be available at `http://localhost:3000`.

### Docker Deployment

```bash
# Copy and edit environment variables
cp .env.example .env

# Start all services (web, db, migrations)
docker compose up -d
```

## Available Scripts

| Command               | Description                      |
| --------------------- | -------------------------------- |
| `pnpm dev`            | Start all dev servers            |
| `pnpm build`          | Build all packages               |
| `pnpm lint`           | Run ESLint across the monorepo   |
| `pnpm lint:fix`       | Fix lint errors                  |
| `pnpm typecheck`      | Run TypeScript type checking     |
| `pnpm format:fix`     | Format code with Prettier        |
| `pnpm db:migrate`     | Run database migrations          |
| `pnpm db:push`        | Push schema changes directly     |
| `pnpm db:studio`      | Open Drizzle Studio              |
| `pnpm lingui:extract` | Extract i18n translation strings |

## Environment Variables

See `.env.example` for the full list. Key variables:

| Variable               | Required | Description                                                |
| ---------------------- | -------- | ---------------------------------------------------------- |
| `NEXT_PUBLIC_BASE_URL` | Yes      | App base URL (e.g. `https://managpro.site`)                |
| `BETTER_AUTH_SECRET`   | Yes      | Random 32+ char secret for auth                            |
| `POSTGRES_URL`         | No       | PostgreSQL connection string (uses embedded DB if omitted) |
| `SMTP_HOST`            | No       | SMTP server for emails                                     |
| `S3_*`                 | No       | S3-compatible storage for file uploads                     |
| `REDIS_URL`            | No       | Redis for rate limiting (falls back to in-memory)          |
| `STRIPE_SECRET_KEY`    | No       | Stripe for billing                                         |

### OAuth Providers

Configure any of: Google, Discord, GitHub, GitLab, Microsoft, Twitter, Apple, and many more. See `.env.example` for the full list.

## License

AGPL-3.0 - see [LICENSE](LICENSE)
