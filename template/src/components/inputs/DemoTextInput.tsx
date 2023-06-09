import React from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'
import Colors from '@config/ui/colors'
import typography from '@config/ui/typography'

const DemoTextInput: React.FC<TextInputProps> = ({ style, ...props }) => {
  return <TextInput style={[styles.demoTextInput, style]} {...props} />
}

const styles = StyleSheet.create({
  demoTextInput: {
    backgroundColor: Colors.palette.WHITE,
    fontSize: 32,
    ...typography.textInput,
  },
})

export default DemoTextInput
