import Colors from '@config/ui/colors'
import React from 'react'
import { View, StyleSheet, ViewProps } from 'react-native'

const DemoCard: React.FC<ViewProps> = ({ children, style, ...props }) => {
  return (
    <View style={[styles.demoCard, style]} {...props}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  demoCard: {
    backgroundColor: Colors.surface,
    borderRadius: 2,
    elevation: 5,
    margin: 10,
    padding: 20,
    shadowColor: Colors.palette.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  }
})

export default DemoCard
