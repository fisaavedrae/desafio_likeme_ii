import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Post from "./components/Post";
import './App.css'
const urlBaseServer = "http://localhost:3001";

function App() {
  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [posts, setPosts] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");



  const getPosts = async () => {
    const { data: posts } = await axios.get(urlBaseServer + "/posts");
    setPosts([...posts.posts]);
  };

  const agregarPost = async () => {
    console.log(imgSrc)
    const post = { titulo, imgSrc, descripcion };

    await axios.post(urlBaseServer + "/posts", post)
      .then(function (response) {
        // handle success    
        setMensaje(response.data.message);
        setTipoMensaje("success");
        toastBootstrap.show();
        setDescripcion("");
        setImgSRC("");
        setTitulo("");
        getPosts();
      })
      .catch(function (error) {
        // handle error        
        setMensaje(error.response.data.message);
        setTipoMensaje("danger");
        toastBootstrap.show();
      });


  };

  // este método se utilizará en el siguiente desafío
  const like = async (id) => {
    await axios.put(urlBaseServer + `/posts/${id}`)
      .catch(function (error) {
        // handle error        
        setMensaje(error.response.data.message);
        setTipoMensaje("danger");
        toastBootstrap.show();
      })
      .finally(function () {
        // always executed
        getPosts();
      });


  };

  // este método se utilizará en el siguiente desafío
  const eliminarPost = async (id) => {
    axios.delete(urlBaseServer + `/posts/${id}`)
      .then(function (response) {
        // handle success        
        setMensaje(response.data.message);
        setTipoMensaje("success");
        toastBootstrap.show();
        getPosts();
      })
      .catch(function (error) {
        // handle error        
        setMensaje(error.response.data.message);
        setTipoMensaje("danger");
        toastBootstrap.show();
      });

  };

  useEffect(() => {
    getPosts();
  }, []);


  const toastLiveExample = document.getElementById('liveToast');
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

  return (
    <div className="App">
      <h2 className="py-5 text-center logo"> Like Me</h2>
      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            setTitulo={setTitulo}
            titulo={titulo}
            setImgSRC={setImgSRC}
            imgSrc={imgSrc}
            setDescripcion={setDescripcion}
            descripcion={descripcion}
            agregarPost={agregarPost}
          />
        </div>
        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {posts.map((post, i) => (
            <Post
              key={i}
              post={post}
              like={like}
              eliminarPost={eliminarPost}
            />
          ))}
        </div>
      </div>

      <div className="toast-container position-fixed  top-0 end-0 p-3">
        <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className={`toast-body rounded text-bg-${tipoMensaje}`}>{mensaje}</div>
        </div>
      </div>

    </div>


  );
}

export default App;
