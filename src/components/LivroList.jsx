import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const LivroList = () => {

  const [livros, setLivros] = useState([]);

  useEffect(() => {
    carregarLivros()
  }, []);

  const carregarLivros = async () => {
    const response = await api.get("/");
    setLivros(response.data)
  }
  const excluir = async (id) => {
    if (!window.confirm("Confirma a exclusão deste livro?")) return;

    try {
      await api.delete(`/${id}`);
      // Remove o livro da lista sem precisar chamar a API de novo
      setLivros(livros.filter(livro => livro.id !== id));
    } catch (error) {
      alert("Erro ao excluir o livro.");
    }
  }

  return (
    <div className='container card p-0 mt-5'>
      <div className='card-header'>
        <h4>Livros no catálogo</h4>
      </div>
      <div className='card-body'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Capa</th> {/* nova coluna */}
              <th>Título</th>
              <th>Páginas</th>
              <th>Categoria</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>

            {livros.map(livro => (
              <tr key={livro.id}>
                <td>{livro.id}</td>

                <td>
                  <img
                    src={`https://covers.openlibrary.org/b/isbn/${livro.isbn}-M.jpg`}
                    alt={livro.titulo}
                    style={{ width: "60px" }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/60x90?text=Sem+Capa";
                    }}
                  />
                </td>

                <td>{livro.titulo}</td>
                <td>{livro.paginas}</td>
                <td>{livro.categoria}</td>
                <td>{livro.descricao}</td>

                <td className="text-nowrap">
                  <Link
                    className="btn btn-primary btn-sm me-2"
                    to={`/editar/${livro.id}`}
                  >
                    Editar
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => excluir(livro.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LivroList;