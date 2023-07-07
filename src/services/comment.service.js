import Comments from '../models/comment.model.js';
import Posts from '../models/post.model.js';
import { HttpException } from '../exceptions/HttpException.js';


    //Create a comment
    export const createComment = async(commentData) => {
        try {
        const post = await Posts.findOne({ _id: commentData.post})
        const comment = await Comments.create(commentData)
        comment?.postId.push(post._id)
        await comment?.save()
        } catch (error) {
    throw new HttpException(500, error.message);            
        }
    }

    //Edit a comment
    export const updateComment = async (id, commentUpdate) => {
        return await Comments.findByIdAndUpdate(id, commentUpdate, {new : true})
    }

    //Delete a comment
    export const deleteComment = async(id) => {
        return await Comments.findByIdAndDelete(id)
    }

    //Get a single comment
    export const fetchOne = async(filter) => {
        return await Comments.findOne(filter)
    }

    //Get a single comment by id
    export const fetchById = async(filter) => {
        return await Comments.findById(filter)
    }

    //Get All comments
    export const fetchAll = async(filter) => {
        return await Comments.find(filter)
    }

