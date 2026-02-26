import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";

export default function LivroForm() {
  const [titulo, setTitulo] = useState("");
  const [paginas, setPaginas] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isbn, setIsbn] = useState(""); // ✅ agora está no lugar certo

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/${id}`).then((response) => {
        const livro = response.data;
        setTitulo(livro.titulo);
        setPaginas(livro.paginas);
        setCategoria(livro.categoria);
        setDescricao(livro.descricao);
        setIsbn(livro.isbn || ""); // ✅ evita erro se não existir
      });
    }
  }, [id]);

  const salvar = async (e) => {
    e.preventDefault();

    const dados = {
      titulo,
      paginas,
      categoria,
      descricao,
      isbn
    };

    if (id) {
      await api.put(`/${id}`, dados);
    } else {
      await api.post("/", dados);
    }

    navigate("/");
  };

  return (
    <div className="container card p-0 mt-5" style={{ maxWidth: "500px" }}>
      <div className="card-header bg-primary text-white">
        <h5>{id ? "Editar Livro" : "Novo Livro"}</h5>
      </div>

      <div className="card-body">
        <form onSubmit={salvar}> {/* ✅ agora o submit está correto */}

          {/* Título */}
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div className="row mb-3">
            {/* Número de Páginas */}
            <div className="col-md-6">
              <label className="form-label">N.º de páginas</label>
              <input
                type="number"
                className="form-control"
                value={paginas}
                onChange={(e) => setPaginas(e.target.value)}
                required
              />
            </div>

            {/* Categoria */}
            <div className="col-md-6">
              <label className="form-label d-block">Categoria</label>
              <select
                className="form-select"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                <option value="">Selecione...</option>
                <option value="Romance">Romance</option>
                <option value="Biografia">Biografia</option>
                <option value="Literatura">Literatura</option>
                <option value="Fantasia">Fantasia</option>
              </select>
            </div>
          </div>

          {/* ISBN */}
          <div className="mb-3">
            <label className="form-label">ISBN</label>
            <input
              type="text"
              className="form-control"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              placeholder="Ex: 9780261103344"
              required
            />
          </div>

          {/* Descrição */}
          <div className="mb-3">
            <label className="form-label">Descrição</label>
            <textarea
              className="form-control"
              rows="3"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            ></textarea>
          </div>

          {/* Botões */}
          <div className="d-flex justify-content-between">
            <Link to="/" className="btn btn-secondary">
              Cancelar
            </Link>
            <button type="submit" className="btn btn-success">
              Salvar Livro
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}