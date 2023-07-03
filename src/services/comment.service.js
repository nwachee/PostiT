import commentModel from '../models/comment.model.js';

class commentService {
    //Create a comment
    async create(commentData){
        return await commentModel.create(commentData)
    }

    //Edit a comment
    async update(id, commentUpdate){
        return await commentModel.findByIdAndUpdate(id, commentUpdate, {new : true})
    }

    //Delete a comment
    async delete(id){
        return await commentModel.findByIdAndDelete(id)
    }

    //Get a single comment
    async fetchOne(filter){
        return await commentModel.findOne(filter)
    }

    //Get a single comment by id
    async fetchById(filter){
        return await commentModel.findById(filter)
    }

    //Get All comments
    async fetch(filter){
        return await commentModel.find(filter)
    }
}

export default new commentService();