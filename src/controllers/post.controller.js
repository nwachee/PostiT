import postService from '../services/post.service.js';
import postModel from '../models/post.model.js';

class postController{
     //create a post
     async createpost(req, res){
        const id = req.params.id;
        const data = req.body;
        // console.log(data)

            try {
                   //check for existing post
                if(await postService.fetchById({ _id: id })){
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

            } catch (error){
                return res.status(403).json({
                    success: false,
                    message: error
                })
            }

    }

    //Get a Single post by id
    async findpost(req, res){

        try {
            const post = await postService.fetchById(req.params.id)

            if(!post) {
                    return res.status(404).json({
                    success: false,
                    message: 'post not found'
                })
            } 

            return res.status(200).json({
                success: true,
                message: 'post Fetched Successfully',
                data: post
            })

        } catch (error){
            return res.status(403).json({
                success: false,
                message: error
            })
        }

    }

    //Get All posts
    async findposts(req, res){

        try {
            const posts = await postService.fetch()

            return res.status(200).json({
                success: true,
                message: 'posts Fetched Successfully',
                data: posts
            })

        } catch (error){
            return res.status(403).json({
                success: false,
                message: error
            })
        }
       
    }


    //Update post
    async updatepost(req, res){
        const id = req.params.id;
        const updateData = req.body;

        try {
            const post = await postService.fetchOne({ _id: id});

            //check for duplicates
            if(!post) {
                res.status(403).json({
                success: false,
                message: 'post to update not found'
            })
            }
    
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

        } catch (error){
            return res.status(403).json({
                success: false,
                message: error
            })
        } 
    }

    async deletepost(req, res){
        const id = req.params.id;

         //check if post exits before updating

            try {
                const checkpost = await postService.fetchOne({ _id: id })

                if(!checkpost) {
                    return res.status(404).json({
                    success: false,
                    message: 'post not found'
                })
                }

                //delete post 
                await postService.delete(id)

                return res.status(200).json({
                    success: true,
                    message: 'post Deleted Successfully',
                    data: checkpost
                })

            } catch (error){
                return res.status(403).json({
                    success: false,
                    message: error
                })
            }
         
    }

     // returns the number of softDeleted elements 
     async softDelete (req, res, next)  {
        const { id, postname } = req.params;
        const numberDeletedElements = await postModel.softDelete({
            _id: id, 
            postname: postname
        })
        .catch((err) => {
            res.status(400).json({message: err.message});
        });
        res.status(200).send(numberDeletedElements);
    };
    
    // returns the number of restores elements
     async restoreDeleted (req, res, next) {
        //get post id
        const { id } = req.params;
        const numberRestoredElements = await postModel.restore({
             _id: id,
              postname: postname 
            })
        .catch((err) => {
            res.status(400).json({message: err.message});
        });
        res.status(200).send(numberRestoredElements);
    };
    
    // returns all deleted elements
     async findDeleted (req, res, next) {
    
        const deletedElements = await postModel.findDeleted()
        .catch((err) => {
            res.status(400).json({message: err.message});
        });
        res.status(200).send(deletedElements);
    };
    
    
    // returns all available elements (not deleted)
     async findAvailable(req, res, next) {
    
        const availableElements = await postModel.find()
        .catch((err) => {
            res.status(400).json({message: err.message});
        });
        res.status(200).send(availableElements);
    };
}

export default new postController();