import DemoCard from '@components/surfaces/DemoCard';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {StyleSheet, Text} from 'react-native';

const ObjectsArraysCard: React.FC = () => {
  const {t} = useTranslation();
  return (
    // <DemoCard>
    //     <Text style={styles.text}>
    //       {t('translationsDemoScreen.objectsAndArrays.objectsAndArrays')}
    //     </Text>
    //     <Text style={styles.text}>
    //       {t('translationsDemoScreen.objectsAndArrays.returnObjectsDesc')}
    //     </Text>
    //     <Text style={styles.text}>
    //       {JSON.stringify(
    //         t('translationsDemoScreen.objectsAndArrays.fruitList', {
    //           returnObjects: true,
    //         }),
    //       )}
    //     </Text>
    //     <Text style={styles.text}>
    //       {t('translationsDemoScreen.objectsAndArrays.joinArraysDesc')}
    //     </Text>
    //     <Text style={styles.text}>
    //       {t('translationsDemoScreen.objectsAndArrays.fruitList', {
    //         joinArrays: '\n',
    //       })}
    //     </Text>
    //   </DemoCard>
  );
};

const styles = StyleSheet.create({
  
});

export default ObjectsArraysCard;
