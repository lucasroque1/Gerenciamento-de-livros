import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createLivro, getLivroById, updateLivro } from '../services/api';

interface Livro {
    titulo: string;
    autor: string;
    ano: number;
    genero: string;
    paginas: number;
}
function LivroForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [livro, setLivro] = useState<Livro>({
        titulo: '',
        autor: '',
        ano: 0,
        genero: '',
        paginas: 0,
    });
    useEffect(() => {
        if (id) {
            loadLivro();
        }
    }, [id]);
    const loadLivro = async () => {
        try {
            const response = await getLivroById(id as string);
            setLivro(response.data);
        } catch (error) {
            console.error("Error loading product data", error);
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLivro({
            ...livro,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (id) {
                await updateLivro(id, livro);
            } else {
                await createLivro(livro);
            }
            navigate('/');
        } catch (error) {
            console.error("Error saving product", error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Titulo</label>
                <input
                    type="text"
                    name="titulo"
                    value={livro.titulo}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Autor</label>
                <input
                    type="text"
                    name="autor"
                    value={livro.autor}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Ano</label>
                <input
                    type="number"
                    name="ano"
                    value={livro.ano}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Genero</label>
                <input
                    type="text"
                    name="genero"
                    value={livro.genero}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Paginas</label>
                <input
                    type="number"
                    name="paginas"
                    value={livro.paginas}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Save</button>
        </form>
    );
}
export default LivroForm;