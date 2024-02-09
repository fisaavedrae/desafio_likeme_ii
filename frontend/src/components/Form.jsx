function Form({ setTitulo, titulo, setImgSRC, imgSrc, setDescripcion, descripcion, agregarPost }) {
  return (
    <div className="form rounded-3 bs-success-bg-subtle shadow">
      <div className="mb-2">
        <h6>Agregar post</h6>
        <label>Título</label>
        <input
          onChange={(event) => setTitulo(event.target.value)}
          className="form-control" value={titulo}
        />
      </div>
      <div className="mb-2">
        <label>URL de la imagen</label>
        <input
          onChange={(event) => setImgSRC(event.target.value)}
          className="form-control" value={imgSrc}
        />
      </div>
      <div className="mb-3">
        <label>Descripción</label> <br />
        <textarea
          onChange={(event) => setDescripcion(event.target.value)}
          className="form-control" value={descripcion}
        ></textarea>
      </div>
      <div className="d-flex">
        <button onClick={agregarPost} className="btn btn-light m-auto">
          Agregar
        </button>
      </div>
    </div>
  );
}

export default Form;
