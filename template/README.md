# Some React Native app

This app has been generated using [react-native-template-redbeard](https://github.com/brains-and-beards/react-native-template-redbeard). It includes preconfigured file structure and packages. It also inits with some demo usage files, feel free to remove these:

- `src/__mocks__/fixtures`
- `src/api/mappers/comicMappers.ts`
- `src/api/types/comic.types.ts`
- `src/api/comics.ts`
- `src/components/inputs/DemoTextInput.tsx`
- `src/components/surfaces/DemoCard.tsx`
- `src/localization/pl`
- `src/screens/LoginScreen.tsx`
- `src/screens/DemoScreen.tsx`
- `src/screens/DemoScreen.test.tsx`
- `src/screens/TranslationsDemoScreen`
- `src/screens/demoSlice.ts`
- `src/screens/__tests__/demoSlice.test.ts`

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
- `remote/` - Remote state (via TanStack Query)
- `screens/` - App screens
- `utils/` - Universal helpers

## Authentication

App uses preconfigured auth token management. It stores sensitive information via [react-native-encrypted-storage](https://github.com/emeraldsanto/react-native-encrypted-storage#readme) library.

## Environments

There are three different environments preconfigured with [react-native-config](https://github.com/luggit/react-native-config). Use `.env.[development|staging|production]` files to place things like `API_URL`s etc.  
As these files are included in gitigone, use [.env.example](/template/.env.example) file to share what variables you expect others to have.

#### Android

Use `yarn android:[dev|stg|prod]` to run the app in debug mode and `[devRelease|stgRelease|prodRelease]` for release variant.
Each environment command will generate and run separate app. Non-production apps gonna have name and package suffixes to make it distinct and possible to install in parallel.

#### iOS

There are 3 additional schemes for each environment to keep it simple. You can use them via `yarn ios:[dev|stg|prod]`.
Variables are also available in `Info.plist` e.g. `$(MY_ENV_VARIABLE)`.
Unlike on android, each app install will override the previous one, independently of selected env.

Base setup can be further extended with additional `build configurations`, `build schemes` / `targets` when you find the need for it or you have setup the apps in appstore connect. (Preasumbly great guides how to do it: [link1](https://blog.logicwind.com/manage-multiple-target-variant-with-react-native-projects/), [link2](https://medium.com/@pablosanchezdev/managing-different-environments-and-configurations-in-xcode-for-ios-projects-6c70d46e1b22))
