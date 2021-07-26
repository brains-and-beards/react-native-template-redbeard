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
import {Button, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

type DemoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  Routes.DEMO_SCREEN
>;

type DemoScreenRouteProp = RouteProp<RootStackParamList, Routes.DEMO_SCREEN>;

interface DemoScreenProps {
  navigation: DemoScreenNavigationProp;
  route: DemoScreenRouteProp;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DemoScreen = ({navigation, route}: DemoScreenProps) => {
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
      <View style={styles.demoCard}>
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
      </View>
      <View style={styles.demoCard}>
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
      </View>
    </MainScreenLayout>
  );
};

const styles = StyleSheet.create({
  demoCard: {
    margin: 10,
    padding: 20,
    borderRadius: 2,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: Colors.palette.BLACK,
    backgroundColor: Colors.surface,
  },
  demoText: {
    color: Colors.onSurface,
    textAlign: 'center',
  },
  demoImage: {
    height: 350,
  },
});

export default DemoScreen;
