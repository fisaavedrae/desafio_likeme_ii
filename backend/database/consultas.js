const pool = require("./config");

const getPosts = async (id, titulo, img, descripcion, likes) => {
    try {
        const { rows } = await pool.query("SELECT id, titulo, img, descripcion, likes FROM posts")
        console.log(rows)
        return rows
    } catch (error) {
        console.log(error)
    }
}


const addPost = async (titulo, imgSrc, descripcion) => {
    try {
        console.log("url: ", imgSrc)
        const { rows } = await pool.query("INSERT INTO posts ( titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *", [titulo, imgSrc, descripcion, 0])
        console.log('Post agregado')
        return rows
    } catch (error) {
        console.log(error)
    }
}

const editPost = async (id) => {
    try {
        const { rows } = await pool.query("UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *", [id])
        console.log('Like agregado')
        return rows
    } catch (error) {
        console.log(error)
    }
}

const deletePost = async (id) => {
    try {
        const { rows } = await pool.query("DELETE FROM posts WHERE id =$1", [id])
        console.log('Post eliminado')
        return "Success"
    } catch (error) {
        console.log(error)
    }
}

const verificaSiExisteId = async (id) => {
    try {
        const { rows } = await pool.query("SELECT * FROM posts WHERE id = $1", [id])
        console.log('Verificando si existe ID')
        return rows
    } catch (error) {
        console.log(error)
    }
}
const verificaSiExistenPosts = async (id) => {
    try {
        const { rows } = await pool.query("SELECT * FROM posts ")
        console.log('Verificando si existen Posts')
        return rows
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getPosts,
    addPost,
    editPost,
    deletePost,
    verificaSiExisteId,
    verificaSiExistenPosts
}
