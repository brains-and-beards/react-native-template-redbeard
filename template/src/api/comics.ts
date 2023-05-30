import { getRequest } from './common'
import { ComicBE } from './types/comic.types'

export const getLatestComic = () => getRequest<ComicBE>({ path: 'info.0.json' })
