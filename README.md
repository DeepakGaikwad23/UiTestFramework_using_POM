# UI Test Framework

A small, beginner-friendly browser test framework for [StackDemo](https://bstackdemo.com/) using Playwright, TypeScript, and the Page Object Model.

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm (included with Node.js)

## Installation

```bash
npm install
npx playwright install
```

`npx playwright install` downloads the browsers Playwright needs. Chromium is enough for this project.

## Project structure

```text
project-root/
├── tests/                  # Test scenarios and assertions
├── pages/                  # Page Object classes (locators and page actions)
├── test-data/
│   └── testData.json       # Shared test data (no secrets)
├── DownloadedFile/         # Browser download folder for order receipts
├── scripts/
│   └── run-tests.js        # Runs Playwright, then generates the Allure report
├── playwright.config.ts    # Playwright runner settings
├── package.json
├── tsconfig.json
└── README.md
```

## Page Objects

Page Objects live in `pages/`.

- `pages/home.page.ts` — home page, product list, filters, and cart
- `pages/sign-in.page.ts` — sign-in form
- `pages/checkout.page.ts` — shipping address form and submit
- `pages/confirmation.page.ts` — order confirmation and receipt download

Each class holds the locators and actions for that page. Test files should call those methods instead of repeating raw locators.

## Test data

Test data lives in `test-data/testData.json`.

Tests import it like this:

```ts
import testData from '../test-data/testData.json';
```

Use this file for values such as the expected title, product names, filter values, and the public demo login shown on the Sign In page.

The `demouser` / `testingisfun99` values are **public demo credentials displayed on the application itself**. They are not real secrets. If you later test an app with real credentials, keep those in environment variables instead of JSON.

## How to run tests

```bash
npm test
```

Run tests with a visible browser:

```bash
npm run test:headed
```

## How to view reports

`npm test` and `npm run test:headed` generate an Allure 3 report automatically when the run finishes. This uses the Node.js Allure CLI, so Java is not required. Results go to `allure-results/`, and the HTML report is written to `allure-report/awesome`.

Open the Allure report:

```bash
npm run allure:open
```

Open the Playwright HTML report:

```bash
npm run test:report
```

Failed tests also keep a screenshot and video.

## What the tests cover

| Test | What it checks |
| --- | --- |
| Home page loads | Title, logo, and product list |
| Navigate to Sign In | Header Sign In link opens the login page |
| Filter by vendor | Apple filter shows only Apple products |
| Add to cart | Selected product appears in the cart |
| Sign in | Demo user can log in and see Logout |
| Checkout and receipt | Login, add iPhone XR, checkout, submit address, download receipt |

## Download folder

Chromium saves downloads to `DownloadedFile/` in this project. The checkout test clicks **Download order receipt** and checks that the PDF exists in that folder.

## Configuration

`playwright.config.ts` sets:

- `baseURL` to `https://bstackdemo.com`
- Chromium as the browser
- Browser download path to `DownloadedFile/`
- Allure 3 and Playwright HTML reporters
- Trace on first retry
- Screenshot and video on failure
- A 30 second test timeout (the checkout flow uses 60 seconds)
