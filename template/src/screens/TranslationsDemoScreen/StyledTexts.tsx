import Colors from '@config/ui/colors';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

export const TitleText: React.FC = ({children}) => {
  return <Text style={styles.titleText}>{children}</Text>;
};

export const DescText: React.FC = ({children}) => {
  return <Text style={styles.descText}>{children}</Text>;
};

export const ExampleText: React.FC = ({children}) => {
  return <Text style={styles.exampleText}>{children}</Text>;
};

export const BoldText: React.FC = ({children}) => {
  return <Text style={styles.boldText}>{children}</Text>;
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 16,
    color: Colors.onSurface,
    fontWeight: '700',
  },
  descText: {
    marginTop: 15,
    fontSize: 15,
    color: Colors.onSurface,
  },
  exampleText: {
    fontSize: 14,
    color: Colors.palette.ANGRY,
  },
  boldText: {
    fontWeight: '700',
  },
});