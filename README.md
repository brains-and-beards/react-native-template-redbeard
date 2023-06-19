# React Native Template Redbeard

This is an opinionated React Native app setup as usually used in Brains & Beards.

## Usage

```sh
npx react-native init MyProject --template https://github.com/brains-and-beards/react-native-template-redbeard --title AppName --directory my-project
```

Project inits with some demo usage files. You can browse them to see the proposed usage patterns. After init feel free to remove them:

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

## Security

Project contains basic code for auth token management. It stores sensitive information with [react-native-encrypted-storage](https://github.com/emeraldsanto/react-native-encrypted-storage#readme) library. Although it has been listed in [react-native's official docs](https://reactnative.dev/docs/security#:~:text=react%2Dnative%2Dencrypted%2Dstorage%20%2D%20uses%20Keychain%20on%20iOS%20and%20EncryptedSharedPreferences%20on%20Android.), it's a community-maintaind package. **Use at your own risk** or replace it with your own implementation.
