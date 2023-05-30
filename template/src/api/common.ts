import { API_TIMEOUT } from '@config/timing';
import { HttpError, getErrorMessage, isTimeoutError } from '@utils/error';
import Config from 'react-native-config'

interface RequestParams extends Omit<RequestInit, 'body' | 'signal'> {
  path: string
  body?: Record<string, unknown>
}

type SimplifiedRequestParams = Omit<RequestParams, 'method'>

async function makeRequest<T>(params: RequestParams): Promise<T> {
  // Change the default request timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  const {path, ...restParams} = params;
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
    });

    const hasBody = parseInt(response.headers.get('content-length')!) !== 0;
    const body = hasBody ? await response.json() : null

    if (!response.ok) {
      const readableBody = body ? ` and ${JSON.stringify(body, null, 2)}` : '';
      throw new HttpError(`Server returned ${response.status}${readableBody}`, response.status, body);
    }

    return <T>body;
  } catch (error) {
    // Log all the errors and rethrow to parent handlers
    const errorMessage = isTimeoutError(error) ? 'Request timed out' : getErrorMessage(error)
    console.warn(`#makeRequest failed on /${path}: ${errorMessage}`);

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
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
