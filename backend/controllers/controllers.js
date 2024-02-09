const { addPost, getPosts, editPost, deletePost } = require("../database/consultas");


const createPostController = async (req, res, next) => {
    const { data } = req;
    const { titulo, imgSrc, descripcion, dataValid } = data;
    try {
        if (dataValid) {
            const post_query = await addPost(titulo, imgSrc, descripcion, 0);
            if (post_query != "") {
                res.status(200).json({
                    status: 'Success',
                    message: 'Post creado con exito',
                    post: post_query,
                });
            }
        }
    } catch (error) {
        next(error);
    }
};

const readPostController = async (req, res, next) => {
    const { data } = req;
    const { postExist } = data;
    try {
        if (postExist) {
            const post_query = await getPosts();

            if (post_query != "") {

                res.status(200).json({
                    status: 'Success',
                    message: 'Post leidos',
                    posts: post_query,
                });
            }
        }

    } catch (error) {
        next(error);
    }
};

const updatePostController = async (req, res, next) => {
    const { data } = req;
    const { id, postExist } = data;
    try {
        if (postExist) {
            const post_query = await editPost(id);
            if (post_query != "") {
                res.status(200).json({
                    status: 'Success',
                    message: 'Like agregado',
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
                    message: 'Post eliminado',
                });
            }
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPostController, readPostController, updatePostController, deletePostController
};