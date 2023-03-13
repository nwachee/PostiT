const mongoose = require('mongoose');
const { softDeletePlugin } = require('soft-delete-plugin-mongoose');

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

//Adding the Soft Delete Plugin
postSchema.plugin(softDeletePlugin);

module.exports = mongoose.model('post', postSchema)