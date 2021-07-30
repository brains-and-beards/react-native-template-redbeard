import MainScreenLayout from '@components/layouts/MainScreenLayout';
import React from 'react';
import {Trans, useTranslation} from 'react-i18next';
import {Button, StyleSheet} from 'react-native';
import {resources} from '@localization/i18n';
import Colors from '@config/ui/colors';
import DemoCard from '@components/surfaces/DemoCard';
import {BoldText, DescText, ExampleText, TitleText} from './StyledTexts';

const TranslationsDemoScreen = () => {
  const {t, i18n} = useTranslation();

  const switchLaguage = (lng: keyof typeof resources) => {
    i18n.changeLanguage(lng);
  };

  return (
    <MainScreenLayout>
      <DemoCard>
        <TitleText>
          {t('translationsDemoScreen.languageIsSetTo', {
            currentLanguage: i18n.language,
          })}
        </TitleText>
      </DemoCard>
      <DemoCard>
        <TitleText>
          {t('translationsDemoScreen.objectsAndArrays.objectsAndArrays')}
        </TitleText>
        <DescText>
          {t('translationsDemoScreen.objectsAndArrays.returnObjectsDesc')}
        </DescText>
        <ExampleText>
          {JSON.stringify(
            t('translationsDemoScreen.objectsAndArrays.fruitList', {
              returnObjects: true,
            }),
          )}
        </ExampleText>
        <DescText>
          {t('translationsDemoScreen.objectsAndArrays.joinArraysDesc')}
        </DescText>
        <ExampleText>
          {t('translationsDemoScreen.objectsAndArrays.fruitList', {
            joinArrays: '\n',
          })}
        </ExampleText>
      </DemoCard>
      <DemoCard>
        <TitleText>
          {t('translationsDemoScreen.singularPlural.singularPlural')}
        </TitleText>
        <DescText>
          <Trans
            i18nKey="translationsDemoScreen.singularPlural.useCountOptionDesc"
            components={{bold: <BoldText />}}
          />
        </DescText>
        <ExampleText>
          {t('translationsDemoScreen.singularPlural.item', {count: 1})}
        </ExampleText>
        <ExampleText>
          {t('translationsDemoScreen.singularPlural.item', {count: 22})}
        </ExampleText>
        <DescText>
          <Trans
            i18nKey="translationsDemoScreen.singularPlural.multiplePluralsDesc"
            components={{bold: <BoldText />}}
          />
        </DescText>
        <ExampleText>
          {t('translationsDemoScreen.singularPlural.plate', {count: 1})}
        </ExampleText>
        <ExampleText>
          {t('translationsDemoScreen.singularPlural.plate', {count: 4})}
        </ExampleText>
        <ExampleText>
          {t('translationsDemoScreen.singularPlural.plate', {count: 25})}
        </ExampleText>
        <DescText>
          {t('translationsDemoScreen.singularPlural.intervalPluralDesc')}
        </DescText>
        <ExampleText>
          {t('translationsDemoScreen.singularPlural.intervalPluralExample')}
        </ExampleText>
      </DemoCard>
      <DemoCard>
        <TitleText>{t('translationsDemoScreen.context.context')}</TitleText>
        <DescText>
          <Trans
            i18nKey="translationsDemoScreen.context.useContextOptionDesc"
            components={{bold: <BoldText />}}
          />
        </DescText>
        <ExampleText>
          {t('translationsDemoScreen.context.findAPerfectFriend')}
        </ExampleText>
        <ExampleText>
          {t('translationsDemoScreen.context.findAPerfectFriend', {
            context: 'male',
          })}
        </ExampleText>
        <ExampleText>
          {t('translationsDemoScreen.context.findAPerfectFriend', {
            context: 'female',
          })}
        </ExampleText>
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
