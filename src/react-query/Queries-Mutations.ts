import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import authService from '../appwrite-services/auth-service'
import { ILoginData, ISignUpData } from '../models/AuthData'

export const useUserAccountCreation = () => {
  return useMutation({
    mutationFn:(user: ISignUpData) => authService.createAccount(user)
  })
}

export const useSignInMutation = () => {
  return useMutation({
    mutationFn:(user: ILoginData) => authService.userLogin(user)
  })
}