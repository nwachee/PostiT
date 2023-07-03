import postModel from '../models/post.model.js';

class postService {
    //Create a Post
    async create(postData){
        return await postModel.create(postData)
    }

    //Edit a post
    async update(id, postUpdate){
        return await postModel.findByIdAndUpdate(id, postUpdate, {new : true})
    }

    //Delete a post
    async delete(id){
        return await postModel.findByIdAndDelete(id)
    }

    //Get a single post
    async fetchOne(filter){
        return await postModel.findOne(filter)
    }

    //Get a single post by id
    async fetchById(filter){
        return await postModel.findById(filter)
    }

    //Get All posts
    async fetch(filter){
        return await postModel.find(filter)
    }
}

export default new postService();