const AddComment = require("../models/addComment.model");


// get service function create
exports.getAddCommentService = async (filter) => {
    const data = await AddComment.find(filter);
    return data;
}

// fetch user data a username
exports.getAddCommentByUsername = async (username) => {
    const result = await AddComment.findOne({ username: username });
    return result;
};
// fetch user data a id
exports.getAddCommentById = async (id) => {
    const result = await AddComment.findOne({ _id: id });
    return result;
};
// post service function create
exports.createAddCommentService = async (data) => {
    const addCommentData = await AddComment.create(data);
    return addCommentData;
}
// Delete AddComment by a username
exports.deleteAddCommentByUsername = async (username) => {
    return await AddComment.deleteOne({ username: username });
};