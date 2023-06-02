import { AuthTokens } from './common'
import { Credentials } from './types/auth.types'

// This is the place where you want to call your auth provider API
/* eslint-disable @typescript-eslint/no-unused-vars */

export const logIn = (credentials: Credentials) => {
  return new Promise<{ accessToken: string; refreshToken: string }>(resolve => {
    const fakeAuthTokens = { accessToken: 'FAKE_ACCESS_TOKEN', refreshToken: 'FAKE_REFRESH_TOKEN' }
    setTimeout(() => resolve(fakeAuthTokens), 500)
  })
}

export const refreshTokens = (refreshToken: AuthTokens['refreshToken']) => {
  return new Promise<{ accessToken: string; refreshToken: string }>(resolve => {
    const fakeRefreshedAuthTokens = {
      accessToken: 'REFRESHED_ACCESS_TOKEN',
      refreshToken: 'REFRESHED_REFRESH_TOKEN',
    }
    setTimeout(() => resolve(fakeRefreshedAuthTokens), 500)
  })
}
