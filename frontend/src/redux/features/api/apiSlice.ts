import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import store from '../../App/store';

const url = 'https://acute.dev/api';
const baseQuery = fetchBaseQuery({
  baseUrl: url,
  prepareHeaders: (headers) => {
    const { token: userToken } = store.getState().userAuth.data;
    const { token: adminToken } = store.getState().adminAuth.data;
    if (window.location.href.includes('admin')) {
      headers.set('authorization', `Bearer ${adminToken}`);
    } else {
      headers.set('authorization', `Bearer ${userToken}`);
    }
    return headers;
  }
});

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,

  tagTypes: [
    'user',
    'productdata',
    'admin',
    'userdata',
    'categorydata',
    'branddata',
    'cart',
    'wishlist',
    'userdata',
    'address',
    'orders',
    'payments',
    'offers',
    'wallet',
    'coupons',
    'banners',
    'reviews'
  ],
  endpoints: (builder) => ({})
});

export default apiSlice;
