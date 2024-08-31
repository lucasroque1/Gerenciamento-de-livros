import { useEffect, useState } from 'react';
import { getLivros, deleteLivro } from '../services/api';
import { Link } from 'react-router-dom';
interface Livro {
    id: string;
    titulo: string;
    autor: string;
    ano: number;
    genero: string;
    paginas: number;
}
function LivroList() {
    const [livros, setLivros] = useState<Livro[]>([]);
    useEffect(() => {
        loadLivros();
    }, []);
    const loadLivros = async () => {
        const response = await getLivros();
        setLivros(response.data);
    };
    const handleDelete = async (id: string) => {
        await deleteLivro(id);
        loadLivros();
    };
    return (
        <div>
            <h1>Livro List</h1>
            <Link to="/add">Adiconar um Livro</Link>
                {livros.map((livro) => (
                    <li key={livro.id}>
                        Titulo:{livro.titulo} - {livro.autor} - Ano:{livro.ano} -  Genero:{livro.genero} - {livro.paginas} quantidades
                        <span style={{ marginRight: '10px' }}>quantidades</span>
                        <Link to={`/edit/${livro.id}`}style={{ marginRight: '10px' }}>Edit</Link>
                        <button onClick={() => handleDelete(livro.id)}>Delete</button>
                    </li>
                ))}
        </div>
    );
}
export default LivroList;