import React from 'react'
import { TestIDs } from '@config/testIDs'
import Routes from '@navigation/routes'
import { RemoteDataStates } from '@utils/api'
import { createNavigationProps, fireEvent, render } from '@utils/testing'
import DemoScreen from './DemoScreen'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const navPropsMock = createNavigationProps() as any

describe('when increment button pressed', () => {
  it('should increment counter by 5', () => {
    const { getByText } = render(<DemoScreen {...navPropsMock} />)
    const prevCounterValue = parseInt(
      getByText(/demoScreen.counter/).props.children.split(' ')[1],
      10,
    )
    fireEvent.press(getByText(/demoScreen.incrementButton/))
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
    fireEvent.press(getByText(/demoScreen.decrementButton/))
    const counterValue = parseInt(getByText(/demoScreen.counter/).props.children.split(' ')[1], 10)

    expect(counterValue).toBe(prevCounterValue - 15)
  })
})

describe('Comic card', () => {
  describe('when comic is available', () => {
    it('renders the comic', () => {
      const comicMock = {
        id: 1,
        title: 'Some mock title',
        imageUrl: 'http://example.com/test.jpg',
        description: 'Some mock description',
      }
      const preloadedState = {
        demo: {
          counter: 420,
          comic: {
            state: RemoteDataStates.SUCCESS as const,
            data: comicMock,
          },
        },
      }
      const { getByText, getByTestId } = render(<DemoScreen {...navPropsMock} />, {
        preloadedState,
      })

      expect(getByText(comicMock.title)).toBeDefined()
      expect(getByText(comicMock.description)).toBeDefined()
      expect(getByTestId(TestIDs.DEMO_COMIC_IMAGE)).toBeDefined()
    })
  })

  describe('when NO comic is available', () => {
    it('renders the loading spinner', () => {
      const preloadedState = {
        demo: {
          counter: 420,
          comic: {
            state: RemoteDataStates.LOADING as const,
          },
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
    fireEvent.press(getByText(/demoScreen.goToTranslationsDemo/))

    expect(navPropsMock.navigation.navigate).toBeCalledWith(Routes.TRANSLATIONS_DEMO_SCREEN)
  })
})
