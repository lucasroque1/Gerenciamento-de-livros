import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:3001'
});
export const getLivros = () => api.get('/livros');
export const getLivroById = (id: string) => api.get(`/livros/${id}`);
export const createLivro = (livro: any) => api.post('/livros', livro);
export const updateLivro = (id: string, livro: any) => api.put(`/livros/${id}`, livro);
export const deleteLivro = (id: string) => api.delete(`/livros/${id}`);