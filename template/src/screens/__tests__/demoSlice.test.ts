import {
  decrementCounterBy,
  demoSlice,
  fetchLatestComic,
  getLatestComicAsync,
  getLatestComicAsyncFailure,
  getLatestComicAsyncSuccess,
  incrementCounterBy,
} from '@screens/demoSlice';
import {comicMockParsed, comicMockResponse} from '__mocks__/fixtures';
import {getMockedApiResponse} from '__mocks__/mockedApi';
import {expectSaga} from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import {throwError} from 'redux-saga-test-plan/providers';
import {getLatestComic} from '../../api/comics';
import {Failure, Loading, Refreshing, Success} from '../../models/RemoteData';

describe('DemoSlice', () => {
  describe('Demo saga fetchLatestComic', () => {
    it('dispatches success action when the request succeed', () => {
      return expectSaga(fetchLatestComic)
        .provide([
          [
            matchers.call.fn(getLatestComic),
            getMockedApiResponse(jest.fn(() => comicMockResponse)),
          ],
        ])
        .put(getLatestComicAsyncSuccess(comicMockParsed))
        .run();
    });

    it('dispatches error action when the request fails', () => {
      const error = new Error('Demo error');

      return expectSaga(fetchLatestComic)
        .provide([[matchers.call.fn(getLatestComic), throwError(error)]])
        .put(getLatestComicAsyncFailure(error.message))
        .run();
    });
  });

  const initialState = demoSlice.getInitialState();

  describe('Demo reducer', () => {
    it('has expected initial state', () => {
      const result = demoSlice.reducer(undefined, {type: 'INIT'});
      expect(result).toEqual(initialState);
    });

    it('set incrementCounterBy state', () => {
      const result = demoSlice.reducer(initialState, {
        type: incrementCounterBy,
        payload: 10,
      });

      expect(result.counter).toEqual(430);
    });

    it('set decrementCounterBy state', () => {
      const result = demoSlice.reducer(initialState, {
        type: decrementCounterBy,
        payload: 10,
      });

      expect(result.counter).toEqual(410);
    });

    it('set getLatestComicAsync to Loading if there is no comic in store', () => {
      const result = demoSlice.reducer(initialState, {
        type: getLatestComicAsync,
        payload: comicMockResponse,
      });

      expect(result.comic).toEqual(Loading);
    });

    it('set getLatestComicAsync to Loading if there is no comic in store', () => {
      const result = demoSlice.reducer(initialState, {
        type: getLatestComicAsync,
        payload: comicMockResponse,
      });

      expect(result.comic).toEqual(Loading);
    });

    it('set getLatestComicAsync to Refreshing if there is already comic in store', () => {
      const newInitialState = {
        ...initialState,
        comic: Success(comicMockParsed),
      };

      const result = demoSlice.reducer(newInitialState, {
        type: getLatestComicAsync,
        payload: comicMockResponse,
      });

      expect(result.comic).toEqual(Refreshing(comicMockParsed));
    });

    it('set getLatestComicAsyncSuccess state', () => {
      const result = demoSlice.reducer(initialState, {
        type: getLatestComicAsyncSuccess,
        payload: comicMockResponse,
      });

      expect(result.comic).toEqual(Success(comicMockResponse));
    });

    it('set getLatestComicAsyncFailure state', () => {
      const error = 'Error message';
      const result = demoSlice.reducer(initialState, {
        type: getLatestComicAsyncFailure,
        payload: error,
      });

      expect(result.comic).toEqual(Failure(error));
    });
  });
});
