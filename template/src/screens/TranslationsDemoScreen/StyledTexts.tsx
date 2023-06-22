import React, { PropsWithChildren } from 'react'
import { StyleSheet, Text } from 'react-native'
import Colors from '@config/ui/colors'

export const TitleText: React.FC<PropsWithChildren> = ({ children }) => {
  return <Text style={styles.titleText}>{children}</Text>
}

export const DescText: React.FC<PropsWithChildren> = ({ children }) => {
  return <Text style={styles.descText}>{children}</Text>
}

export const ExampleText: React.FC<PropsWithChildren> = ({ children }) => {
  return <Text style={styles.exampleText}>{children}</Text>
}

export const BoldText: React.FC<PropsWithChildren> = ({ children }) => {
  return <Text style={styles.boldText}>{children}</Text>
}

const styles = StyleSheet.create({
  boldText: {
    fontWeight: '700',
  },
  descText: {
    color: Colors.onSurface,
    fontSize: 15,
    marginTop: 15,
  },
  exampleText: {
    color: Colors.palette.ANGRY,
    fontSize: 14,
  },
  titleText: {
    color: Colors.onSurface,
    fontSize: 16,
    fontWeight: '700',
  },
})
