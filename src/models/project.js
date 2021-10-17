
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
        data: Buffer,
        contentType: String
    },
    mainPicture: {
        data: Buffer,
        contentType: String
    },
    pictureName: {
        data: Buffer,
        contentType: String
    },
    stack: [{
        type: Schema.Types.ObjectId,
        ref: 'Techs'
    }],
});


module.exports = model('Project', projectSchema);



