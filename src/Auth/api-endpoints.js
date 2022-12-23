import axiosClient from '../api-client';
export const createUserAPI = (userData) =>
  axiosClient
    .post('/users/createUser', userData)
    .then((result) => result.data)
    .catch((error) => {
      console.log(error);
    });

export const getUserAPI = (userId) =>
  axiosClient
    .get(`/users/getUser/${userId}`)
    .then((result) => result.data)
    .catch((error) => {
      console.log(error);
    });
