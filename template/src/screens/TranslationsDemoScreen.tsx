import MainScreenLayout from '@components/layouts/MainScreenLayout';
import React from 'react';
import {Trans, useTranslation} from 'react-i18next';
import {Button, StyleSheet, Text} from 'react-native';
import {resources} from '@localization/i18n';
import Colors from '@config/ui/colors';
import DemoCard from '@components/surfaces/DemoCard';

const TranslationsDemoScreen = () => {
  const {t, i18n} = useTranslation();

  const switchLaguage = (lng: keyof typeof resources) => {
    i18n.changeLanguage(lng);
  };

  return (
    <MainScreenLayout>
      <DemoCard>
        <Text style={styles.text}>
          {t('translationsDemoScreen.languageIsSetTo', {
            currentLanguage: i18n.language,
          })}
        </Text>
      </DemoCard>
      <DemoCard>
        <Text style={styles.text}>
          {t('translationsDemoScreen.objectsAndArrays.objectsAndArrays')}
        </Text>
        <Text style={styles.text}>
          {t('translationsDemoScreen.objectsAndArrays.returnObjectsDesc')}
        </Text>
        <Text style={styles.text}>
          {JSON.stringify(
            t('translationsDemoScreen.objectsAndArrays.fruitList', {
              returnObjects: true,
            }),
          )}
        </Text>
        <Text style={styles.text}>
          {t('translationsDemoScreen.objectsAndArrays.joinArraysDesc')}
        </Text>
        <Text style={styles.text}>
          {t('translationsDemoScreen.objectsAndArrays.fruitList', {
            joinArrays: '\n',
          })}
        </Text>
      </DemoCard>
      <DemoCard>
        <Text style={styles.text}>
          {t('translationsDemoScreen.singularPlural.singularPlural')}
        </Text>
        <Text style={styles.text}>
          <Trans
            i18nKey="translationsDemoScreen.singularPlural.useCountOptionDesc"
            components={{bold: <Text style={styles.boldText} />}}
          />
        </Text>
        <Text style={styles.text}>
          {t('translationsDemoScreen.singularPlural.item', {count: 1})}
        </Text>
        <Text style={styles.text}>
          {t('translationsDemoScreen.singularPlural.item', {count: 22})}
        </Text>
        <Text style={styles.text}>
          <Trans
            i18nKey="translationsDemoScreen.singularPlural.multiplePluralsDesc"
            components={{bold: <Text style={styles.boldText} />}}
          />
        </Text>
        <Text style={styles.text}>
          {t('translationsDemoScreen.singularPlural.plate', {count: 1})}
        </Text>
        <Text style={styles.text}>
          {t('translationsDemoScreen.singularPlural.plate', {count: 4})}
        </Text>
        <Text style={styles.text}>
          {t('translationsDemoScreen.singularPlural.plate', {count: 25})}
        </Text>
        <Text style={styles.text}>
          {t('translationsDemoScreen.singularPlural.intervalPluralDesc')}
        </Text>
      </DemoCard>
      <DemoCard>
        <Text style={styles.text}>
          {t('translationsDemoScreen.context.context')}
        </Text>
        <Text style={styles.text}>
          <Trans
            i18nKey="translationsDemoScreen.context.useContextOptionDesc"
            components={{bold: <Text style={styles.boldText} />}}
          />
        </Text>
        <Text style={styles.text}>
          {t('translationsDemoScreen.context.findAPerfectFriend')}
        </Text>
        <Text style={styles.text}>
          {t('translationsDemoScreen.context.findAPerfectFriend', {
            context: 'male',
          })}
        </Text>
        <Text style={styles.text}>
          {t('translationsDemoScreen.context.findAPerfectFriend', {
            context: 'female',
          })}
        </Text>
      </DemoCard>
      <DemoCard style={styles.row}>
        <Button
          onPress={() => switchLaguage('pl')}
          title={t('translationsDemoScreen.switchToPolish', {lng: 'pl'})}
        />
        <Button
          onPress={() => switchLaguage('en')}
          title={t('translationsDemoScreen.switchToEnglish', {lng: 'en'})}
        />
      </DemoCard>
    </MainScreenLayout>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.onSurface,
  },
  boldText: {
    fontWeight: '700',
  },
});

export default TranslationsDemoScreen;
