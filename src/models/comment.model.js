const mongoose = require('mongoose');

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


module.exports = mongoose.model('comment', commentSchema)