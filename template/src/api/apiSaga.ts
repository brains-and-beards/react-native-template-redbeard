import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { getErrorMessage } from '@utils/getMessageFromError'
import tryJson from '@utils/tryJson'
import { call, delay, put, race } from 'redux-saga/effects'
import { API_TIMEOUT } from '@config/timing'

export type SuccessResponse = { json: object; headers: Headers }
type ApiCallResponse = Response | undefined

interface ApiCallOptions {
  onError: ActionCreatorWithPayload<Error['message'], string>
}

export function* makeApiCall<P>(
  apiRequest: (payload?: P) => Promise<ApiCallResponse>,
  options: ApiCallOptions & { payload?: P },
): Generator<unknown, SuccessResponse | null> {
  const { payload, onError } = options

  try {
    const { apiResponse, timeout } = (yield race({
      apiResponse: call(apiRequest, payload),
      timeout: delay(API_TIMEOUT),
    })) as { apiResponse?: ApiCallResponse; timeout?: boolean }

    if (timeout) {
      throw new Error('Request timed out.')
    }

    const headers = apiResponse?.headers
    if (!apiResponse || !headers) {
      const error = new Error('no API response or headers')
      throw error
    }

    if (!apiResponse.ok) {
      const message = `Server returned ${apiResponse.status} code! Response: ${tryJson(
        apiResponse,
      )}`
      throw new Error(message)
    }

    const parsedResponse = (yield apiResponse.json()) as object | { errors: string[] }

    // eslint-disable-next-line no-prototype-builtins
    if (parsedResponse.hasOwnProperty('errors')) {
      const errorJSON = parsedResponse as { errors: string[] }
      throw new Error(errorJSON.errors.join(', '))
    }

    const json = parsedResponse as object
    return { json, headers }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[makeApiCall] Error:', getErrorMessage(error))
    yield put(onError(getErrorMessage(error)))

    return null
  }
}
