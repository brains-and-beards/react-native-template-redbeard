import Colors from '@config/ui/colors'
import { FC } from '@utils/types'
import React from 'react'
import { StyleSheet, Text } from 'react-native'

export const TitleText: FC = ({ children }) => {
  return <Text style={styles.titleText}>{children}</Text>
}

export const DescText: FC = ({ children }) => {
  return <Text style={styles.descText}>{children}</Text>
}

export const ExampleText: FC = ({ children }) => {
  return <Text style={styles.exampleText}>{children}</Text>
}

export const BoldText: FC = ({ children }) => {
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
