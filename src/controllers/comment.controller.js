const commentService = require('../services/comment.service')
const commentModel = require('../models/comment.model')

class commentController {
    //create a comment
    async createcomment(req, res){
        const id = req.params.id;
        const data = req.body;
        // console.log(data)

        try {
             //check for existing comment
            if(await commentService.fetchById(id)){
                res.status(403).json({
                    success: false,
                    message: 'comment Already Exists'
                })
            }

            //else create comment
            const newcomment = await commentService.create(data);

            res.status(201).json({
                success: true,
                message: 'comment created Successfully',
                data: newcomment
            })

        } catch(error){
            return res.status(403).json({
                success: false,
                message: error
            })
        }

    }

    //Get a Single comment by id
    async findcomment(req, res){

        try {
            const comment = await commentService.fetchById(req.params.id)

            if(!comment) return res.status(404).json({
                success: false,
                message: 'comment not found'
            })
    
            return res.status(200).json({
                success: true,
                message: 'comment Fetched Successfully',
                data: comment
            })
            
        } catch(error) {
            return res.status(403).json({
                success: false,
                message: error
            })
        }
      
    }

    //Get All comments
    async findcomments(req, res){

        try {
            const comments = await commentService.fetch()

            return res.status(200).json({
                success: true,
                message: 'comments Fetched Successfully',
                data: comments
            })

        } catch (error) {
            return res.status(403).json({
                success: false,
                message: error
            })
        }

    }


    //Update comment
    async updatecomment(req, res){
        const id = req.params.id;
        const updateData = req.body;

        try {
                const comment = await commentService.fetchOne(id);

            //check for duplicates
            if(!comment) {
                    res.status(403).json({
                    success: false,
                    message: 'comment to update not found'
                })
            } 

            if(updateData.comment){
                const commentUpdate = await commentService.fetchOne({ comment: updateData.comment })
                
                if(commentUpdate){
                        if(commentUpdate._id.toString() !== id){
                        res.status(403).json({
                            success: false,
                            message: 'comment already exists'
                        })
                    }
                }
            
            }

            //update comment
            const updatedData = await commentService.update(roomId, updateData)
            res.status(200).json({
                success: true,
                message: 'comment updated successfully',
                data: updatedData 
            })

        } catch(error) {
            return res.status(403).json({
                success: false,
                message: error
            })
        }
    }

    async deletecomment(req, res){
        const id = req.params.id;

        try {
             //check if comment exits before updating
            const checkcomment = await commentService.fetchOne({ _id: id })

            if(!checkcomment) return res.status(404).json({
                success: false,
                message: 'comment not found'
            })
    
            //delete comment 
            await commentService.delete(id)
    
            return res.status(200).json({
                success: true,
                message: 'comment Deleted Successfully',
                data: checkcomment
            })

        } catch(error) {
            return res.status(403).json({
                success: false,
                message: error
            })
        }

    }

     // returns the number of softDeleted elements 
     async softDelete (req, res, next)  {
        const { id, comment } = req.params;
        const numberDeletedElements = await commentModel.softDelete({
            _id: id, 
            comment: comment
        })
        .catch((err) => {
            res.status(400).json({message: err.message});
        });
        res.status(200).send(numberDeletedElements);
    };
    
    // returns the number of restores elements 
     async restoreDeleted (req, res, next) {
        //get comment id
        const { id } = req.params;
        const numberRestoredElements = await commentModel.restore({
             _id: id,
              comment: comment 
            })
        .catch((err) => {
            res.status(400).json({message: err.message});
        });
        res.status(200).send(numberRestoredElements);
    };
    
    // returns all deleted elements 
     async findDeleted (req, res, next) {
    
        const deletedElements = await commentModel.findDeleted()
        .catch((err) => {
            res.status(400).json({message: err.message});
        });
        res.status(200).send(deletedElements);
    };
    
    
    // returns all available elements (not deleted)
     async findAvailable(req, res, next) {
    
        const availableElements = await commentModel.find()
        .catch((err) => {
            res.status(400).json({message: err.message});
        });
        res.status(200).send(availableElements);
    };
}

module.exports = new commentController()