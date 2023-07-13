import * as services from '../services/post.service.js';
import Posts from '../models/post.model.js';

//create a post
     export const  createPost = async(req, res, next) => {
        try {
    const newpost = await services.createPost({ ...req.body, userId: req.user._id});
    res.status(201).json({ success: true, message: 'post created Successfully', data: newpost })
     } catch (error){ next(error) }
    }

    //Get a Single post by id
    export const getPost = async (req, res, next) => {
        try {
     const post = await services.fetchById(req.params.id)
    if(!post) { return res.status(404).json({ success: false, message: 'post not found'})  } 
     return res.status(200).json({success: true, message: 'post Fetched Successfully', data: post})
        } 
        catch (error){ next(error) }
    }

    //Get All posts
    export const getAllpost = async(req, res, next) => {
        try {
    const posts = await services.fetchAll()
     return res.status(200).json({ success: true, message: 'posts Fetched Successfully', data: posts })
        } 
        catch (error){ next(error) }
    }

    export const findDeletedPost = async(req, res, next) => {
        try {
    const posts = await services.findDeleted()
     return res.status(200).json({ success: true, message: 'posts Fetched Successfully', data: posts })
        } 
        catch (error){ next(error) }
    }


    //Update post
     export const updatePost = async(req, res, next) => {
        const updateData = req.body;
    try {
        const post = await services.fetchOne({ _id: req.params.id});
        //check for duplicates
    if(!post) { res.status(403).json({ success: false, message: 'post to update not found'}) }
     if(updateData.postname){
    const postUpdate = await services.fetchOne({ name: updateData.name })
     if(postUpdate){
         if(postUpdate._id.toString() !== id){ res.status(403).json({ success: false, message: 'post already exists' }) } }               
            }
     //update post
     const updatedData = await services.updatePost(req.params.id, updateData)
    res.status(200).json({ success: true, message: 'post updated successfully', data: updatedData })
        }
        catch (error){ next(error) }
    }

    export const deletePost = async (req, res, next) => {
        //check if post exits before updating
     try {
 const checkpost = await services.fetchOne({ _id: req.params.id })
    if(!checkpost) { return res.status(404).json({ success: false, message: 'post not found' }) }
    //delete post 
    await services.deletePost(req.params.id)
     return res.status(200).json({ success: true, message: 'post Deleted Successfully', data: checkpost })
            } 
    catch (error){ next(error) }
    }

     // returns the number of softDeleted elements 
     export const softDelete = async (req, res, next)  => {
        const { id } = req.params;
        const numberDeletedElements = await Posts.softDelete({
            _id: id
        })
        .catch((err) => {
            res.status(400).json({message: err.message});
        });
        res.status(200).send(numberDeletedElements);
    };
    
    // returns the number of restores elements
    export const restoreDeleted = async(req, res, next) => {
        //get post id
        const { id } = req.params;
        const numberRestoredElements = await Posts.restore({
             _id: id
            })
        .catch((err) => {
            res.status(400).json({message: err.message});
        });
        res.status(200).send(numberRestoredElements);
    };
    
    // returns all deleted elements
    export const  findDeleted = async (req, res, next) => {
        const deletedElements = await Posts.findDeleted()
        .catch((err) => {
            res.status(400).json({message: err.message});
        });
        res.status(200).send(deletedElements);
    };
    
    // returns all available elements (not deleted)
    export const  findAvailable = async(req, res, next) => {
    
        const availableElements = await Posts.find()
        .catch((err) => {
            res.status(400).json({message: err.message});
        });
        res.status(200).send(availableElements);
    };
