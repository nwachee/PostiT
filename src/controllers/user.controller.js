const UserService = require('../services/user.service')
const avatarController = require('./avatar.controller')

class UserController {

    //create a User
    async createUser(req, res){

         //get the avatar link
         const avatar = await avatarController (req.body.email)
        // console.log(avatar)
        const data = req.body;
        // console.log(data)

        //check for existing user
        if(await UserService.fetchOne({ email: data.email.toLowerCase()})){
            res.status(403).json({
                success: false,
                message: 'User Already Exists'
            })
        }

        //else create a new user 
        const newUser = await UserService.create({
            fullname: req.body.fullname,
            email: req.body.email,
            phone: req.body.phone,
            username: req.body.username,
            password: req.body.password,
            avatarUrl: avatar
        });

        res.status(201).json({
            success: true,
            message: 'User created Successfully',
            data: newUser
        })
    }

    //Get a Single by Id
    async findUser(req, res){
        const user = await UserService.fetchById(req.params.id)

        if(!user) return res.status(404).json({
            success: false,
            message: 'User not found'
        })

        return res.status(200).json({
            success: true,
            message: 'User Fetched Successfully',
            data: user
        })
    }

    //Get All Users
    async findUsers(req, res){
        const users = await UserService.fetch()

        return res.status(200).json({
            success: true,
            message: 'Users Fetched Successfully',
            data: users
        })

    }


    //Update User
    async updateUser(req, res){
        const id = req.params.id;
        const updateData = req.body;
        const user = await UserService.fetchById(id);

        //check user
        if(!user) res.status(403).json({
            success: false,
            message: 'User to update not found'
        })

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

    async deleteUser(req, res){
        const id = req.params.id;

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
}

module.exports = new UserController()