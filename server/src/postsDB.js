module.exports = (mongoose) => {
  const postScheme = new mongoose.Schema({
    title: String,
    username: String,
    topicName: String,
    submitDate: String
  });

  const commentScheme = new mongoose.Schema({
    id: String,
    username: String,
    commentText: String,
    commentDate: String
  });

  const userScheme = new mongoose.Schema({
    username: String,
    password: String
  });

  const voteScheme = new mongoose.Schema({
    id: String,
    votePoints: Number
  });

  const postModel = mongoose.model('posts', postScheme);
  const commentModel = mongoose.model('comments', commentScheme);
  const userModel = mongoose.model('users', userScheme);
  const voteModel = mongoose.model('votes', voteScheme);

  let date = new Date()

  async function getPosts() {
    try {
      return await postModel.find();
    } catch (error) {
      console.error('getPosts:', error.message);
      return {};
    }
  }

  async function getPost(id) {
    try {
      return await postModel.findById(id);
    } catch (error) {
      console.error('getPost:', error.message);
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
      console.error('getComment:', error.message);
      return {};
    }
  }

  async function createComment(id, username, commentText) {
    let comment = new commentModel({id: id, username: username, commentText: commentText, commentDate: date.toLocaleDateString()});
    return comment.save();
  }

  async function getUsers() {
    try {
      return await userModel.find();
    } catch (error) {
      console.error('getUsers:', error.message);
      return {};
    }
  }

   async function getUser(username) {
    try {
      return await userModel.findOne({ 'username': username });
    } catch (error) {
      console.error('getUser:', error.message);
      return {};
    }
  }

  async function getSpecificUser(username) {
    try {
      return await userModel.findById(username);
    } catch (error) {
      console.error('getSpecificUser:', error.message);
      return {};
    }
  }

  async function getVotes() {
    try {
      return await voteModel.find();
    } catch (error) {
      console.error("getVotes:", error.message);
      return {};
    }
  }

  async function addVote(id, votePoints) {
    let voteValue = new voteModel({id: id, votePoints: votePoints});
    return voteValue.save();
  }



  return {
    getPosts,
    getPost,
    createPost,
    getComments,
    createComment,
    getUsers,
    getUser,
    getSpecificUser,
    getVotes,
    addVote
  }
}