<div align="center">
  <br>
  <img alt="logo" src="https://github.com/lmsGenie/client/assets/43786036/fda77759-f5dc-4578-b4b0-9417bedc3957" width="150"/>
  <h2> :dizzy: lmsGenie Back-End :dizzy:</h2>
  
![Express.js](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

This repository contains code and resources dedicated to the development and maintenance of the backend component of the lmsGenie application.  
</div>

## Getting Started
Below steps will guide you, how to set up your project locally. To get a local copy up and running follow these simple example steps.
1. Install pnpm
```
npm i -g pnpm
```
2. Clone repo locally.
```
git clone https://github.com/lmsGenie/server.git
```
3. Install dependencies
```
pnpm i
```
4. Run project locally
```
pnpm run dev
```

## Database Design
Checkout our Database Design.
<!--- Eraser file: https://app.eraser.io/workspace/pPrQuuG2ClvFiEfNcvKf --->
<p><a target="_blank" href="https://app.eraser.io/workspace/pPrQuuG2ClvFiEfNcvKf" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

## Project Structure
1. Code files
- `src/`: Contains all source code files.
- `src/controller/v1/`: Defined controllers functions.
- `src/models/`: Defined Schemas and Models.
- `src/routes/v1/`: Defined API routes.
- `src/services/`: Defined helper services (eg. email service)
- `src/middlewares/`: Defined middleware functions.
- `src/config`: Defined API related configs here (eg. DB configs).
- `src/validations/`: Defined zod validations.
- `src/enums/`: Defined enum constants.
- `src/logger/`: Defiled winston logger.
- `src/utils/`: Reusable utility function/constants.
- `src/helpers/`: Reusable helper function/contants. 

2. Config files
- `jest.config.js`: Jest config.
- `.eslintrc.json`: Eslint config.
- `.eslintignore`: Esline ignore.
- `commitlint.config.js`: Commitlint config.
- `prettier.config.js`: Prettier config.
- `.prettierignore`: Prettier ignore.
- `tsconfig.json`: Typesctipt config.
- `package.json`: Project dependencies.
- `.husky`: Husky config files.

## Want to contribute?
Feel like contributing? That's awesome! We have a [contributing guide](.github/CONTRIBUTING.md) to help guide you. 

Want to discuss something? [Create a discussion](https://github.com/orgs/lmsGenie/discussions/new/choose)
