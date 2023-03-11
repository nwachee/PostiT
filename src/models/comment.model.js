const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        trim : true,
    },
    postId: {
        type: [
            {type: mongoose.Schema.Types.ObjectId, ref: 'post'}
          ],
        trim : true,
    }
},
    {
        timestamps: true
    }
)


module.exports = mongoose.model('comment', commentSchema)