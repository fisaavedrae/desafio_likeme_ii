const express = require("express");
const router = express.Router();
const { getPosts, addPost, editPost, deletePost } = require("../database/consultas");
const { isValidUrl } = require("../utils/validation");
const { updatePostController } = require('../controllers/updatePostController');
const { updatePostMiddleware } = require('../middlewares/updatePostMiddleware');


router.get('/posts', async (req, res) => {
    try {
        const results = await getPosts()
        res.json(results)
    }
    catch (error) {
        res.status(400).json({ message: 'Error al obtener los posts' })
    }

})

router.post('/posts', async (req, res) => {

    const { titulo, imgSrc, descripcion } = req.body
    if (!titulo || !imgSrc || !descripcion) {
        res.status(400).json({ message: 'Debe ingresar toda la información' })
        return
    } else {
        if (!isValidUrl(imgSrc)) {
            res.status(400).json({ message: 'Debe ingresar una URL valida' })
            return
        } else {
            try {
                await addPost(titulo, imgSrc, descripcion, 0)
                res.status(200).json({ message: 'Post agregado' })
            }
            catch (error) {
                res.status(400).json({ message: 'Error al agregar el post' })
            }

        }
    }
})

/*
router.put('/posts/:id', async (req, res) => {
    const { id } = req.params

    try {
        await editPost(id)
        res.status(200).json({ message: 'Like agregado' })
    }
    catch (error) {
        res.status(400).json({ message: 'Error al agregar el like' })
    }
})
*/
router.put('/posts/:id', updatePostMiddleware, updatePostController);

router.delete('/posts/:id', async (req, res) => {

    const { id } = req.params
    try {
        await deletePost(id)
        res.status(200).json({ message: 'Post eliminado' })
    }
    catch (error) {
        res.status(400).json({ message: 'Error al eliminar el post' })
    }
})



module.exports = router;