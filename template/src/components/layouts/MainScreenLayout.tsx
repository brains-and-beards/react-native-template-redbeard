import { FC } from '@utils/types'
import React from 'react'
import { ScrollView, StatusBar, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@config/ui/colors'

const MainScreenLayout: FC = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <StatusBar />
      <ScrollView contentContainerStyle={styles.contentContainer}>{children}</ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  safeArea: {
    backgroundColor: Colors.background,
    flex: 1,
  },
})

export default MainScreenLayout
