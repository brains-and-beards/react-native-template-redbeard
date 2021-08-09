import MainScreenLayout from '@components/layouts/MainScreenLayout';
import Colors from '@config/ui/colors';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {hasData} from '@models/RemoteData';
import {RootStackParamList} from '@navigation/navigators/RootStackNavigator';
import Routes from '@navigation/routes';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  decrementCounterBy,
  getLatestComicAsync,
  incrementCounterBy,
  selectComic,
  selectCounter,
} from './demoSlice';
import React from 'react';
import {useEffect} from 'react';
import {ActivityIndicator, Image} from 'react-native';
import {Button, StyleSheet, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import DemoCard from '@components/surfaces/DemoCard';

type DemoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  Routes.DEMO_SCREEN
>;

type DemoScreenRouteProp = RouteProp<RootStackParamList, Routes.DEMO_SCREEN>;

interface DemoScreenProps {
  navigation: DemoScreenNavigationProp;
  route: DemoScreenRouteProp;
}

const DemoScreen = ({navigation}: DemoScreenProps) => {
  const counter = useAppSelector(selectCounter);
  const comicRequest = useAppSelector(selectComic);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  useEffect(() => {
    dispatch(getLatestComicAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const comicData = hasData(comicRequest) ? comicRequest.data : null;

  return (
    <MainScreenLayout>
      <DemoCard>
        <Text style={styles.demoText}>
          {/* @ts-ignore */}
          Hermes Enabled?: {global.HermesInternal ? 'YES' : 'NO'}
        </Text>
        <Button
          onPress={() => dispatch(incrementCounterBy(5))}
          title={t('demoScreen.incrementButton')}
        />
        <Button
          onPress={() => dispatch(decrementCounterBy(15))}
          title={t('demoScreen.decrementButton')}
        />
        <Text style={styles.demoText}>
          {`${t('demoScreen.counter')} ${counter}`}
        </Text>
      </DemoCard>
      <DemoCard>
        {comicData ? (
          <>
            <Text style={styles.demoText}>{comicData.title}</Text>
            <Image
              source={{uri: comicData.imageUrl}}
              style={styles.demoImage}
              resizeMode="contain"
            />
            <Text style={styles.demoText}>{comicData.description}</Text>
          </>
        ) : (
          <ActivityIndicator />
        )}
      </DemoCard>
      <DemoCard>
        <Button
          onPress={() => navigation.navigate(Routes.TRANSLATIONS_DEMO_SCREEN)}
          title={t('demoScreen.goToTranslationsDemo')}
        />
      </DemoCard>
    </MainScreenLayout>
  );
};

const styles = StyleSheet.create({
  demoText: {
    color: Colors.onSurface,
    textAlign: 'center',
  },
  demoImage: {
    height: 350,
  },
});

export default DemoScreen;
