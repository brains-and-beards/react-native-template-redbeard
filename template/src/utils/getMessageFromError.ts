import { ErrorWithMessage } from './types'

const hasMessageField = (error: unknown): error is ErrorWithMessage =>
  typeof (error as Record<string, unknown>)?.message === 'string'

const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
  if (hasMessageField(maybeError)) {
    return maybeError
  }

  try {
    return new Error(JSON.stringify(maybeError))
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError))
  }
}

export const getErrorMessage = (error: unknown) => toErrorWithMessage(error).message
