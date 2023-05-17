import React, { ReactElement } from 'react'
import {
  ActivityIndicator,
  Insets,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import colors from '@config/ui/colors'
import { FC } from '@utils/types'

const BORDER_RADIUS = 5

type RoundButtonType = 'primary' | 'secondary'

export type BaseButtonPropsType = {
  isDisabled?: boolean | null
  onPress?: () => void
  iconAtStart?: ReactElement
  iconAtEnd?: ReactElement
  text?: string | ReactElement
  variant?: RoundButtonType
  style?: StyleProp<ViewStyle>
  styleText?: StyleProp<TextStyle>
  rootStyle?: StyleProp<ViewStyle>
  hitSlop?: null | Insets | number
  isLoading?: boolean
}

const BaseButton: FC<BaseButtonPropsType> = ({
  isDisabled,
  onPress,
  iconAtStart,
  iconAtEnd,
  text,
  variant = 'primary',
  style,
  styleText,
  rootStyle,
  hitSlop,
  isLoading,
}) => {
  const wrapperStyles = [
    styles.wrapper,
    variant === 'primary' && styles.primary,
    variant === 'secondary' && styles.secondary,
    style,
  ]
  const textStyles = [
    variant === 'primary' && styles.textPrimary,
    variant === 'secondary' && styles.textSecondary,
    styleText,
  ]

  return (
    <Pressable
      hitSlop={hitSlop}
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [rootStyle, { opacity: pressed ? 0.6 : 1 }]}
    >
      <View style={wrapperStyles}>
        {iconAtStart ? <View style={styles.iconAtStartWrapper}>{iconAtStart}</View> : null}
        {text ? <Text style={textStyles}>{text}</Text> : null}
        {iconAtEnd ? <View style={styles.iconAtEndWrapper}>{iconAtEnd}</View> : null}

        {isLoading ? <ActivityIndicator size="small" /> : null}
        {isDisabled ? <View style={styles.disabled} /> : null}
      </View>
    </Pressable>
  )
}

export default BaseButton

const styles = StyleSheet.create({
  disabled: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.transparentDisabledButton,
  },
  iconAtEndWrapper: {
    marginLeft: 8,
  },
  iconAtStartWrapper: {
    marginRight: 8,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.transparent,
    borderWidth: 0,
  },
  textPrimary: {
    color: colors.onPrimary,
  },
  textSecondary: {
    color: colors.secondary,
  },
  wrapper: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
  },
})
