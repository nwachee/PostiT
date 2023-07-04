import User from '../models/auth.model.js';
import { HttpException } from '../exceptions/HttpException.js';
//Create a User
export const CreateUser = async (input) => {
        const { email } = input;
      
        const user = await User.findOne({ email });
      
        if (user) {
          throw new HttpException(400, `user with email ${email} already exists`);
        }
      
        return await User.create(input);
 };

 //login User
 export const Login = async (input) => {
    const { email, password } = input;
  
    const user = await User.findOne({ email });
    if (!user) throw new HttpException(404, `User with email ${email} not found`);

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      throw new HttpException(409, 'Invalid Password');
    }
    return user;
  };

     //Edit a user
     export const Update = async (id, userUpdate) => {
        return await User.findByIdAndUpdate(id, userUpdate, {new : true})
    }
    //Delete a user
    export const Delete = async(id) => {
        return await User.findByIdAndDelete(id)
    }
    //Get a single user
    export const fetchOne = async(filter) => {
        return await User.findOne(filter)
    }
    //Get All users
    export const fetchAll = async (filter) => {
        return await User.find(filter)
    }