
# Cypress API Automation

API automation testing project using Cypress and TypeScript.

## Technologies

- Node.js
- npm
- Cypress
- TypeScript
- JSONPlaceholder REST API

## Prerequisites

- Install Node.js and npm.
- Install Git.

## Installation

Clone the repository:

```bash
git clone https://github.com/Tung-Dylan/Cypress-API-Automation.git
cd Cypress-API-Automation
```

Install dependencies:

```bash
npm install
```

## Configuration

The project uses JSONPlaceholder as the default API base URL.

Create a `.env` file in the project root:

```dotenv
CYPRESS_BASE_URL=https://jsonplaceholder.typicode.com
```

## Run Tests

Run TypeScript type checking:

```bash
npm run typecheck
```

Run API tests in headless mode:

```bash
npm test
```

Open the Cypress interactive runner:

```bash
npm run test:open
```

## Test Scenarios

| Test Case | Description |
|---|---|
| TC01 | Retrieve post with ID 1 |
| TC02 | Retrieve another existing post |
| TC03 | Verify 404 response for a nonexistent post |
| TC04 | Create a post |
| TC05 | Create a second post |

## Project Structure

```text
cypress/
├── e2e/
│   └── posts.cy.ts
├── fixtures/
│   └── posts/
│       ├── new-post.json
│       └── post.json
├── support/
│   ├── api-client.ts
│   ├── commands.ts
│   └── e2e.ts
└── types/
    └── post.types.ts
```

## Notes

JSONPlaceholder simulates post creation. Created posts are not
persisted as permanent server-side data.

Environment variables and installed dependencies are excluded
from Git using `.gitignore`.
