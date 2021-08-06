import axios from 'axios';
import Cookies from 'cookies';

export default async (req, res) => {
  const cookies = new Cookies(req, res);
  const loginParams = {
    email: req.body.email,
    password: req.body.password,
  };

  return axios
    .post('https://artizan-api-staged.herokuapp/auth/admin/login', loginParams )
    .then((response) => {
      if (response.data.status === 'success') {
        cookies.set('jwt', response.data.token, {
          httpOnly: true,
          expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000),
          sameSite: 'lax',
        });

        return res.status(200).json({
          status: 'success', 
        });
      } 

      return null;
    })
    .catch((err) => {
      return res.status(401).json({
        status: 'fail',
        message: err.response,
      });
    });
};
