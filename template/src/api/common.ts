import Config from 'react-native-config'
import { API_TIMEOUT } from '@config/timing'
import { HttpError, getErrorMessage, isTimeoutError } from '@utils/error'
import { refreshTokens } from './auth'

interface RequestParams extends Omit<RequestInit, 'body' | 'signal'> {
  path: string
  body?: Record<string, unknown>
}

type SimplifiedRequestParams = Omit<RequestParams, 'method'>

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}
interface AuthConfig extends Partial<AuthTokens> {
  persistNewTokens?: (tokens: AuthTokens) => void
}

const authConfig: AuthConfig = {
  accessToken: undefined,
  refreshToken: undefined,
  persistNewTokens: undefined,
}

export function setAuthConfig(newConfig: AuthConfig) {
  Object.assign(authConfig, newConfig)
}

async function makeRequest<T>(params: RequestParams, isFirstTry = true): Promise<T> {
  // Change the default request timeout
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

  const { path, ...restParams } = params
  try {
    const response = await fetch(`${Config.API_URL}/${path}`, {
      ...restParams,
      body: JSON.stringify(restParams.body),
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...restParams.headers,
      },
    })

    const isAuthenticatedRequest = restParams.headers && 'authorization' in restParams.headers
    if (response.status === 401 && isFirstTry && isAuthenticatedRequest) {
      return refreshTokensAndRetryRequest<T>(params)
    }

    const hasBody = !!(await response.clone().text())
    const body = hasBody ? await response.json() : null

    if (!response.ok) {
      const readableBody = body ? ` and ${JSON.stringify(body, null, 2)}` : ''
      throw new HttpError(
        `Server returned ${response.status}${readableBody}`,
        response.status,
        body,
      )
    }

    return body
  } catch (error) {
    // Log all the errors and rethrow to parent handlers
    const errorMessage = isTimeoutError(error) ? 'Request timed out' : getErrorMessage(error)
    console.warn(`#makeRequest failed on /${path}: ${errorMessage}`)

    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}

async function refreshTokensAndRetryRequest<T>(params: RequestParams) {
  if (!authConfig.refreshToken) {
    throw new Error('Tokens cannot be refreshed without the refresh token')
  }

  if (!authConfig.persistNewTokens) {
    throw new Error("Tokens won't be persisted without redux handler for it")
  }

  let newTokens: AuthTokens

  try {
    newTokens = await refreshTokens(authConfig.refreshToken)
  } catch (error) {
    throw new Error(`Failed to refresh expired auth tokens - ${getErrorMessage(error)}`)
  }

  authConfig.persistNewTokens(newTokens)
  const refreshedParams: RequestParams = {
    ...params,
    headers: {
      ...params.headers,
      authorization: `Bearer ${newTokens.accessToken}`,
    },
  }

  return makeRequest<T>(refreshedParams, false)
}

export const getRequest = <T>(params: SimplifiedRequestParams) => {
  const getParams: RequestParams = {
    ...params,
    method: 'GET',
  }
  return makeRequest<T>(getParams)
}

export const postRequest = <T>(params: SimplifiedRequestParams) => {
  const postParams: RequestParams = {
    ...params,
    method: 'POST',
  }
  return makeRequest<T>(postParams)
}

export const putRequest = <T>(params: SimplifiedRequestParams) => {
  const putParams: RequestParams = {
    ...params,
    method: 'PUT',
  }
  return makeRequest<T>(putParams)
}

export const patchRequest = <T>(params: SimplifiedRequestParams) => {
  const patchParams: RequestParams = {
    ...params,
    method: 'PATCH',
  }
  return makeRequest<T>(patchParams)
}

export const deleteRequest = <T>(params: SimplifiedRequestParams) => {
  const deleteParams: RequestParams = {
    ...params,
    method: 'DELETE',
  }
  return makeRequest<T>(deleteParams)
}

const withAuth = (params: RequestParams): RequestParams => {
  if (!authConfig.accessToken) {
    throw new Error('Authenticated request cannot be made without the token')
  }

  return {
    ...params,
    headers: {
      ...params.headers,
      authorization: `Bearer ${authConfig.accessToken}`,
    },
  }
}

export const authGetRequest = <T>(params: SimplifiedRequestParams) =>
  getRequest<T>(withAuth(params))
export const authPostRequest = <T>(params: SimplifiedRequestParams) =>
  postRequest<T>(withAuth(params))
export const authPutRequest = <T>(params: SimplifiedRequestParams) =>
  putRequest<T>(withAuth(params))
export const authPatchRequest = <T>(params: SimplifiedRequestParams) =>
  patchRequest<T>(withAuth(params))
export const authDeleteRequest = <T>(params: SimplifiedRequestParams) =>
  deleteRequest<T>(withAuth(params))

export const testExports = {
  makeRequest,
}
