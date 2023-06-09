import { StyleSheet, TextStyle } from 'react-native'

// You can modify properties required in your typography object in here
type Typography<T> = { [K in keyof T]: TextStyle }

function createTypography<T extends Typography<T>>(values: Typography<T>): T {
  return StyleSheet.create(values)
}

export default createTypography({
  textInput: {
    fontSize: 24,
  },
})
