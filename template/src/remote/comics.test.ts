import { renderHook, waitFor } from '@testing-library/react-native'
import { getLatestComic } from '@api/comics'
import { Comic, ComicBE } from '@api/types/comic.types'
import { createTestEnvWrapper } from '@utils/testing'
import { useLatestComicQuery } from './comics'

const mockComicBE: ComicBE = {
  num: 1,
  title: 'test title',
  alt: 'test description',
  img: 'test image url',
} as ComicBE

const mockComic: Comic = {
  id: 1,
  title: 'test title',
  description: 'test description',
  imageUrl: 'test image url',
}

const mockGetLatestComic = getLatestComic as jest.MockedFunction<typeof getLatestComic>

jest.mock('@api/comics', () => ({
  getLatestComic: jest.fn().mockRejectedValue(mockComicBE),
}))

jest.useFakeTimers()

describe('comics', () => {
  let wrapper: ReturnType<typeof createTestEnvWrapper>

  beforeEach(() => {
    jest.clearAllMocks()
    wrapper = createTestEnvWrapper({})
  })

  describe('useLatestComicQuery', () => {
    it('is initially loading', async () => {
      const { result } = renderHook(() => useLatestComicQuery(), { wrapper })

      expect(result.current).toMatchObject({
        isLoading: true,
        isSuccess: false,
        data: undefined,
      })
    })

    it('should fetch the latest comic', async () => {
      mockGetLatestComic.mockResolvedValueOnce(mockComicBE)

      const { result } = renderHook(() => useLatestComicQuery(), { wrapper })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(getLatestComic).toHaveBeenCalledTimes(1)

      expect(result.current).toMatchObject({
        data: mockComic,
        isLoading: false,
        isSuccess: true,
      })
    })
  })
})
