import { HttpException } from '../exceptions/HttpException.js';

const notFound = (req, res, next) => {
  next(new HttpException(404, 'Not Found'));
};

export default notFound;
