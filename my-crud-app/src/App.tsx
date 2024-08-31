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