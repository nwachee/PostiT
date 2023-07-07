import {model, Schema} from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

const postSchema = new Schema({
    name: {
        type: String,
        trim : true,
    },
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
},
    {
        timestamps: true
    }
)

//Adding the Soft Delete Plugin
postSchema.plugin(softDeletePlugin);

const Post = model('Post', postSchema);
export default Post