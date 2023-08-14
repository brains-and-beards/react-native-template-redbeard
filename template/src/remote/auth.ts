import { useMutation } from '@tanstack/react-query'
import { logIn } from '@api/auth'
import { logInAsyncSuccess } from '@api/authSlice'
import useAppDispatch from '@hooks/useAppDispatch'

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
