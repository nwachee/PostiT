import { HttpException } from '../exceptions/HttpException.js';
import { verifyToken } from '../util/jwt.util.js';
import User from '../models/auth.model.js';

export const isAuth = async (req, res, next) => {
    const token = req.headers['authorization']
    ? req.headers['authorization'].split('Bearer ')[1]
    : null;

    if (!token) {
        next(new HttpException(404, 'Authentication token missing'));
      } else {
        const { decoded, expired } = verifyToken(token);
    
        if (expired) {
          next(new HttpException(404, 'Expired token, Unauthorized User'));
        }

        const user = await User.findById(decoded)

        if (!user) {
         next(new HttpException(404, 'User not Found, Unauthorized user'));
        }

        req.user = { _id : decoded?._id};

         next();
   
     }
}
