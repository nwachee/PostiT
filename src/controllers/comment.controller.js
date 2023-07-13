import * as services from '../services/comment.service.js';
import commentModel from '../models/comment.model.js';

    //create a comment
    export const createComment = async(req, res, next) => {
    try {
     const newcomment = await services.createComment({ ... req.body, post: req.params.id});
      res.status(201).json({ success: true, message: 'comment created Successfully', data: newcomment })
        }
        catch(error){ next(error) }
    }

    //Get a Single comment by id
    export const getComment = async (req, res, next) => {
     try {
     const comment = await services.fetchById(req.params.id)
    if(!comment) return res.status(404).json({ success: false, message: 'comment not found' })
    return res.status(200).json({ success: true, message: 'comment Fetched Successfully', data: comment })
        } 
        catch(error) { next(error) }
    }

    //Get All comments
     export const getAllcomments = async(req, res, next) => {
        try {
    const comments = await services.fetchAll()
  return res.status(200).json({ success: true, message: 'comments Fetched Successfully', data: comments })
        } 
        catch (error) { next(error) }
    }

    //Update comment
     export const updateComment = async(req, res, next) => {
        const updateData = req.body;
        try {
    const comment = await services.fetchOne(req.params.id);
    //check for duplicates
    if(!comment) { res.status(403).json({ success: false, message: 'comment to update not found' }) } 
        if(updateData.comment){
        const commentUpdate = await services.fetchOne({ name: updateData.name })  
        if(commentUpdate){
         if(commentUpdate._id.toString() !== id){ res.status(403).json({ success: false, message: 'comment already exists' }) }
                }
            }
        //update comment
     const updatedData = await services.updateComment(roomId, updateData)
    res.status(200).json({ success: true, message: 'comment updated successfully', data: updatedData })
     } 
        catch(error) { next(error) }
    }

    export const deleteComment = async(req, res, next) => {
        try {
    //check if comment exits before updating
    const checkcomment = await services.fetchOne({ _id: req.params.id })
    if(!checkcomment) return res.status(404).json({ success: false, message: 'comment not found'})
        //delete comment 
        await services.deleteComment(req.params.id)
    return res.status(200).json({ success: true, message: 'comment Deleted Successfully'})
        } 
        catch(error) { next(error) }
    }

     // returns the number of softDeleted elements 
      export const softDelete = async(req, res, next) => {
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
      export const restoreDeleted = async (req, res, next)=> {
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
     export const findDeleted = async (req, res, next) => {
    const deletedElements = await commentModel.findDeleted()
        .catch((err) => {
            res.status(400).json({message: err.message});
        });
        res.status(200).send(deletedElements);
    };
    
    
    // returns all available elements (not deleted)
    export const findAvailable = async (req, res, next) => {
    const availableElements = await commentModel.find()
    .catch((err) => {
    res.status(400).json({message: err.message});
        });
            res.status(200).send(availableElements);
        };
