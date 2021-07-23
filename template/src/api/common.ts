const API_URL = 'https://xkcd.com'; // TODO replace with .env variable

interface RequestParams extends RequestInit {
  path: string;
}

export const makeRequest = async (params: RequestParams) => {
  const {path, ...restParams} = params;
  try {
    const response = await fetch(`${API_URL}/${path}`, {
      ...restParams,
      headers: {
        Accept: 'application/json',
        ...restParams.headers,
      },
    });
    return response;
  } catch (error) {
    console.error('[makeRequest] Error:', error);
  }
};
