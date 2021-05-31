const { parse } = require("path");

module.exports = (postsDB) => {
  const express = require("express");
  const router = express.Router();

  /**** Routes ****/
  router.get("/posts",  async (req, res) => {
    const posts = await postsDB.getPosts()
    res.json(posts);
  });

  router.get("/posts/:id", async (req, res) => {
    const post = await postsDB.getPost(req.params.id)
    res.json(post);
  });

  router.post("/posts", async (req, res) => {
    const newPost = await postsDB.createPost(req.body.username, req.body.title, req.body.topicName);

    await newPost.save();
    res.json(newPost);
  });

  //  comments
  router.get("/comments",  async (req, res) => {
    const comments = await postsDB.getComments()
    res.json(comments);
  });

  router.post("/comments", async (req, res) => {
    const newComment = await postsDB.createComment(req.body.id, req.body.username, req.body.commentText);

    await newComment.save();
    res.json(newComment);
  });

  return router;
}
