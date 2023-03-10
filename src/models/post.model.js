const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postname: {
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


module.exports = mongoose.model('post', postSchema)