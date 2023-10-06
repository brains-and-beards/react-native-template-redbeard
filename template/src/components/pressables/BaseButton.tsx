import React from 'react'
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
  disabled?: boolean | null
  onPress?: () => void
  variant?: RoundButtonType
  style?: StyleProp<ViewStyle>
  styleText?: StyleProp<TextStyle>
  rootStyle?: StyleProp<ViewStyle>
  hitSlop?: null | Insets | number
  loading?: boolean
}

const BaseButton: FC<BaseButtonPropsType> = ({
  disabled,
  onPress,
  variant = 'primary',
  style,
  styleText,
  rootStyle,
  hitSlop,
  loading,
  children,
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
      disabled={disabled}
      style={({ pressed }) => [rootStyle, { opacity: pressed ? 0.6 : 1 }]}
    >
      <View style={wrapperStyles}>
        <Text style={textStyles}>{children}</Text>
        {loading ? <ActivityIndicator size="small" style={styles.loadingIndicator} /> : null}
        {disabled ? <View style={styles.disabled} /> : null}
      </View>
    </Pressable>
  )
}

export default BaseButton

const styles = StyleSheet.create({
  disabled: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.transparentBlack,
  },
  loadingIndicator: {
    marginLeft: 5,
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
