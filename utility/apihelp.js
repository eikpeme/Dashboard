import axios from 'axios'
export const post = async (data, url) => {
  const response = await axios.post(url, data).catch((err) => err.response);

  return response.data;
};
export const getUsers = () => {
  const ctx = sessionStorage.getItem('user');
  if(ctx) return JSON.parse(ctx)
   else return null
};

export const getToken = () => {
  return sessionStorage.getItem("token") || null;

};
export const setUserSession = (token, user) => {
  sessionStorage.setItem("token", token)
  sessionStorage.setItem("user", JSON.stringify(user));
};
export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');

};
