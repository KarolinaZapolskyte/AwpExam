module.exports = (postsDB) => {
  const express = require('express');
  const router = express.Router();

  /**** Routes ****/
  router.get('/posts',  async (req, res) => {
    const posts = await postsDB.getPosts()
    res.json(posts);
  });

  router.get('/posts/:id', async (req, res) => {
    const post = await postsDB.getPost(req.params.id)
    res.json(post);
  });

  router.post('/posts', async (req, res) => {
    const newPost = await postsDB.createPost(req.body.username, req.body.title, req.body.topicName);

    await newPost.save();
    res.json(newPost);
  });

  //  comments
  router.get('/comments',  async (req, res) => {
    const comments = await postsDB.getComments()
    res.json(comments);
  });

  router.post('/comments', async (req, res) => {
    const newComment = await postsDB.createComment(req.body.id, req.body.username, req.body.commentText);

    await newComment.save();
    res.json(newComment);
  });

  //  voting
  router.get("/votes", async (req, res) => {
    const votes = await postsDB.getVotes()
    res.json(votes);
  });

  router.post("/votes", async (req, res) => {
    console.log(req.body);
    const newVote = await postsDB.addVote(req.body.id, parseInt(req.body.voteValue));

    await newVote.save()
    res.json(newVote);
  });
  
  //  profiles
  router.get('/users', async (req, res) => {
    const users = await postsDB.getUsers();
    res.json(users);
  });

  router.get('/users/:id', async (req, res) => {
    const user = await postsDB.getSpecificUser(req.params.username)
    res.json(user);
  });

  return router;
}
