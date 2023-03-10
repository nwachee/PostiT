const UserService = require('../services/user.service')

class UserController {

    //create a User
    async createUser(req, res){

        const data = req.body;
        console.log(data)

        //check for existing user
        if(await UserService.fetchOne({email: data.email.toLowerCase()})){
            res.status(403).json({
                success: false,
                message: 'User Already Exists'
            })
        }

        //else create user
        const newUser = await UserService.create(data);

        res.status(201).json({
            success: true,
            message: 'User created Successfully',
            data: newUser
        })
    }

    //Get a Single User
    async findUser(req, res){
        const user = await UserService.fetchOne(req.params.id)

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
        const user = await UserService.fetchOne(id);

        //check for duplicates
        if(!user) res.status(403).json({
            success: false,
            message: 'User to update not found'
        })

        if(updateData.email){
            const userUpdate = await UserService.fetchOne({ email: updateData.email })

            if(userUpdate._id.toString() !== userUpdate._id.toString()){
                res.status(403).json({
                    success: false,
                    message: 'User Email already exists'
                })
            }
        }

        //update user
        const updatedData = await userService.update(roomId, updateData)
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedData 
        })
    }

    async deleteUser(req, res){
        const id = req.params.id;

         //check if user exits before updating
         const checkUser = await UserService.fetchOne({ _id: id })

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