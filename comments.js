// Create web server
// run: node comments.js
// test: curl -i http://localhost:3000/comments
// test: curl -i http://localhost:3000/comments/1
// test: curl -i -X POST -H 'Content-Type: application/json' -d '{"body": "Body of comment", "postId": 1}' http://localhost:3000/comments
// test: curl -i -X PUT -H 'Content-Type: application/json' -d '{"body": "Update body of comment"}' http://localhost:3000/comments/1
// test: curl -i -X DELETE http://localhost:3000/comments/1
// test: curl -i -X DELETE http://localhost:3000/comments/2

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var comments = [
  {id: 1, body: "some comment", postId: 1},
  {id: 2, body: "some comment", postId: 1}
];
var commentNextId = 3;

app.use(bodyParser.json());

app.get('/comments', function(req, res) {
  res.json(comments);
});

app.get('/comments/:id', function(req, res) {
  var commentId = parseInt(req.params.id, 10);
  var matchedComment = _.find(comments, {id: commentId});

  if (matchedComment) {
    res.json(matchedComment);
  } else {
    res.status(404).send();
  }
});

app.post('/comments', function(req, res) {
  var body = req.body;

  if (!_.isString(body.body) || !_.isNumber(body.postId)) {
    return res.status(400).send();
  }

  var comment = _.pick(body, 'body', 'postId');
  comment.id = commentNextId++;

  comments.push(comment);
  res.json(comment);
});

app.delete('/comments/:id', function(req, res) {
  var commentId = parseInt(req.params.id, 10);
  var matchedComment = _.find(comments, {id: commentId});

  if (!matchedComment) {
    res.status(404).send();
  } else {
    comments = _.without(comments, matchedComment);
    res.json(matchedComment);
  }
});

app.put('/comments/:id', function(req 