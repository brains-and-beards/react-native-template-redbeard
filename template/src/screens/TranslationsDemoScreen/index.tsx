import MainScreenLayout from '@components/layouts/MainScreenLayout'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, StyleSheet } from 'react-native'
import { resources } from '@localization/i18n'
import DemoCard from '@components/surfaces/DemoCard'
import { TitleText } from './StyledTexts'
import ObjectsArraysCard from './ObjectsArraysCard'
import SingularPluralCard from './SingularPluralCard'
import ContextCard from './ContextCard'
import FormattingCard from './FormattingCard'

export type TranslationsDemoScreenParams = undefined

const TranslationsDemoScreen = () => {
  const { t, i18n } = useTranslation()

  const switchLaguage = (lng: keyof typeof resources) => {
    i18n.changeLanguage(lng)
  }

  return (
    <MainScreenLayout>
      <DemoCard>
        <TitleText>
          {t('translationsDemoScreen.languageIsSetTo', {
            currentLanguage: i18n.language
          })}
        </TitleText>
      </DemoCard>
      <ObjectsArraysCard />
      <FormattingCard />
      <SingularPluralCard />
      <ContextCard />
      <DemoCard style={styles.row}>
        <Button
          onPress={() => switchLaguage('pl')}
          title={t('translationsDemoScreen.switchToPolish', { lng: 'pl' })}
        />
        <Button
          onPress={() => switchLaguage('en')}
          title={t('translationsDemoScreen.switchToEnglish', { lng: 'en' })}
        />
      </DemoCard>
    </MainScreenLayout>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

export default TranslationsDemoScreen
