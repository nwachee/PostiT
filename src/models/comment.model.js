const mongoose = require('mongoose');
const { softDeletePlugin } = require('soft-delete-plugin-mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
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

module.exports = mongoose.model('comment', commentSchema)