import MainScreenLayout from '@components/layouts/MainScreenLayout';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button, StyleSheet, Text, View} from 'react-native';
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
      <DemoCard style={styles.row}>
        <Button
          onPress={() => switchLaguage('de')}
          title={t('translationsDemoScreen.switchToGerman', {lng: 'de'})}
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
    fontSize: 20,
    textAlign: 'center',
    color: Colors.onSurface,
  },
});

export default TranslationsDemoScreen;
