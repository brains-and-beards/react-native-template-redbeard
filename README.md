# React Native Template Redbeard

Based on [react-native-template-typescript](https://github.com/react-native-community/react-native-template-typescript)  
Includes preconfigured file structure and packages.

## Usage

```sh
npx react-native init MyProject --template https://github.com/brains-and-beards/react-native-template-redbeard --title AppName --directory my-project
```

Project inits with some demo usage files.  
After init feel free to remove these:

- `src/api/comics.ts`
- `src/model/ComicModel.ts`
- `src/screens/DemoScreen.ts`
- `src/screens/demoSlice.ts`

## File tree

- `@types/` - Declaration files (d.ts)
- `api/` - Anything related to external communication.
- `assets/` - Static files like images, sounds, fonts(.otf, .ttf)
  - assets/fonts - fonts (_.otf, _.ttf)
  - assets/images/pressable - _.svg, _.png images used for pressable components
- `components/` - Reusable components
- `config/` - Things we can manipulate to adjust the app behaviour. Colors palette, timings, etc.
- `hoc/` - Reusable higher order components
- `hooks/` - Reusable hooks
- `localization/` - Things related to user locale
- `navigation/` - Navigators, routes
- `redux/` - Actions, reducers, sagas
- `screens/` - App screens
- `utils/` - Universal helpers

## Environments

There are three different environments preconfigured with [react-native-config](https://github.com/luggit/react-native-config). Use `.env.[development|staging|production]` files to place things like `API_URL`s etc.

#### Android

Use `yarn android:[dev|stg|prod]` to run the app in debug mode and `[devRelease|stgRelease|prodRelease]` for release variant.
Each environment command will generate and run separate app. Non-production apps gonna have name and package suffixes to make it distinct and possible to install in parallel.

#### iOS

There are 3 additional schemes for each environment to keep it simple. You can use them via `yarn ios:[dev|stg|prod]`.
Variables are also available in `Info.plist` e.g. `$(MY_ENV_VARIABLE)`.
Unlike on android, each app install will override the previous one, independently of selected env.

Base setup can be further extended with additional `build configurations`, `build schemes` / `targets` when you find the need for it or you have setup the apps in appstore connect. (Preasumbly great guides how to do it: [link1](https://blog.logicwind.com/manage-multiple-target-variant-with-react-native-projects/), [link2](https://medium.com/@pablosanchezdev/managing-different-environments-and-configurations-in-xcode-for-ios-projects-6c70d46e1b22))

<s>
# :space_invader: React Native Template TypeScript

<p>
  <a href="https://travis-ci.org/react-native-community/react-native-template-typescript">
    <img alt="Build Status" src="https://img.shields.io/travis/react-native-community/react-native-template-typescript.svg" target="_blank" />
  </a>
  <a href="https://github.com/react-native-community/react-native-template-typescript#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/react-native-community/react-native-template-typescript/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/react-native-community/react-native-template-typescript/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

> Clean and minimalist React Native template for a quick start with TypeScript.

## :star: Features

- Elegant usage directly within the [React Native CLI](https://github.com/react-native-community/cli)
- Consistent with the default React Native template
- Minimal additional dependencies

## :arrow_forward: Usage

```sh
npx react-native init MyApp --template react-native-template-typescript
```

### Usage with older versions of React Native

#### e.g. `react-native@0.63.x`

```sh
npx react-native init MyApp --template react-native-template-typescript@6.5.*
```

See the below table to find out which version of the template to use.

#### React Native <=> Template Version

| React Native | Template |
| ------------ | -------- |
| 0.64         | 6.6.\*   |
| 0.63         | 6.5.\*   |
| 0.62         | 6.4.\*   |
| 0.61         | 6.3.\*   |
| 0.60         | 6.2.\*   |

### Note on the legacy CLI

There seems to be quite some confusion about the legacy CLI. This template only works with the new CLI. Make sure you have uninstalled the legacy `react-native-cli` first (`npm uninstall -g react-native-cli`), for the below command to work. If you wish to not use `npx`, you can also install the new CLI globally (`npm i -g @react-native-community/cli` or `yarn global add @react-native-community/cli`).

Further information can be found here: https://github.com/react-native-community/cli#about

## :computer: Contributing

Contributions are very welcome. Please check out the [contributing document](CONTRIBUTING.md).

## :bookmark: License

This project is [MIT](LICENSE) licensed.

</s>
