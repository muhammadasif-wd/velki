const PostComment = require("../models/postComment.model");

// get service function create
exports.getPostCommentService = async (filter) => {
    const data = await PostComment.find(filter);
    return data;
}
// fetch user data a username
exports.getPostCommentServiceByUsername = async (username) => {
    const result = await PostComment.findOne({ username: username });
    return result;
};
// post service function create
exports.createPostCommentService = async (data) => {
    const identity = await PostComment.create(data);
    return identity;
}
// Delete post comment by a username
exports.deletePostCommentById = async (id) => {
    return await PostComment.deleteOne({ _id: id });
};