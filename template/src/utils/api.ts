export enum RemoteDataStates {
  NOT_REQUESTED = 'NOT_REQUESTED',
  LOADING = 'LOADING',
  REFRESHING = 'REFRESHING',
  FAILURE = 'FAILURE',
  SUCCESS = 'SUCCESS',
}

type NotRequestedType = {
  state: RemoteDataStates.NOT_REQUESTED
}

type LoadingType = {
  state: RemoteDataStates.LOADING
}

type RefreshingType<T> = {
  state: RemoteDataStates.REFRESHING
  data: T
}

type FailureType<E, T> = {
  state: RemoteDataStates.FAILURE
  error: E
  data?: T
}

type SuccessType<T> = {
  state: RemoteDataStates.SUCCESS
  data: T
}

// Constructors

export const NotRequested: NotRequestedType = {
  state: RemoteDataStates.NOT_REQUESTED,
}

export const Loading: LoadingType = { state: RemoteDataStates.LOADING }

export const Refreshing = <T>(data: T): RefreshingType<T> => ({
  state: RemoteDataStates.REFRESHING,
  data,
})

export const Pending = <T, E>(remoteData: RemoteData<T, E>) => {
  return hasData(remoteData) ? Refreshing(remoteData.data) : Loading
}

export const Failure = <E, T>(error: E, data?: T): FailureType<E, T> => ({
  state: RemoteDataStates.FAILURE,
  error,
  ...(data && { data }),
})

export const Success = <T>(data: T): SuccessType<T> => ({
  state: RemoteDataStates.SUCCESS,
  data,
})

export type RemoteData<T, E> =
  | NotRequestedType
  | LoadingType
  | RefreshingType<T>
  | FailureType<E, T>
  | SuccessType<T>

export const isNotRequested = <T, E>(
  remoteData: RemoteData<T, E>,
): remoteData is NotRequestedType => remoteData.state === RemoteDataStates.NOT_REQUESTED

export const isLoading = <T, E>(remoteData: RemoteData<T, E>): remoteData is LoadingType =>
  remoteData.state === RemoteDataStates.LOADING

export const isRefreshing = <T, E>(remoteData: RemoteData<T, E>): remoteData is RefreshingType<T> =>
  remoteData.state === RemoteDataStates.REFRESHING

export const isFailure = <T, E>(remoteData: RemoteData<T, E>): remoteData is FailureType<E, T> =>
  remoteData.state === RemoteDataStates.FAILURE

export const isSuccess = <T, E>(remoteData: RemoteData<T, E>): remoteData is SuccessType<T> =>
  remoteData.state === RemoteDataStates.SUCCESS

export const hasData = <T, E>(
  remoteData: RemoteData<T, E>,
): remoteData is SuccessType<T> | RefreshingType<T> | Required<FailureType<E, T>> =>
  !!(remoteData as SuccessType<T> | RefreshingType<T> | Required<FailureType<E, T>>).data
