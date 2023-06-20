import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, Button, Image, StyleSheet, Text } from 'react-native'
import MainScreenLayout from '@components/layouts/MainScreenLayout'
import DemoCard from '@components/surfaces/DemoCard'
import { TestIDs } from '@config/testIDs'
import Colors from '@config/ui/colors'
import useAppDispatch from '@hooks/useAppDispatch'
import useAppSelector from '@hooks/useAppSelector'
import type { RootStackScreenProps } from '@navigation/navigators/RootStackNavigator'
import Routes from '@navigation/routes'
import { clearPersistence } from '@redux/persistence'
import { resetStore } from '@redux/rootActions'
import { persistor } from '@redux/store'
import { hasData, isNotRequested } from '@utils/api'
import {
  decrementCounterBy,
  getLatestComicAsync,
  incrementCounterBy,
  selectComic,
  selectCounter,
} from './demoSlice'

export type DemoScreenParams = undefined

interface DemoScreenProps {
  navigation: RootStackScreenProps<Routes.DEMO_SCREEN>['navigation']
  route: RootStackScreenProps<Routes.DEMO_SCREEN>['route']
}

const DemoScreen = ({ navigation }: DemoScreenProps) => {
  const [isLogoutLoading, setIsLogoutLoading] = useState(false)
  const counter = useAppSelector(selectCounter)
  const comicRequest = useAppSelector(selectComic)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  useEffect(() => {
    if (isNotRequested(comicRequest)) {
      dispatch(getLatestComicAsync())
    }
  }, [comicRequest.state])

  const logOut = async () => {
    try {
      setIsLogoutLoading(true)
      // typical logout for apps that require user to be logged in
      // before giving any further access
      persistor.pause()
      await clearPersistence()
      dispatch(resetStore())
      persistor.persist()
    } finally {
      setIsLogoutLoading(false)
    }
  }

  const comicData = hasData(comicRequest) ? comicRequest.data : null

  return (
    <MainScreenLayout>
      <DemoCard>
        <Button
          onPress={() => dispatch(incrementCounterBy(5))}
          title={t('demoScreen.incrementButton')}
        />
        <Button
          onPress={() => dispatch(decrementCounterBy(15))}
          title={t('demoScreen.decrementButton')}
        />
        <Text style={styles.demoText}>{`${t('demoScreen.counter')} ${counter}`}</Text>
      </DemoCard>
      <DemoCard>
        {comicData ? (
          <>
            <Text style={styles.demoText}>{comicData.title}</Text>
            <Image
              testID={TestIDs.DEMO_COMIC_IMAGE}
              source={{ uri: comicData.imageUrl }}
              style={styles.demoImage}
              resizeMode="contain"
            />
            <Text style={styles.demoText}>{comicData.description}</Text>
          </>
        ) : (
          <ActivityIndicator testID={TestIDs.DEMO_COMIC_SPINNER} />
        )}
      </DemoCard>
      <DemoCard>
        <Button
          onPress={() => navigation.navigate(Routes.TRANSLATIONS_DEMO_SCREEN)}
          title={t('demoScreen.goToTranslationsDemo')}
        />
      </DemoCard>
      <DemoCard>
        {isLogoutLoading ? (
          <ActivityIndicator />
        ) : (
          <Button title={t('demoScreen.logOutButton')} onPress={logOut} />
        )}
      </DemoCard>
    </MainScreenLayout>
  )
}

const styles = StyleSheet.create({
  demoImage: {
    height: 350,
  },
  demoText: {
    color: Colors.onSurface,
    textAlign: 'center',
  },
})

export default DemoScreen
