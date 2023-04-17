import DemoCard from '@components/surfaces/DemoCard'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { DescText, ExampleText, TitleText } from './StyledTexts'

const ObjectsArraysCard: React.FC = () => {
  const { t } = useTranslation()
  return (
    <DemoCard>
      <TitleText>{t('translationsDemoScreen.objectsAndArrays.objectsAndArrays')}</TitleText>
      <DescText>{t('translationsDemoScreen.objectsAndArrays.returnObjectsDesc')}</DescText>
      <ExampleText>
        {JSON.stringify(
          t('translationsDemoScreen.objectsAndArrays.fruitList', {
            returnObjects: true
          })
        )}
      </ExampleText>
      <DescText>{t('translationsDemoScreen.objectsAndArrays.joinArraysDesc')}</DescText>
      <ExampleText>
        {t('translationsDemoScreen.objectsAndArrays.fruitList', {
          joinArrays: '\n'
        })}
      </ExampleText>
    </DemoCard>
  )
}

export default ObjectsArraysCard
