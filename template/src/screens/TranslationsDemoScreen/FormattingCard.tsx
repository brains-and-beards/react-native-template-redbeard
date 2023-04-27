import React from 'react'
import { useTranslation } from 'react-i18next'
import DemoCard from '@components/surfaces/DemoCard'
import { DescText, ExampleText, TitleText } from './StyledTexts'

const FormattingCard: React.FC = () => {
  const { t } = useTranslation()
  return (
    <DemoCard>
      <TitleText>{t('translationsDemoScreen.formatting.formatting')}</TitleText>
      <DescText>{t('translationsDemoScreen.formatting.description')}</DescText>
      <ExampleText>{t('translationsDemoScreen.formatting.date', { date: new Date() })}</ExampleText>
      <ExampleText>{t('translationsDemoScreen.formatting.price', { value: 45123 })}</ExampleText>
      <ExampleText>
        {t('translationsDemoScreen.formatting.number', { value: 14824912.421 })}
      </ExampleText>
    </DemoCard>
  )
}

export default FormattingCard
