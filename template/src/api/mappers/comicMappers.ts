import { Comic, ComicBE } from '@api/types/comic.types'

export const mapComic = (comic: ComicBE): Comic => ({
  id: comic.num,
  title: comic.title,
  description: comic.alt,
  imageUrl: comic.img,
})
