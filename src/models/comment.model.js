import {model, Schema} from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

const commentSchema = new Schema({
    name: {
        type: String,
    },
    postId: {
        type: [Schema.Types.ObjectId], 
        ref: 'Post'
    }
},
    {
        timestamps: true
    }
)

//Adding the Soft Delete Plugin
commentSchema.plugin(softDeletePlugin);

const Comment = model('Comment', commentSchema);
export default Comment