import Colors from '@config/ui/colors';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const MainScreenLayout: React.FC = ({children}) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <StatusBar />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default MainScreenLayout;
