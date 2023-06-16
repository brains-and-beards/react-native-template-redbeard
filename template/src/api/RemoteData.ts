export enum RemoteDataType {
  NOT_REQUESTED = 'NOT_REQUESTED',
  LOADING = 'LOADING',
  REFRESHING = 'REFRESHING',
  FAILURE = 'FAILURE',
  SUCCESS = 'SUCCESS',
}

type NotRequestedType = {
  type: RemoteDataType.NOT_REQUESTED
}

type LoadingType = {
  type: RemoteDataType.LOADING
}

type RefreshingType<T> = {
  type: RemoteDataType.REFRESHING
  data: T
}

type FailureType<E> = {
  type: RemoteDataType.FAILURE
  error: E
}

type SuccessType<T> = {
  type: RemoteDataType.SUCCESS
  data: T
}

// Constructors

export const NotRequested: NotRequestedType = {
  type: RemoteDataType.NOT_REQUESTED,
}

export const Loading: LoadingType = { type: RemoteDataType.LOADING }

export const Refreshing = <T>(data: T): RefreshingType<T> => ({
  type: RemoteDataType.REFRESHING,
  data,
})

export const Failure = <E>(error: E): FailureType<E> => ({
  type: RemoteDataType.FAILURE,
  error,
})

export const Success = <T>(data: T): SuccessType<T> => ({
  type: RemoteDataType.SUCCESS,
  data,
})

export type RemoteData<T, E> =
  | NotRequestedType
  | LoadingType
  | RefreshingType<T>
  | FailureType<E>
  | SuccessType<T>

export const isNotRequested = <T, E>(
  remoteData: RemoteData<T, E>,
): remoteData is NotRequestedType => remoteData.type === RemoteDataType.NOT_REQUESTED

export const isLoading = <T, E>(remoteData: RemoteData<T, E>): remoteData is LoadingType =>
  remoteData.type === RemoteDataType.LOADING

export const isRefreshing = <T, E>(remoteData: RemoteData<T, E>): remoteData is RefreshingType<T> =>
  remoteData.type === RemoteDataType.REFRESHING

export const isFailure = <T, E>(remoteData: RemoteData<T, E>): remoteData is FailureType<E> =>
  remoteData.type === RemoteDataType.FAILURE

export const isSuccess = <T, E>(remoteData: RemoteData<T, E>): remoteData is SuccessType<T> =>
  remoteData.type === RemoteDataType.SUCCESS

export const hasData = <T, E>(
  remoteData: RemoteData<T, E>,
): remoteData is SuccessType<T> | RefreshingType<T> =>
  isSuccess(remoteData) || isRefreshing(remoteData)
