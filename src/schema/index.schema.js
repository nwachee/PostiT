import Joi from 'joi';

export const registerUser = Joi.object({
    fullname: Joi.string().max(54).required(),
    email: Joi.string().required().email(),
    phone: Joi.string().max(15).required(),
    username: Joi.string().max(54).required(),
    password: Joi.string().min(6).max(30).required(),
});

export const loginUser = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
  });

  export const newPost = Joi.object().keys({
    name: Joi.string().required(),
  });

  export const newComment = Joi.object().keys({
    name: Joi.string().required(),
  });

  export const postUpdate = Joi.object().keys({
    name: Joi.string()
  });

  export const commentUpdate = Joi.object().keys({
    name: Joi.string()
  });
