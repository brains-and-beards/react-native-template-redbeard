export enum RemoteDataType {
  NotRequested = 'NotRequested',
  Loading = 'Loading',
  Refreshing = 'Refreshing',
  Failure = 'Failure',
  Success = 'Success'
}

type NotRequestedType = {
  type: RemoteDataType.NotRequested
}

type LoadingType = {
  type: RemoteDataType.Loading
}

type RefreshingType<T> = {
  type: RemoteDataType.Refreshing
  data: T
}

export type FailureType<E> = {
  type: RemoteDataType.Failure
  error: E
}

export type SuccessType<T> = {
  type: RemoteDataType.Success
  data: T
}

// Constructors

export const NotRequested: NotRequestedType = {
  type: RemoteDataType.NotRequested
}

export const Loading: LoadingType = { type: RemoteDataType.Loading }

export const Refreshing = <T>(data: T): RefreshingType<T> => ({
  type: RemoteDataType.Refreshing,
  data
})

export const Failure = <E>(error: E): FailureType<E> => ({
  type: RemoteDataType.Failure,
  error
})

export const Success = <T>(data: T): SuccessType<T> => ({
  type: RemoteDataType.Success,
  data
})

export type RemoteData<T, E> =
  | NotRequestedType
  | LoadingType
  | RefreshingType<T>
  | FailureType<E>
  | SuccessType<T>

export const isNotRequested = <T, E>(
  remoteData: RemoteData<T, E>
): remoteData is NotRequestedType => remoteData.type === RemoteDataType.NotRequested

export const isLoading = <T, E>(remoteData: RemoteData<T, E>): remoteData is LoadingType =>
  remoteData.type === RemoteDataType.Loading

export const isRefreshing = <T, E>(remoteData: RemoteData<T, E>): remoteData is RefreshingType<T> =>
  remoteData.type === RemoteDataType.Refreshing

export const isFailure = <T, E>(remoteData: RemoteData<T, E>): remoteData is FailureType<E> =>
  remoteData.type === RemoteDataType.Failure

export const isSuccess = <T, E>(remoteData: RemoteData<T, E>): remoteData is SuccessType<T> =>
  remoteData.type === RemoteDataType.Success

export const hasData = <T, E>(
  remoteData: RemoteData<T, E>
): remoteData is SuccessType<T> | RefreshingType<T> =>
  isSuccess(remoteData) || isRefreshing(remoteData)
