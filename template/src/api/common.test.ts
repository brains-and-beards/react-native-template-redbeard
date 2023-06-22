import { comicMockResponse } from '__mocks__/fixtures'
import Config from 'react-native-config'
import { HttpError } from '@utils/error'
import { refreshTokens } from './auth'
import {
  authDeleteRequest,
  authGetRequest,
  authPatchRequest,
  authPostRequest,
  authPutRequest,
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  putRequest,
  setAuthConfig,
  testExports,
} from './common'

jest.mock('./auth', () => ({
  refreshTokens: jest.fn().mockResolvedValue(fakeRefreshedAuthTokens),
}))

const fakeAuthTokens = {
  accessToken: 'FAKE_ACCESS_TOKEN',
  refreshToken: 'FAKE_REFRESH_TOKEN',
}
const fakeRefreshedAuthTokens = {
  accessToken: 'REFRESHED_ACCESS_TOKEN',
  refreshToken: 'REFRESHED_REFRESH_TOKEN',
}
const fakeRequestPath = 'path/mock'

afterEach(() => {
  jest.clearAllMocks()
  fetchMock.resetMocks()
})

describe('#makeRequest', () => {
  const { makeRequest } = testExports

  const fakeRequestParams = {
    path: fakeRequestPath,
    method: 'POST',
    body: {
      fakeProperty1: 'fakeValue1',
      fakeProperty2: 'fakeValue2',
    },
  }

  it('should call the API with proper headers and body', async () => {
    await makeRequest(fakeRequestParams)

    expect(fetchMock).toHaveBeenCalledWith(
      `${Config.API_URL}/${fakeRequestParams.path}`,
      expect.objectContaining({
        body: JSON.stringify(fakeRequestParams.body),
        headers: expect.objectContaining({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }),
    )
  })

  it('should return response body from successfull calls', async () => {
    fetchMock.once(JSON.stringify(comicMockResponse))
    const result = await makeRequest(fakeRequestParams)

    expect(result).toEqual(comicMockResponse)
  })

  it('should throw an HttpError on responses that are not ok', async () => {
    const errorMessage = 'Not found'
    const errorStatus = 404
    const errorResponse = { error: errorMessage }
    fetchMock.once(JSON.stringify(errorResponse), { status: errorStatus })

    try {
      await makeRequest(fakeRequestParams)
      // Fail the test if makeRequest doesn't throw an error
      fail('#makeRequest did not throw an error')
    } catch (err) {
      const error = err as HttpError
      expect(error).toBeInstanceOf(HttpError)
      expect(error.body).toEqual(errorResponse)
      expect(error.status).toBe(404)
      expect(error.message).toBe(
        `Server returned ${errorStatus} and {\n  "error": "${errorMessage}"\n}`,
      )
    }
  })

  it('should rethrow any catched error', async () => {
    const randomError = new Error('Random error')
    fetchMock.mockRejectOnce(randomError)
    await expect(makeRequest(fakeRequestParams)).rejects.toThrow(randomError)
  })

  describe('when token expired', () => {
    const fakeAuthRequestParams = {
      ...fakeRequestParams,
      headers: {
        authorization: `Bearer ${fakeAuthTokens.accessToken}`,
      },
    }
    const authErrorResponse = {
      body: JSON.stringify({ error: 'Unauthorized' }),
      init: { status: 401 },
    }

    const persistNewTokensMock = jest.fn()
    beforeEach(() => {
      setAuthConfig({
        ...fakeAuthTokens,
        persistNewTokens: persistNewTokensMock,
      })
      fetchMock.mockResponse(req =>
        req.headers.get('authorization') === `Bearer ${fakeAuthTokens.accessToken}` ||
        req.headers.get('authorization') === null
          ? Promise.resolve(authErrorResponse)
          : Promise.resolve({}),
      )
    })

    it('should retry request with fresh token', async () => {
      await makeRequest(fakeAuthRequestParams)

      expect(refreshTokens).toHaveBeenCalledWith(fakeAuthTokens.refreshToken)
      expect(persistNewTokensMock).toHaveBeenCalledWith(fakeRefreshedAuthTokens)
      expect(fetchMock).toHaveBeenCalledTimes(2)
      expect(fetchMock).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          headers: expect.objectContaining({
            authorization: `Bearer ${fakeAuthTokens.accessToken}`,
          }),
        }),
      )
      expect(fetchMock).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining({
          headers: expect.objectContaining({
            authorization: `Bearer ${fakeRefreshedAuthTokens.accessToken}`,
          }),
        }),
      )
    })

    it('it should not attempt to refresh token when doing unauthenticated calls', async () => {
      await expect(makeRequest(fakeRequestParams)).rejects.toThrow('Unauthorized')
      expect(fetchMock).toHaveBeenCalledTimes(1)
      expect(refreshTokens).not.toHaveBeenCalled()
    })

    it('it should attempt to refresh token only once per call', async () => {
      fetchMock.mockResponse(authErrorResponse.body, authErrorResponse.init)

      await expect(makeRequest(fakeAuthRequestParams)).rejects.toThrow('Unauthorized')
      expect(fetchMock).toHaveBeenCalledTimes(2)
      expect(refreshTokens).toHaveBeenCalledTimes(1)
    })

    it('should throw on auth errors when missing correct auth config', async () => {
      setAuthConfig({
        persistNewTokens: undefined,
      })
      await expect(makeRequest(fakeAuthRequestParams)).rejects.toThrow(
        "Tokens won't be persisted without redux handler for it",
      )

      setAuthConfig({
        refreshToken: undefined,
      })
      await expect(makeRequest(fakeAuthRequestParams)).rejects.toThrow(
        'Tokens cannot be refreshed without the refresh token',
      )
    })
  })
})

describe('basic request creators', () => {
  it('should create a request with "method" property', async () => {
    await getRequest({ path: fakeRequestPath })
    await postRequest({ path: fakeRequestPath })
    await putRequest({ path: fakeRequestPath })
    await patchRequest({ path: fakeRequestPath })
    await deleteRequest({ path: fakeRequestPath })

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      expect.anything(),
      expect.objectContaining({ method: 'GET' }),
    )
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      expect.anything(),
      expect.objectContaining({ method: 'POST' }),
    )
    expect(fetchMock).toHaveBeenNthCalledWith(
      3,
      expect.anything(),
      expect.objectContaining({ method: 'PUT' }),
    )
    expect(fetchMock).toHaveBeenNthCalledWith(
      4,
      expect.anything(),
      expect.objectContaining({ method: 'PATCH' }),
    )
    expect(fetchMock).toHaveBeenNthCalledWith(
      5,
      expect.anything(),
      expect.objectContaining({ method: 'DELETE' }),
    )
    expect(fetchMock).toBeCalledTimes(5)
  })
})

describe('auth request creators', () => {
  it('should create a request with "method" property and "authorization" header', async () => {
    setAuthConfig({
      accessToken: fakeAuthTokens.accessToken,
    })

    await authGetRequest({ path: fakeRequestPath })
    await authPostRequest({ path: fakeRequestPath })
    await authPutRequest({ path: fakeRequestPath })
    await authPatchRequest({ path: fakeRequestPath })
    await authDeleteRequest({ path: fakeRequestPath })

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      expect.anything(),
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          authorization: `Bearer ${fakeAuthTokens.accessToken}`,
        }),
      }),
    )
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      expect.anything(),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          authorization: `Bearer ${fakeAuthTokens.accessToken}`,
        }),
      }),
    )
    expect(fetchMock).toHaveBeenNthCalledWith(
      3,
      expect.anything(),
      expect.objectContaining({
        method: 'PUT',
        headers: expect.objectContaining({
          authorization: `Bearer ${fakeAuthTokens.accessToken}`,
        }),
      }),
    )
    expect(fetchMock).toHaveBeenNthCalledWith(
      4,
      expect.anything(),
      expect.objectContaining({
        method: 'PATCH',
        headers: expect.objectContaining({
          authorization: `Bearer ${fakeAuthTokens.accessToken}`,
        }),
      }),
    )
    expect(fetchMock).toHaveBeenNthCalledWith(
      5,
      expect.anything(),
      expect.objectContaining({
        method: 'DELETE',
        headers: expect.objectContaining({
          authorization: `Bearer ${fakeAuthTokens.accessToken}`,
        }),
      }),
    )
    expect(fetchMock).toBeCalledTimes(5)
  })

  it('should throw when used withous correct config', () => {
    setAuthConfig({
      accessToken: undefined,
    })
    const missingTokenError = 'Authenticated request cannot be made without the token'

    expect(() => authGetRequest({ path: fakeRequestPath })).toThrow(missingTokenError)
    expect(() => authPostRequest({ path: fakeRequestPath })).toThrow(missingTokenError)
    expect(() => authPutRequest({ path: fakeRequestPath })).toThrow(missingTokenError)
    expect(() => authPatchRequest({ path: fakeRequestPath })).toThrow(missingTokenError)
    expect(() => authDeleteRequest({ path: fakeRequestPath })).toThrow(missingTokenError)
  })
})
