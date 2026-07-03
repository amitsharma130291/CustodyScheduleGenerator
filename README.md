# CustodyBuilder

Astro static site for building custody schedules and parenting-time calendars.

## Dev setup

```sh
# Install dependencies INCLUDING devDependencies (vitest lives there).
# A plain `npm ci` in a NODE_ENV=production shell omits dev deps, so tests
# would fail with "vitest: not found". Force dev deps in:
NODE_ENV=development npm ci --include=dev

npm run dev      # local dev server
npm run build    # production build -> dist/ (47 pages)
npm test         # vitest: 7 suites / 133 unit tests (src/lib)
npm run preview  # serve the built dist/ at the domain root
```

> Preview note: serve `dist/` at a web root (`npm run preview`), not from a
> sub-path — asset paths are absolute and correct for the apex domain
> `www.custodybuilder.com`.

---

## Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── logo/
│       └── custodybuilder-icon-light.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
