import {Alert} from 'react-native';
import {BASE_URL} from './config';
import axios from 'axios';
import {tokenStorage} from '../state/storage';
import {useAuthStore} from '@state/authStore';
import {resetAndNavigate} from '../utils/NavigationUtils';

export const customerLogin = async (phoneNumber: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer/login`, {
      phoneNumber,
    });
    console.log('login response', response.data);
    const {accessToken, refreshToken} = response.data;
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);
    const {setUser} = useAuthStore.getState();
    setUser(response.data.customer);
  } catch (error) {
    Alert.alert('Error', 'Sorry, we could not log you in');
    console.log('login error', error);
  }
};

export const refresh_token = async () => {
  try {
    const refreshToken = tokenStorage.getString('refreshToken');
    const response = await axios.post(`${BASE_URL}/refresh-token`, {
      refreshToken,
    });
    const new_access_token = response.data.accessToken;
    const new_refresh_token = response.data.refreshToken;
    tokenStorage.set('accessToken', new_access_token);
    tokenStorage.set('refreshToken', new_refresh_token);
    return new_access_token;
  } catch (error) {
    console.log('error in refresh_token', error);
    tokenStorage.clearAll();
    resetAndNavigate('CustomerLogin');
  }
};

export const refetchUser = async (setUser: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer/login`, {phoneNumber});
    setUser(customer);
  } catch (error) {
    console.log('error in refetchUser', error);
  }
};
