// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importing the model
const Comment = require('./models/comments.js');

// Create a comment
app.post('/comments', (req, res) => {
    Comment.create({
        name: req.body.name,
        comment: req.body.comment
    }).then(comment => res.json(comment));
});

// Get all comments
app.get('/comments', (req, res) => {
    Comment.findAll().then(comments => res.json(comments));
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
    Comment.findAll({
        where: {
            id: req.params.id
        }
    }).then(comment => res.json(comment));
});

// Update comment by id
app.put('/comments/:id', (req, res) => {
    Comment.update({
        name: req.body.name,
        comment: req.body.comment
    }, {
        where: {
            id: req.params.id
        }
    }).then(comment => res.json(comment));
});

// Delete comment by id
app.delete('/comments/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(comment => res.json(comment));
});

// Listen to port
app.listen(port, () => console.log(`Server started on port ${port}`));