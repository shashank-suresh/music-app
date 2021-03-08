const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Song = require('./models/Songs');
const dotenv = require('dotenv').config();

// Connect to Mongoose
mongoose.connect(process.env.DB_URI,{
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

const db = mongoose.connection;
app.use(bodyParser.json());

// Find all songs
app.get('/', async (req, res) => {
    res.send(await Song.find({}));
});

// Find song by title
app.get('/:title', async (req, res) => {
    return res.send(await Song.find({'title': req.params.title}));
});

// Add songs
app.post('/add', (req, res) => {
    res.send(Song.create(req.body));
});

// Delete song
app.get('/del/:id', async (req, res) => {
    const song = await Song.findByIdAndRemove({_id:req.params.id});
    res.redirect('/');
});

// Search
app.get('/songs/search', async function(req,res){
    s = req.query.title.toLowerCase();
    const song = await Song.find({ "title" : {$regex: s, $options: 'i'}})
    console.log(song)
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
