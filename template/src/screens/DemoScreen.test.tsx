import { comicMockParsed } from '__mocks__/fixtures'
import React from 'react'
import { TestIDs } from '@config/testIDs'
import Routes from '@navigation/routes'
import * as remoteComics from '@remote/comics'
import { act, createNavigationProps, fireEvent, render } from '@utils/testing'
import DemoScreen from './DemoScreen'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const navPropsMock = createNavigationProps() as any

const mockUseLatestComicQuery = jest.spyOn(remoteComics, 'useLatestComicQuery').mockReturnValue({
  isLoading: false,
  data: undefined,
} as ReturnType<typeof remoteComics.useLatestComicQuery>)

jest.mock('@remote/auth', () => ({
  useLogOutMutation: jest.fn().mockImplementation(() => ({
    mutate: jest.fn(),
    isPending: false,
  })),
}))

describe('when increment button pressed', () => {
  it('should increment counter by 5', () => {
    const { getByText } = render(<DemoScreen {...navPropsMock} />)
    const prevCounterValue = parseInt(
      getByText(/demoScreen.counter/).props.children.split(' ')[1],
      10,
    )
    act(() => {
      fireEvent.press(getByText(/demoScreen.incrementButton/))
    })

    const counterValue = parseInt(getByText(/demoScreen.counter/).props.children.split(' ')[1], 10)

    expect(counterValue).toBe(prevCounterValue + 5)
  })
})

describe('when decrement button pressed', () => {
  it('should decrement counter by 15', () => {
    const { getByText } = render(<DemoScreen {...navPropsMock} />)
    const prevCounterValue = parseInt(
      getByText(/demoScreen.counter/).props.children.split(' ')[1],
      10,
    )

    act(() => {
      fireEvent.press(getByText(/demoScreen.decrementButton/))
    })
    const counterValue = parseInt(getByText(/demoScreen.counter/).props.children.split(' ')[1], 10)

    expect(counterValue).toBe(prevCounterValue - 15)
  })
})

describe('Comic card', () => {
  describe('when comic is available', () => {
    it('renders the comic', async () => {
      mockUseLatestComicQuery.mockReturnValueOnce({
        isLoading: false,
        data: comicMockParsed,
      } as ReturnType<typeof remoteComics.useLatestComicQuery>)

      const preloadedState = {
        demo: {
          counter: 420,
        },
      }

      const { getByText, getByTestId } = render(<DemoScreen {...navPropsMock} />, {
        preloadedState,
      })

      expect(getByText(comicMockParsed.title)).toBeDefined()
      expect(getByText(comicMockParsed.description)).toBeDefined()
      expect(getByTestId(TestIDs.DEMO_COMIC_IMAGE)).toBeDefined()
    })
  })

  describe('when NO comic is available', () => {
    mockUseLatestComicQuery.mockReturnValue({
      isLoading: true,
      data: undefined,
    } as ReturnType<typeof remoteComics.useLatestComicQuery>)

    it('renders the loading spinner', () => {
      const preloadedState = {
        demo: {
          counter: 420,
        },
      }

      const { getByTestId } = render(<DemoScreen {...navPropsMock} />, {
        preloadedState,
      })

      expect(getByTestId(TestIDs.DEMO_COMIC_SPINNER)).toBeDefined()
    })
  })
})

describe('when "go to translations demo" pressed', () => {
  it('should navigate to translations demo screen', () => {
    const { getByText } = render(<DemoScreen {...navPropsMock} />)
    act(() => {
      fireEvent.press(getByText(/demoScreen.goToTranslationsDemo/))
    })

    expect(navPropsMock.navigation.navigate).toBeCalledWith(Routes.TRANSLATIONS_DEMO_SCREEN)
  })
})
