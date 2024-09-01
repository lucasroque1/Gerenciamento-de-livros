# Gerenciamento-de-livros

Este projeto é uma aplicação React para gerenciar um inventário de livros, permitindo adicionar, editar, visualizar e deletar livros. A aplicação utiliza `json-server` como backend simulado.

## Requisitos

- Node.js instalado
- npm ou yarn
- json-server

## Iniciando o projeto

1. Configuração do Projeto
   
1.1 Instalação do Vite com React e TypeScript:

npm create vite@latest my-crud-app --template react-ts

cd my-crud-app

npm install

1.2 Instalação das Dependências Necessárias:

npm install axios react-router-dom

1.3 Configuração do json-server:

npm install json-server


Agora crie um arquivo db.json na raiz do projeto:

{
  "livros": [
    {
      "id": "1",
      "titulo": "",
      "autor": "",
      "ano": "1",
      "genero": "",
      "paginas": "1"
    }
  ]
}
Inicializando o servidor:

npx json-server --watch db.json --port 3001

2. Estruturando o Projeto
    
Aqui está a estrutura básica que você deve seguir:

src/
components/
 LivroList.tsx
 LivroForm.tsx
 LivroItem.tsx
 
pages/
 Home.tsx
 EditLivro.tsx
 AddLivro.tsx
 
services/
 api.ts
 
App.tsx
main.tsx

3 Implementação dos Componentes

3.1 api.ts (Serviço de API)

import axios from 'axios';
const api = axios.create({
 baseURL: 'http://localhost:3001'
 
});
export const getLivros = () => api.get('/livros');
export const getLivroById = (id: string) => api.get(`/livros/${id}`);
export const createLivro = (livro: any) => api.post('/livros', livro);
export const updateLivro = (id: string, livro: any) => api.put(`/livros/${id}`, livro);
export const deleteLivro = (id: string) => api.delete(`/livros/${id}`);

3.2 LivroList.tsx

import { useEffect, useState } from 'react';
import { getLivros, deleteLivro } from '../services/api';
import { Link } from 'react-router-dom';
interface Livro {
 id: string;
 titulo: string;
 autor: string;
 ano: number;
 genero: strimg;
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
            <h1>
            Livro List
            </h1>
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

3.3 LivroForm.tsx

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

3.4 Home.tsx

import LivroList from '../components/LivroList';

function Home() {
    return (
        <div>
            <h1>Livro Management</h1>
            <LivroList />
        </div>
    );
}
export default Home;
    
3.5 AddLivro.tsx

import LivroForm from '../components/LivroForm';
function AddLivro() {
    return (
        <div>
            <h1>Adicionar Livro</h1>
            <LivroForm />
        </div>
    );
}
export default AddLivro;
    
3.6 EditLivro.tsx

import LivroForm from '../components/LivroForm';
function EditLivro() {
    return (
        <div>
            <h1>Editar Livro</h1>
            <LivroForm />
        </div>
    );
}
export default EditLivro;
    
3.7 App.tsx

import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Home from './pages/Home';
import AddLivro from './pages/AddLivro';
import EditLivro from './pages/EditLivro';
import LivroForm from './components/LivroForm';
import LivroList from './components/LivroList';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddLivro />} />
        <Route path="/edit/:id" element={<EditLivro />} />
        <Route path="/from" element={<LivroForm />} />
        <Route path="/list" element={<LivroList />} />
      </Routes>
    </Router>
  );
}
export default App;
