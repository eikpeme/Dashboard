import axios from 'axios'
export const baseUrl =  'https://artizan-api-staged.herokuapp.com'
export const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTFmMGZmYWI1MTE5MDAwNDc5ZGM2YSIsImVtYWlsIjoiYWRtaW5AYXJ0aXphbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzI4NTg4MzN9.reJxZ2s0sMki3XuziNwUmoP-4sx8YCV8gu0ZZgm0GF8'


export const post = async (data, url) => {
  const response = await axios.post(url, data).catch((err) => err.response);

  return response.data;
};
export const getUsers = () => {
  const ctx = sessionStorage.getItem('email', email );
 if(ctx) return JSON.parse(ctx)
   else return null
};

export const getToken = () => { 
  if(process.browser)
  return sessionStorage.getItem("password", 'password');
};

export const setUserSession = (email, password) => {
  sessionStorage.setItem("email", email)
  sessionStorage.setItem("password", JSON.stringify(password));
};

export const removeUserSession = () => {
  sessionStorage.removeItem('email');
  sessionStorage.removeItem('password');
};

export const authAxios = axios.create({
  baseURL: baseUrl,
  headers: {
    authorization: `Bearer ${adminToken}`
  }
})