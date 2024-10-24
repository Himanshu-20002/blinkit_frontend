import {appAxios} from './apiInterceptors';

export const createOrder = async (items: any, totalItemPrice: number) => {
  try {
    const response = await appAxios.post(`/order`, {
      items: items,
      branch: '670691a21525f8e4ab6ccfe9',
      totalPrice: totalItemPrice,
    });
    console.log('createOrder response', response.data);

    return response.data;
  } catch (error) {
    console.log('createOrder error', error);

    return null;
  }
};

/// can use the google matrix api to get the distance and time and add it to the order to the nearest branch but currently not doing that
