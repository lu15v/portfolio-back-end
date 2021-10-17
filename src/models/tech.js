const {model, Schema} = require('mongoose');

const techSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    logo: {
        data: Buffer,
        contentType: String
    }
});


module.exports = model('Tech', techSchema);