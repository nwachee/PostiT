const commentService = require('../services/comment.service')

class commentController {
    //create a comment
    async createcomment(req, res){
        const id = req.params.id;
        const data = req.body;
        // console.log(data)

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
    }

    //Get a Single comment by id
    async findcomment(req, res){
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
    }

    //Get All comments
    async findcomments(req, res){
        const comments = await commentService.fetch()

        return res.status(200).json({
            success: true,
            message: 'comments Fetched Successfully',
            data: comments
        })

    }


    //Update comment
    async updatecomment(req, res){
        const id = req.params.id;
        const updateData = req.body;
        const comment = await commentService.fetchOne(id);

        //check for duplicates
        if(!comment) res.status(403).json({
            success: false,
            message: 'comment to update not found'
        })

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
    }

    async deletecomment(req, res){
        const id = req.params.id;

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
    }
}

module.exports = new commentController()