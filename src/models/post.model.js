import mongoose from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        trim : true,
    },
    userId: {
        type: [
            {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
          ],
        trim : true,
    }
},
    {
        timestamps: true
    }
)

//Adding the Soft Delete Plugin
postSchema.plugin(softDeletePlugin);

export default mongoose.model('post', postSchema);