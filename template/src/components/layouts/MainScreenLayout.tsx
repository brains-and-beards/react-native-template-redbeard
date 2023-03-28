import Colors from '@config/ui/colors';
import React from 'react';
import {ScrollView, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FC} from '@utils/types';

const MainScreenLayout: FC = ({children}) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <StatusBar />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default MainScreenLayout;
