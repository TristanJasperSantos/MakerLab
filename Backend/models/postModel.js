const mongoose = require('mongoose')


const postSchema = new mongoose.Schema(
    {
        videoPath: {
            type: String,
            required: [true, 'Please add a video file path']
        },
        title:{
            type: String,
            required:[true, 'please add title']
        },
        description:{
            type: String,
            required:[true, 'please add desc']
        },
        
    },
    {
        timestamps: true
    }
)

module.exports= mongoose.model('Post', postSchema)