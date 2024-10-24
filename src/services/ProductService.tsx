import axios from 'axios';
import {BASE_URL} from './config';

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.log('error in getAllCategories', error);
    return[]
  }
};

export const getProductsByCategoryId = async (Id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/product/${Id}`);
    return response.data;
  } catch (error) {
    console.log('error in getProductsByCategoryId', error);
    return[]
  }
};
