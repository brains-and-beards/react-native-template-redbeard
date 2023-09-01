import { renderHook, waitFor } from '@testing-library/react-native'
import { logIn } from '@api/auth'
import { logInAsyncSuccess } from '@api/authSlice'
import { setAuthConfig } from '@api/common'
import * as persistence from '@redux/persistence'
import { resetStore } from '@redux/rootActions'
import { persistor } from '@redux/store'
import { createTestEnvWrapper } from '@utils/testing'
import { useLogInMutation, useLogOutMutation } from './auth'

const mockCredentials = {
  username: 'testUsername',
  password: 'testPassword',
}

const mockTokens = {
  accessToken: 'testAccessToken',
  refreshToken: 'testRefreshToken',
}

jest.mock('@api/auth', () => ({
  logIn: jest.fn(),
}))
const mockLogIn = logIn as jest.MockedFunction<typeof logIn>
mockLogIn.mockResolvedValue(mockTokens)

jest.mock('@api/common', () => ({
  setAuthConfig: jest.fn(),
}))
const mockSetAuthConfig = setAuthConfig as jest.MockedFunction<typeof setAuthConfig>

const mockDispatch = jest.fn()
jest.mock('@hooks/useAppDispatch', () => ({
  __esModule: true,
  default: jest.fn(() => {
    return mockDispatch
  }),
}))

jest.mock('@redux/store', () => ({
  persistor: {
    pause: jest.fn(),
    persist: jest.fn(),
  },
}))

jest.useFakeTimers()

describe('auth', () => {
  let wrapper: ReturnType<typeof createTestEnvWrapper>

  beforeEach(() => {
    jest.clearAllMocks()
    wrapper = createTestEnvWrapper({})
  })

  describe('useLogInMutation', () => {
    it('calls onSuccess', async () => {
      const { result } = renderHook(() => useLogInMutation(), { wrapper })

      result.current.mutate(mockCredentials)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current).toMatchObject({
        isSuccess: true,
        data: mockTokens,
      })

      expect(mockSetAuthConfig).toHaveBeenCalledTimes(1)
      expect(mockSetAuthConfig).toHaveBeenLastCalledWith(mockTokens)
      expect(mockDispatch).toHaveBeenCalledTimes(1)
      expect(mockDispatch).toHaveBeenLastCalledWith(logInAsyncSuccess(mockTokens))
    })
  })

  describe('useLogOutMutation', () => {
    it('calls onSuccess', async () => {
      const mockClearPersistence = jest.spyOn(persistence, 'clearPersistence')

      const { result } = renderHook(() => useLogOutMutation(), { wrapper })

      result.current.mutate()

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current).toMatchObject({
        isSuccess: true,
        data: undefined,
      })

      expect(persistor.pause).toHaveBeenCalledTimes(1)
      expect(mockClearPersistence).toHaveBeenCalledTimes(1)
      expect(mockSetAuthConfig).toHaveBeenCalledTimes(1)
      expect(mockSetAuthConfig).toHaveBeenLastCalledWith({})
      expect(mockDispatch).toHaveBeenCalledTimes(1)
      expect(mockDispatch).toHaveBeenLastCalledWith(resetStore())
      expect(persistor.persist).toHaveBeenCalledTimes(1)
    })
  })
})
