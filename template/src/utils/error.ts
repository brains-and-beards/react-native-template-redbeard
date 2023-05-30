export class HttpError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body: Record<string, unknown> | null,
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

export function isHttpError(error: unknown): error is HttpError {
  return error instanceof HttpError
}

export function isTimeoutError(error: unknown) {
  return error instanceof Error && error.name === 'AbortError'
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }
  return String(error)
}
