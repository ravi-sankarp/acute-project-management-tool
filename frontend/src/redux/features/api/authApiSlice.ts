import {
  IGetUserDataResponse,
  ILoginPayload,
  IRegisterPayload,
  IUserInterface,
  TLoginApiResponse
} from '../../../Types/UserInterface';
import apiSlice from './apiSlice';

export const extendedAuthApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation<{ status: string } & TLoginApiResponse, ILoginPayload>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['user']
    }),

    userSignup: builder.mutation<{ status: string } & TLoginApiResponse, IRegisterPayload>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['user']
    })
  })
});

export const { useUserLoginMutation, useUserSignupMutation } = extendedAuthApiSlice;
