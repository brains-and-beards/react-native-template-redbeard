import DemoCard from '@components/surfaces/DemoCard'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { BoldText, DescText, ExampleText, TitleText } from './StyledTexts'

const ContextCard: React.FC = () => {
  const { t } = useTranslation()
  return (
    <DemoCard>
      <TitleText>{t('translationsDemoScreen.context.context')}</TitleText>
      <DescText>
        <Trans
          i18nKey="translationsDemoScreen.context.useContextOptionDesc"
          components={{ bold: <BoldText /> }}
        />
      </DescText>
      <ExampleText>{t('translationsDemoScreen.context.findAPerfectFriend')}</ExampleText>
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
  )
}

export default ContextCard
