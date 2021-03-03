const mongoose = require('mongoose');

// Songs Schema
const SongsSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    album:{
        type: String,
        required: true
    },
    artist:{
        type: String,
        required: true
    },
    image_url:{
        type: String
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Songs', SongsSchema);