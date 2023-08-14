import { useMutation } from '@tanstack/react-query'
import { logIn } from '@api/auth'
import { logInAsyncSuccess } from '@api/authSlice'
import useAppDispatch from '@hooks/useAppDispatch'
import { clearPersistence } from '@redux/persistence'
import { resetStore } from '@redux/rootActions'
import { persistor } from '@redux/store'

export const useLogInMutation = () => {
  const dispatch = useAppDispatch()

  return useMutation({
    mutationKey: ['auth', 'logIn'],
    mutationFn: logIn,
    onSuccess: tokens => {
      dispatch(logInAsyncSuccess(tokens))
    },
  })
}

export const useLogOutMutation = () => {
  const dispatch = useAppDispatch()

  return useMutation({
    mutationKey: ['auth', 'logOut'],
    mutationFn: async () => {
      Promise.resolve()
    },
    onSuccess: async () => {
      // typical logout for apps that require user to be logged in
      // before giving any further access
      persistor.pause()
      await clearPersistence()
      dispatch(resetStore())
      persistor.persist()
    },
  })
}
