const postService = require('../services/post.service')

class postController{
     //create a post
     async createpost(req, res){
        const id = req.params.id;
        const data = req.body;
        console.log(data)

        //check for existing post
        if(await postService.fetchById(id)){
            res.status(403).json({
                success: false,
                message: 'Post Already Exists'
            })
        }

        //else create post
        const newpost = await postService.create(data);

        res.status(201).json({
            success: true,
            message: 'post created Successfully',
            data: newpost
        })
    }

    //Get a Single post by id
    async findpost(req, res){
        const post = await postService.fetchById(req.params.id)

        if(!post) return res.status(404).json({
            success: false,
            message: 'post not found'
        })

        return res.status(200).json({
            success: true,
            message: 'post Fetched Successfully',
            data: post
        })
    }

    //Get All posts
    async findposts(req, res){
        const posts = await postService.fetch()

        return res.status(200).json({
            success: true,
            message: 'posts Fetched Successfully',
            data: posts
        })

    }


    //Update post
    async updatepost(req, res){
        const id = req.params.id;
        const updateData = req.body;
        const post = await postService.fetchOne(id);

        //check for duplicates
        if(!post) res.status(403).json({
            success: false,
            message: 'post to update not found'
        })

        if(updateData.postname){
            const postUpdate = await postService.fetchOne({ postname: updateData.postname })
            
            if(postUpdate){
                 if(postUpdate._id.toString() !== id){
                res.status(403).json({
                    success: false,
                    message: 'post already exists'
                })
            }
            }
           
        }

        //update post
        const updatedData = await postService.update(roomId, updateData)
        res.status(200).json({
            success: true,
            message: 'post updated successfully',
            data: updatedData 
        })
    }

    async deletepost(req, res){
        const id = req.params.id;

         //check if post exits before updating
         const checkpost = await postService.fetchOne({ _id: id })

        if(!checkpost) return res.status(404).json({
            success: false,
            message: 'post not found'
        })

        //delete post 
        await postService.delete(id)

        return res.status(200).json({
            success: true,
            message: 'post Deleted Successfully',
            data: checkpost
        })
    }
}

module.exports = new postController()