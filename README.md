# Google-AI-Engineer

## Environment

The application expects a PostgreSQL database and the following environment variables:

- `DB_HOST` – database host
- `DB_USER` – database user
- `DB_PASSWORD` – database password
- `DB_NAME` – optional database name (defaults to `app`)

## Usage

Install dependencies and start the server:

```bash
npm install
npm start
```

Endpoints are available at `/invoices` and `/expenses` for CRUD operations.
