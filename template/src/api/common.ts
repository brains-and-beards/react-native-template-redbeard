import Config from 'react-native-config'

interface RequestParams extends RequestInit {
  path: string
}

export const makeRequest = async (params: RequestParams) => {
  const { path, ...restParams } = params
  try {
    const response = await fetch(`${Config.API_URL}/${path}`, {
      ...restParams,
      headers: {
        Accept: 'application/json',
        ...restParams.headers,
      },
    })
    return response
  } catch (error) {
    console.error('[makeRequest] Error:', error)
  }
}
