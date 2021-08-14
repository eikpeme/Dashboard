import axios from 'axios'

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
