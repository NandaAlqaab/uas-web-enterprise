// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import MahasiswaList from './pages/MahasiswaList';
import AddMahasiswa from './pages/AddMahasiswa';
import EditMahasiswa from './pages/EditMahasiswa';
import DetailMahasiswa from './pages/DetailMahasiswa';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Toaster position="top-center" reverseOrder={false} />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<MahasiswaList />} />
            <Route path="/add" element={<AddMahasiswa />} />
            <Route path="/detail/:nim" element={<DetailMahasiswa />} />
            <Route path="/edit/:nim" element={<EditMahasiswa />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;