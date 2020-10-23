# React Webpack Mobx Typescript Email App Starter
> Minimal starter with hot module replacement (HMR) for rapid development.

* **[React](https://facebook.github.io/react/)** (16.x)
* **[Webpack](https://webpack.js.org/)** (4.x)
* **[Typescript](https://www.typescriptlang.org/)** (3.x)
* **[Mobx](https://mobx.js.org/) ** (6.x)
* **[Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/)** using [React Hot Loader](https://github.com/gaearon/react-hot-loader) (4.x)
* [Babel](http://babeljs.io/) (7.x)
* [SASS](http://sass-lang.com/)
* [Jest](https://facebook.github.io/jest/) - Testing framework for React applications
* Production build script
* Image loading/minification using [Image Webpack Loader](https://github.com/tcoopman/image-webpack-loader)
* Typescript compiling using [Awesome Typescript Loader](https://github.com/s-panferov/awesome-typescript-loader) (5.x)
* Code quality (linting) for Typescript.

## Installation
1. Clone/download repo
2. `yarn install` (or `npm install` for npm)
3. `yarn run start` to run in development mode

## Usage
**Development**

`yarn run start

* Build app continuously (HMR enabled)
* App served @ `http://localhost:8000`

**Production**

`yarn run start-prod`

* Build app once (HMR disabled) to `/dist/`
* App served @ `http://localhost:3000`

---

**All commands**

Command | Description
--- | ---
`yarn run start-dev` | Build app continuously (HMR enabled) and serve @ `http://localhost:8080`
`yarn run start-prod` | Build app once (HMR disabled) to `/dist/` and serve @ `http://localhost:3000`
`yarn run build` | Build app to `/dist/`
`yarn run test` | Run tests
`yarn run lint` | Run Typescript linter
`yarn run lint --fix` | Run Typescript linter and fix issues
`yarn run start` | (alias of `yarn run start-dev`)

**Note**: replace `yarn` with `npm` in `package.json` if you use npm.

## See also
* [React Webpack Babel Starter](https://github.com/vikpe/react-webpack-babel-starter)
* [Isomorphic Webapp Starter](https://github.com/vikpe/isomorphic-webapp-starter)


## React components used

React Components | Description
--- | ---
`Canvas`| Used to design the actual email template.
`design` | Used to consolidate other components.
`RenderTemplate` | Used to display the template before sending it.
`ReviewButton` | Used to display review/send buttons.
`SentMessage` | used to report success or failure sending email.
`TagRecord` | Used to display editable row for a tag used in email.
`TextBlock` | Used to display text area to add new text to the email.
`Tag` | Used to display a tag
`TagSelector` | Used for the dropdown list to select a tag for an email.
`TemplatePreview` | Used to display template in the process of being edited.
`Text` | Used to display a text.
