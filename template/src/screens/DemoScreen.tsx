import MainScreenLayout from '@components/layouts/MainScreenLayout';
import Colors from '@config/ui/colors';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import {RootStackParamList} from '@navigation/navigators/RootStackNavigator';
import Routes from '@navigation/routes';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  decrementCounterBy,
  incrementCounterBy,
  selectCounter,
} from '@redux/demoScreen/slice';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

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
  const dispatch = useAppDispatch();

  return (
    <MainScreenLayout>
      <View style={styles.demoCard}>
        <Button
          onPress={() => dispatch(incrementCounterBy(5))}
          title="Increment counter by 5"
        />
        <Button
          onPress={() => dispatch(decrementCounterBy(15))}
          title="Decrement counter by 15"
        />
        <Text style={styles.demoText}>Counter: {counter}</Text>
      </View>
    </MainScreenLayout>
  );
};

const styles = StyleSheet.create({
  demoCard: {
    margin: 10,
    padding: 50,
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
});

export default DemoScreen;
