const userModel = require('../models/user.model');
const UserService = require('../services/user.service')
const avatarController = require('./avatar.controller')

class UserController {

    //create a User
    async createUser(req, res){
        
        const data = req.body;

         //get the avatar link
         const avatarUrl = await avatarController(req.body.email)

         //create an image tag for the user
         const imageTag = `<img src= ${avatarUrl}  alt= Avatar image for ${data.username} />`
        // console.log(avatar)
        
        // console.log(data)

        try {
            //check for existing user
        if(await UserService.fetchOne({ email: data.email.toLowerCase()})){
            res.status(403).json({
                success: false,
                message: 'User Already Exists'
            })
        }

        //else create a new user 
         const newUser = await UserService.create({
                ... data, avatarUrl, imageTag
            });
            
            res.status(201).json({
            success: true,
            message: 'User created Successfully',
            data: newUser
        })
        } catch (error) {
            return res.status(403).json({
                success: false,
                message: error
            })
        }
        

    }

    //Get a Single by Id
    async findUser(req, res){
        const info = req.params.id
        // console.log(info)

        try {
            // console.log(user)
            const user = await UserService.fetchById({ _id: info })
            
            if(!user)
             { 
                    return res.status(404).json({
                    success: false,
                    message: 'User not found'
                })
            }
            return res.status(404).json({
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
    async findByUsername(req, res){
        const username = req.params.username

        try  {
            const user = await UserService.fetchOne({ username: username })

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
            return res.status(403).json({
                success: false,
                message: error
            })
        }


        
    }


    //Get All Users
    async findUsers(req, res){

        try {
        const users = await UserService.fetch()

                return res.status(200).json({
                    success: true,
                    message: 'Users Fetched Successfully',
                    data: users
                })
        } catch(error) {
            return res.status(403).json({
                success: false,
                message: error
            })
        }
      

    }


    //Update User
    async updateUser(req, res){
        const id = req.params.id;
        const updateData = req.body;

        try { 
            const user = await UserService.fetchById(id);

            //check user
            if(!user) {
                res.status(403).json({
                success: false,
                message: 'User to update not found'
            })
            } 
    
            //check for existing user 
            if(updateData.email){
                const userUpdate = await UserService.fetchOne({ email: updateData.email.toLowerCase()})
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
            const updatedData = await UserService.update(id, updateData)
            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data: updatedData 
            })

        } 
        
        catch (error) {
            return res.status(403).json({
                success: false,
                message: error
            })
        }
       
    }

    async deleteUser(req, res){
              const id = req.params.id;

            try {
            //check if user exits before updating
            const checkUser = await UserService.fetchById({ _id: id })

            if(!checkUser) return res.status(404).json({
                success: false,
                message: 'User not found'
            })

            //delete user 
            await UserService.delete(id)

            return res.status(200).json({
                success: true,
                message: 'User Deleted Successfully',
                data: checkUser
            })

         }
            catch (error) {
                return res.status(403).json({
                    success: false,
                    message: error
                })
            }
        
    }

            /*** returns the number of softDeleted elements ***/
          async softDelete (req, res, next)  {
            const { id, fullname } = req.params;
            const numberDeletedElements = await userModel.softDelete({
                _id: id, 
                fullname: fullname
            })
            .catch((err) => {
                res.status(400).json({message: err.message});
            });
            res.status(200).send(numberDeletedElements);
        };
        
        /*** returns the number of restores elements ***/
         async restoreDeleted (req, res, next) {
            //get user id
            const { id } = req.params;
            const numberRestoredElements = await userModel.restore({
                 _id: id
                })
            .catch((err) => {
                res.status(400).json({message: err.message});
            });
            res.status(200).send(numberRestoredElements);
        };
        
        /*** returns all deleted elements ***/
         async findDeleted (req, res, next) {
        
            const deletedElements = await userModel.findDeleted()
            .catch((err) => {
                res.status(400).json({message: err.message});
            });
            res.status(200).send(deletedElements);
        };
        
        
        /*** returns all available elements (not deleted) ***/
         async findAvailable(req, res, next) {
        
            const availableElements = await userModel.find()
            .catch((err) => {
                res.status(400).json({message: err.message});
            });
            res.status(200).send(availableElements);
        };
}

module.exports = new UserController()