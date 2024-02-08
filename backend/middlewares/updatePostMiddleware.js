const { getPosts, addPost, editPost, deletePost, verificaSiPostExiste } = require("../database/querys.js");

const updatePostMiddleware = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (id) {
            if (Number(id)) {
                console.log("es numero")
                const post = await verificaSiPostExiste(id);
                if (post != "") {
                    req.data = {
                        postExist: true,
                        id: id,
                    };
                    next();
                }
                else {
                    return res.status(400).json({
                        status: 'Bad Request',
                        msg: 'El ID no existe',
                    });
                }
            }
            else {
                console.log("no es numero")
                return res.status(400).json({
                    status: 'Bad Request',
                    msg: 'El ID debe ser numerico',
                });
            }
        } else {
            return res.status(400).json({
                status: 'Bad Request',
                msg: 'El ID es requerido',
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    updatePostMiddleware,
};
