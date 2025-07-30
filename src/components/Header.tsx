// src/components/Header.tsx
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-300">
          🎓 Manajemen Mahasiswa
        </Link>
        <Link
          to="/add"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          + Tambah Mahasiswa
        </Link>
      </nav>
    </header>
  );
};

export default Header;