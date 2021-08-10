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
- `src/components/surfaces/DemoCard.tsx`
- `src/localization/pl`
- `src/model/ComicModel.ts`
- `src/screens/DemoScreen.tsx`
- `src/screens/DemoScreen.test.tsx`
- `src/screens/TranslationsDemoScreen`
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
