import { Link } from "react-router-dom"

const Menu = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary shadow-sm">
      <div className="container">
        {/* Lado Esquerdo: Marca */}
        <Link className="navbar-brand" to="/">Catálogo de Livros</Link>

        {/* Lado Direito: Links com espaçamento maior */}
        <div className="navbar-nav d-flex flex-row align-items-center gap-5">
          <Link className="nav-link" to="/">Lista de Livros</Link>
          
          <span className="text-light opacity-50" style={{ fontSize: '0.8rem' }}>|</span>
          
          <Link className="nav-link" to="/novo">Adicionar Livro</Link>
        </div>
      </div>
    </nav>
  )
}

export default Menu