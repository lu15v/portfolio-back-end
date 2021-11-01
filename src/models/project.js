
const {model, Schema} = require('mongoose');

const projectSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    prevProject: {
        type: String, 
        required: true
    },
    nextProject: {
        type: String, 
        required: true
    },
    coverPagePicture: {
        type: String,
        required: true
    },
    mainPicture: {
        type: String,
        required: true
    },
    pictureName: {
        type: String,
        required: true
    },
    gitRepo: {
        type: String,
        required: true
    },
    demo:{
        type: String,
        default: ''
    },
    stack: [{
        type: Schema.Types.ObjectId,
        ref: 'Tech'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = model('Project', projectSchema);



