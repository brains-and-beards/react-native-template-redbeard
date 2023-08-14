import { useQuery } from '@tanstack/react-query'
import { getLatestComic } from '@api/comics'
import { mapComic } from '@api/mappers/comicMappers'

export const useLatestComicQuery = () => {
  return useQuery({
    queryKey: ['comic', 'latest'],
    queryFn: getLatestComic,
    select: comicBE => mapComic(comicBE),
  })
}
