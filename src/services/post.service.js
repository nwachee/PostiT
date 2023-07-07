import Posts from '../models/post.model.js';
import { HttpException } from '../exceptions/HttpException.js';


    //Create a Post
    export const createPost = async (postData) => {
    return await Posts.create(postData)  
    }

    //Edit a post
    export const updatePost = async (id, postUpdate) => {
        return await Posts.findByIdAndUpdate(id, postUpdate, {new : true})
    }

    //Delete a post
    export const deletePost = async (id) => {
        return await Posts.findByIdAndDelete(id)
    }

    //Get a single post
   export const fetchOne = async (filter) => {
        return await Posts.findOne(filter)
    }

    //Get a single post by id
    export const fetchById = async (filter) => {
        return await Posts.findById(filter)
    }

    //Get All posts
    export const fetchAll = async (filter) => {
        return await Posts.find(filter)
    }

