import React from 'react'

export type FC<T = unknown> = React.FC<React.PropsWithChildren<T>>

export type ErrorWithMessage = {
  message: string
}
