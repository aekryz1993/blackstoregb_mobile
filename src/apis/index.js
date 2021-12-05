import {HOST} from '@env';
import axios from 'axios';

function getUrl(routePath) {
  return `${HOST}/${routePath}`;
}

export const getApi = async ({routePath, ac}) => {
  try {
    const response = await fetch(getUrl(routePath), {
      method: 'GET',
      signal: ac?.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.text();

    if (!response.ok) {
      throw JSON.parse(data);
    }

    return {data: JSON.parse(data)};
  } catch (error) {
    return error;
  }
};

export const postApi = async ({routePath, body, ac}) => {
  try {
    const response = await fetch(getUrl(routePath), {
      method: 'POST',
      signal: ac?.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.text();

    if (!response.ok) {
      throw JSON.parse(data);
    }

    return {data: JSON.parse(data)};
  } catch (error) {
    return error;
  }
};

export const formDataApi = async ({routePath, dataForm}) => {
  try {
    const response = await axios.post(getUrl(routePath), dataForm, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const data = await response.data;

    return {data};
  } catch (error) {
    return error;
  }
};
