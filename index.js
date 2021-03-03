const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Song = require('./models/Songs');

// Connect to Mongoose
mongoose.connect('mongodb+srv://admin:tlmOY62XDgawUyeC@cluster0.ssbnk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
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

// Search -- Took from Khushang
app.get('/songs/search', async function(req,res){
    s = req.query.title.toLowerCase();
    const song = await Song.find({ "title" : {$regex: s, $options: 'i'}})
    console.log(song)
});

app.listen(3000);
console.log('Running on port 3000');
