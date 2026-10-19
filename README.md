# Cypress API Automation

A REST API automation testing project built with **Cypress, TypeScript, and JSONPlaceholder**.

The project demonstrates API testing fundamentals, reusable API clients, custom Cypress commands, fixture-based test data management, TypeScript interfaces, and automated assertions.

## 1. Project Overview

This project automates API tests for the `/posts` resource provided by JSONPlaceholder.

The test suite covers:

- **GET requests:** Retrieve existing posts and verify the response for a nonexistent post.
- **POST requests:** Submit requests to create posts and validate the returned responses.
- **Status code validation:** Verify HTTP status codes using a custom Cypress command.
- **Response body validation:** Check returned fields and values.
- **Test data management:** Store test data in JSON fixtures.
- **Reusable API client:** Centralize API request logic.
- **TypeScript:** Define interfaces and enable static type checking.

**Note:** JSONPlaceholder is a fake REST API for testing and demonstration. POST requests return simulated responses; created resources are not permanently stored on the server.

## 2. Technologies Used

| Technology | Purpose |
|---|---|
| Cypress | API automation testing and test execution |
| TypeScript | Type safety and maintainable test code |
| Node.js | JavaScript runtime |
| npm | Dependency and script management |
| JSONPlaceholder | Demo REST API |
| dotenv | Load environment variables from `.env` |
| IntelliJ IDEA | Development environment |
| Git and GitHub | Version control and source code hosting |

## 3. Project Structure

```text
Cypress API Automation/
├── .env
├── .gitignore
├── README.md
├── cypress.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── cypress/
    ├── e2e/
    │   ├── posts-get.cy.ts
    │   └── posts-create.cy.ts
    ├── fixtures/
    │   └── posts/
    │       ├── post.json
    │       └── new-post.json
    ├── support/
    │   ├── api-client.ts
    │   ├── commands.ts
    │   └── e2e.ts
    └── types/
        └── post.types.ts
```

### Important files

- `cypress.config.ts`: Cypress configuration, test discovery, support file, and API base URL.
- `.env`: Environment-specific configuration, including `CYPRESS_BASE_URL`.
- `cypress/e2e/posts-get.cy.ts`: GET API test cases.
- `cypress/e2e/posts-create.cy.ts`: POST API test cases.
- `cypress/fixtures/posts/post.json`: Test data for GET requests.
- `cypress/fixtures/posts/new-post.json`: Test data for POST requests.
- `cypress/support/api-client.ts`: Reusable methods for sending API requests.
- `cypress/support/commands.ts`: Custom Cypress assertion command.
- `cypress/support/e2e.ts`: Loads custom commands.
- `cypress/types/post.types.ts`: TypeScript interfaces for test data.
- `package.json`: Project dependencies and npm scripts.
- `tsconfig.json`: TypeScript compiler configuration.

## 4. Prerequisites

Install the following before running the project:

- Node.js and npm
- Git, if you want to clone the repository
- IntelliJ IDEA or another compatible code editor
- An internet connection to access JSONPlaceholder

Verify your installation:

```bash
node -v
npm -v
git --version
```

## 5. Installation

### Step 1: Clone the repository

```bash
git clone https://github.com/Tung-Dylan/Cypress-API-Automation.git
```

### Step 2: Open the project directory

```bash
cd Cypress-API-Automation
```

If you already have the project open in IntelliJ IDEA, open the Terminal at the project root instead.

### Step 3: Install dependencies

```bash
npm install
```

### Step 4: Configure the environment

Create a `.env` file in the project root if it does not already exist.

Add the following configuration:

```dotenv
CYPRESS_BASE_URL=https://jsonplaceholder.typicode.com
```

The project configuration uses this value as the API base URL. It falls back to the same JSONPlaceholder URL if the environment variable is not set.

Do not commit `.env` if it contains private credentials or environment-specific secrets.

## 6. Test Cases

### GET API Tests

File: `cypress/e2e/posts-get.cy.ts`

| Test ID | Description | Expected status |
|---|---|---|
| TC01 | Retrieve post with ID 1 | 200 |
| TC02 | Retrieve another existing post | 200 |
| TC03 | Retrieve a nonexistent post | 404 |

### POST API Tests

File: `cypress/e2e/posts-create.cy.ts`

| Test ID | Description | Expected status |
|---|---|---|
| TC04 | Create a post using the first fixture dataset | 201 |
| TC05 | Create another post using the second fixture dataset | 201 |

The POST tests validate the returned status code and the response fields, including `id`, `title`, `body`, and `userId`.

## 7. Running Tests from the Terminal

Run all commands from the project root directory.

### 7.1. Run all tests

```bash
npm test
```

This executes all Cypress spec files matching the configured pattern:

```text
cypress/e2e/**/*.cy.ts
```

Both GET and POST test suites will run.

Expected result: **5 passing tests**, provided the API is reachable and the test code is correct.

### 7.2. Run only GET tests

```bash
npx cypress run --spec "cypress/e2e/posts-get.cy.ts"
```

This executes only the three GET test cases.

### 7.3. Run only POST tests

```bash
npx cypress run --spec "cypress/e2e/posts-create.cy.ts"
```

This executes only the two POST test cases.

### 7.4. Run TypeScript type checking

```bash
npm run typecheck
```

This checks TypeScript types without generating compiled JavaScript files.

A successful run should finish without TypeScript errors.

## 8. Running Tests with the Cypress Test Runner UI

Cypress provides an interactive graphical interface for selecting spec files, executing tests, and inspecting request and response details.

### Step 1: Open Cypress

Run:

```bash
npm run test:open
```

This invokes the `test:open` script defined in `package.json`.

### Step 2: Select E2E Testing

In the Cypress launch screen:

1. Select **E2E Testing**.
2. Follow the setup prompts if this is the first launch.
3. Select an available browser.
4. Click **Start E2E Testing**.

### Step 3: Run all tests using the UI

The Cypress Test Runner displays the discovered spec files.

Select `posts-get.cy.ts` to run the GET suite or `posts-create.cy.ts` to run the POST suite.

To execute both suites, return to the spec list after running the first file and open the second file.

**Important:** Opening the Cypress UI does not automatically run every spec file. Select each spec you want to execute.

### Step 4: Inspect test results

In the Test Runner, you can:

- See which test cases passed or failed.
- Select individual tests.
- Inspect Cypress command execution.
- Examine HTTP request and response information available in the command log.
- Review assertion failures to help troubleshoot test issues.

### Terminal versus UI execution

| Command | Execution mode | Scope |
|---|---|---|
| `npm test` | Headless | All spec files |
| `npx cypress run --spec "cypress/e2e/posts-get.cy.ts"` | Headless | GET tests only |
| `npx cypress run --spec "cypress/e2e/posts-create.cy.ts"` | Headless | POST tests only |
| `npm run test:open` | Interactive UI | Choose and run specs in Test Runner |

## 9. Available npm Scripts

The project defines the following scripts in `package.json`:

```json
{
  "scripts": {
    "test": "cypress run",
    "test:open": "cypress open",
    "typecheck": "tsc --noEmit"
  }
}
```

- `npm test`: Run all Cypress tests in headless mode.
- `npm run test:open`: Launch the interactive Cypress UI.
- `npm run typecheck`: Validate TypeScript types.

The GET-only and POST-only commands use `npx cypress run --spec` directly, so separate npm scripts are not required.

## 10. Test Architecture

### Reusable API Client

`cypress/support/api-client.ts` contains reusable request methods, including:

- `getPost(postId)`: Sends a GET request for a specific post.
- `createPost(postData)`: Sends a POST request to create a post.

This keeps request logic separate from test assertions and reduces duplication.

### Custom Cypress Command

`cypress/support/commands.ts` defines:

```typescript
cy.assertStatusCode(actualStatus, expectedStatus);
```

The command compares the actual HTTP status with the expected status.

### Fixtures

JSON fixtures separate test data from test logic.

This makes it easier to modify test inputs without rewriting the test cases.

### TypeScript Interfaces

The interfaces in `cypress/types/post.types.ts` describe the expected structure of the POST test data and help detect type errors.

## 11. Troubleshooting

### Cypress cannot reach the API

Check your internet connection and verify that this URL is accessible:

```text
https://jsonplaceholder.typicode.com/posts/1
```

Also verify the `CYPRESS_BASE_URL` value in `.env`.

### Cypress cannot find a spec file

Check that the file names end with `.cy.ts` and are inside `cypress/e2e/`.

Verify that `cypress.config.ts` contains:

```typescript
specPattern: "cypress/e2e/**/*.cy.ts"
```

### TypeScript reports an error

Run:

```bash
npm run typecheck
```

Review import paths, interface definitions, fixture property names, and custom command declarations.

### Tests fail unexpectedly

Run the relevant spec independently to isolate the problem:

```bash
npx cypress run --spec "cypress/e2e/posts-get.cy.ts"
```

or:

```bash
npx cypress run --spec "cypress/e2e/posts-create.cy.ts"
```

Inspect the failing assertion and the actual API response before changing the expected result.

## 12. Limitations

- JSONPlaceholder is a demo API, not a production payment or business API.
- POST operations are simulated and do not permanently persist newly created resources.
- The current suite focuses on basic GET and POST scenarios.
- Authentication, schema validation, negative POST scenarios, and CI/CD integration are not currently covered by this test suite.

## 13. Future Improvements

Possible extensions include:

- Add more test cases for invalid and boundary inputs.
- Validate response schemas and data types.
- Expand coverage to other resources, such as `/users`, `/comments`, and `/albums`.
- Add environment-specific configuration for development, staging, and testing.
- Integrate automated test execution with GitHub Actions.
- Publish test reports and improve failure diagnostics.

## 14. Repository

GitHub: https://github.com/Tung-Dylan/Cypress-API-Automation

---

**Project:** Cypress API Automation  
**Language:** TypeScript  
**Test Framework:** Cypress  
**Demo API:** JSONPlaceholder
