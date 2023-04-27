import DemoCard from '@components/surfaces/DemoCard'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { BoldText, DescText, ExampleText, TitleText } from './StyledTexts'

const SingularPluralCard: React.FC = () => {
  const { t } = useTranslation()
  return (
    <DemoCard>
      <TitleText>{t('translationsDemoScreen.singularPlural.singularPlural')}</TitleText>
      <DescText>
        <Trans
          i18nKey="translationsDemoScreen.singularPlural.useCountOptionDesc"
          components={{ bold: <BoldText /> }}
        />
      </DescText>
      <ExampleText>{t('translationsDemoScreen.singularPlural.item', { count: 1 })}</ExampleText>
      <ExampleText>{t('translationsDemoScreen.singularPlural.item', { count: 22 })}</ExampleText>
      <DescText>
        <Trans
          i18nKey="translationsDemoScreen.singularPlural.multiplePluralsDesc"
          components={{ bold: <BoldText /> }}
        />
      </DescText>
      <ExampleText>{t('translationsDemoScreen.singularPlural.plate', { count: 1 })}</ExampleText>
      <ExampleText>{t('translationsDemoScreen.singularPlural.plate', { count: 4 })}</ExampleText>
      <ExampleText>{t('translationsDemoScreen.singularPlural.plate', { count: 25 })}</ExampleText>
      <DescText>{t('translationsDemoScreen.singularPlural.intervalPluralDesc')}</DescText>
      <ExampleText>{t('translationsDemoScreen.singularPlural.intervalPluralExample')}</ExampleText>
    </DemoCard>
  )
}

export default SingularPluralCard
