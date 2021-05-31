module.exports = (mongoose) => {
  const postScheme = new mongoose.Schema({
    username: String,
    title: String,
    topicName: String,
    submitDate: String
  });

  const commentScheme = new mongoose.Schema({
    id: String,
    username: String,
    commentText: String,
    commentDate: String
  });

  // const scoreScheme = new mongoose.Schema({
  //   id: Number,
  //   scorePoints: Number
  // });

  const postModel = mongoose.model('post', postScheme);
  const commentModel = mongoose.model('comment', commentScheme);

  let date = new Date()
  // const scoreModel = mongoose.model('score', scoreScheme);

  async function getPosts() {
    try {
      return await postModel.find();
    } catch (error) {
      console.error("getPosts:", error.message);
      return {};
    }
  }

  async function getPost(id) {
    try {
      return await postModel.findById(id);
    } catch (error) {
      console.error("getPost:", error.message);
      return {};
    }
  }

  async function createPost(username, title, topicName) {
    let post = new postModel({username: username, title: title, topicName: topicName, submitDate: date.toLocaleDateString()});
    return post.save();
  }

  async function getComments() {
    try {
      return await commentModel.find();
    } catch (error) {
      console.error("getComment:", error.message);
      return {};
    }
  }

  async function createComment(id, username, commentText) {
    let comment = new commentModel({id: id, username: username, commentText: commentText, commentDate: date.toLocaleDateString()});
    return comment.save();
  }

  // async function getScore() {
  //   try {
  //     return await scoreModel.find();
  //   } catch (error) {
  //     console.error("getScore:", error.message);
  //     return {};
  //   }
  // }

  // async function createScore(id, scorePoints) {
  //   let scoreValue = new scoreModel({id: id, scorePoints: scorePoints});
  //   return scoreValue.save();
  // }

  return {
    getPosts,
    getPost,
    createPost,
    getComments,
    createComment
  }
}