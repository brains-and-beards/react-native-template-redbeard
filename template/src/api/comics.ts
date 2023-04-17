import { makeRequest } from './common'

export const getLatestComic = () =>
  makeRequest({
    path: 'info.0.json',
    method: 'GET'
  })
