const { editPost, deletePost } = require("../database/consultas");


const updatePostController = async (req, res, next) => {
    const { data } = req;
    const { id, postExist } = data;

    try {


        if (postExist) {
            const post_query = await editPost(id);
            if (post_query != "") {
                res.status(200).json({
                    status: 'Success',
                    msg: 'Post updated',
                    post: post_query,
                });
            }
        }
    } catch (error) {
        next(error);
    }
};

const deletePostController = async (req, res, next) => {
    const { data } = req;
    const { id, postExist } = data;

    try {


        if (postExist) {
            const post_query = await deletePost(id);
            if (post_query == "Success") {
                res.status(200).json({
                    status: 'Success',
                    msg: 'Post deleted',
                });
            }
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    updatePostController, deletePostController
};