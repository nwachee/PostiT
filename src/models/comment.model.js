import mongoose from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    postId: {
        type: [
            {type: mongoose.Schema.Types.ObjectId, ref: 'post'}
          ],
    }
},
    {
        timestamps: true
    }
)

//Adding the Soft Delete Plugin
commentSchema.plugin(softDeletePlugin);

export default mongoose.model('comment', commentSchema);