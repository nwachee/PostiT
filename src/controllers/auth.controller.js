import userModel from '../models/auth.model.js';
import * as services from '../services/user.service.js';
import avatarController from './avatar.controller.js';
import { generateToken } from '../util/jwt.util.js';
import { HttpException } from '../exceptions/HttpException.js';


    //create a User
    export const register = async (req, res, next) => {        
        const data = req.body;
         //get the avatar link
         const avatarUrl = await avatarController(req.body.email)

         //create an image tag for the user
    const imageTag = `<img src= ${avatarUrl}  alt= "Avatar image for ${data.username}" />`
    try {
            //check for existing user
        if(await services.fetchOne({ email: data.email.toLowerCase()})){
            res.status(403).json({
                success: false,
                message: 'User Already Exists'
            })
        }

        //else create a new user 
     const newUser = await services.CreateUser({ ... data, avatarUrl, imageTag });
            
            res.status(201).json({
            success: true,
            message: 'User created Successfully',
            data: newUser
        })
        } catch (error) {
            next(error)
        }
    }

    export const login = async (req, res, next) => {
        try {
          const { _id } = await services.Login(req.body);
      
          const token = generateToken({ _id }, { expiresIn: '5d' });
      
          res.json({ success: true, message: 'Login Successful', data: token});
        } catch (error) {
          next(error);
        }
      };

    //Get a Single by Id
    export const findUser = async (req, res, next) => {
        const info = req.params.id
        // console.log(info)

        try {
            // console.log(user)
            const user = await services.fetchById({ _id: info })
            
            if(!user)
             { 
                    return res.status(404).json({
                    success: false,
                    message: 'User not found'
                })
            }
            return res.status(200).json({
                success: true,
                message: user
            })
           
        } catch (error) {
                return res.status(403).json({
                success: false,
                message: error
            })
        }
    }

    //Find by username
    export const findByUsername = async (req, res, next) => {
        try  {
        const username = req.params.username
            const user = await services.fetchOne({ username: username })

            if(!user)
            {
                return res.status(403).json({
                success: false,
                message: 'User not found'
            })

            } 

            return res.status(200).json({
                success: true,
                message: 'User Fetched Successfully',
                data: user
            })

        }  catch(error){
            next(error);
        }


        
    }


    //Get All Users
    export const findAllUser = async (req, res, next) => {

        try {
        const users = await services.fetch()

                return res.status(200).json({
                    success: true,
                    message: 'Users Fetched Successfully',
                    data: users
                })
        } catch(error) {
          next(error)
        }
      

    }


    //Update User
     export const updateUser = async (req, res, next) => {
        const id = req.params.id;
        const updateData = req.body;

        try { 
            const user = await services.fetchById(id);

            //check user
            if(!user) {
                res.status(403).json({
                success: false,
                message: 'User to update not found'
            })
            } 
    
            //check for existing user 
            if(updateData.email){
                const userUpdate = await services.fetchOne({ email: updateData.email.toLowerCase()})
                if(userUpdate){
                    if(userUpdate._id.toString() !== id){
                    res.status(403).json({
                        success: false,
                        message: 'User already exists'
                    })
                }
                }
                
            }
    
            //update user
            const updatedData = await services.update(id, updateData)
            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data: updatedData 
            })

        } 
        
        catch (error) {
          next(error);
        }
       
    }

     export const deleteUser = async (req, res, next) =>{
              const id = req.params.id;

            try {
            //check if user exits before updating
            const checkUser = await services.fetchById({ _id: id })

            if(!checkUser) return res.status(404).json({
                success: false,
                message: 'User not found'
            })

            //delete user 
            await services.delete(id)

            return res.status(200).json({
                success: true,
                message: 'User Deleted Successfully',
                data: checkUser
            })

         }
            catch (error) {
          next(error);
            }
        
    }