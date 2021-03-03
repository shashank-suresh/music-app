const mongoose = require('mongoose');

// Songs Schema
const SongsSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    artist:{
        type: String,
        required: true
    },
    image_url:{
        type: String,
        required: true
    },
    song_url:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Songs', SongsSchema);