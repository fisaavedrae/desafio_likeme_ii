const { verificaSiExisteId, verificaSiExistenPosts } = require("../database/consultas");
const { isValidUrl } = require("../utils/validation");



const createPostMiddleware = async (req, res, next) => {
    const { titulo, imgSrc, descripcion } = req.body
    console.log(titulo, imgSrc, descripcion)

    try {
        if (!titulo || !imgSrc || !descripcion) {
            return res.status(400).json({
                status: 'Bad Request',
                msg: 'Debe ingresar toda la información',
            });

        } else {
            if (!isValidUrl(imgSrc)) {
                res.status(400).json({
                    status: 'Bad Request',
                    msg: 'Debe ingresar una URL valida'
                })
                return
            } else {
                req.data = {
                    titulo: titulo,
                    imgSrc: imgSrc,
                    descripcion: descripcion,
                    dataValid: true,
                };
                next();
            }
        }
    } catch (error) {
        next(error);
    }
};

const readPostMiddleware = async (req, res, next) => {
    const { titulo, imgSrc, descripcion } = req.body
    console.log(titulo, imgSrc, descripcion)

    try {

        const post = await verificaSiExistenPosts();
        if (post != "") {
            req.data = {
                postExist: true,
            };
            next();
        }
        else {
            return res.status(400).json({
                status: 'Bad Request',
                msg: 'No existen posts en la base de datos',
            });
        }

    } catch (error) {
        next(error);
    }
};

const updatePostMiddleware = async (req, res, next) => {
    const { id } = req.params;
    console.log("id: ", id)
    try {
        if (id) {
            if (Number(id)) {
                console.log("es numero")
                const post = await verificaSiExisteId(id);
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
const deletePostMiddleware = async (req, res, next) => {
    const { id } = req.params;
    console.log("id: ", id)
    try {
        if (id) {
            if (Number(id)) {
                console.log("es numero")
                const post = await verificaSiExisteId(id);
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
    createPostMiddleware, readPostMiddleware, updatePostMiddleware, deletePostMiddleware
};
