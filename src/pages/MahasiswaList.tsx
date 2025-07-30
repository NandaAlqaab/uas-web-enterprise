// src/pages/MahasiswaList.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../utils/supabase';
import toast from 'react-hot-toast';

// Definisikan tipe data untuk objek mahasiswa
interface Mahasiswa {
  NIM: string;
  Name: string;
  Gender: string;
  Status: boolean;
  Contact: string;
}

const MahasiswaList = () => {
  const [mahasiswas, setMahasiswas] = useState<Mahasiswa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMahasiswas();
  }, []);

  const fetchMahasiswas = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('mahasiswa')
      .select('NIM, Name, Gender, Status, Contact')
      .order('Name', { ascending: true });

    if (error) {
      toast.error('Gagal mengambil data mahasiswa.');
      console.error(error);
    } else if (data) {
      setMahasiswas(data);
    }
    setLoading(false);
  };

  const handleDelete = async (nim: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      const { error } = await supabase.from('mahasiswa').delete().eq('NIM', nim);

      if (error) {
        toast.error('Gagal menghapus data.');
      } else {
        toast.success('Data berhasil dihapus!');
        fetchMahasiswas(); // Refresh data setelah hapus
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Memuat data...</div>;
  }
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Daftar Mahasiswa</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nama</th>
              <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">NIM</th>
              <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Gender</th>
              <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Kontak</th>
              <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswas.map((mhs) => (
              <tr key={mhs.NIM} className="hover:bg-gray-50">
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{mhs.Name}</td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{mhs.NIM}</td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{mhs.Gender === 'L' ? 'Laki-laki' : 'Perempuan'}</td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{mhs.Contact}</td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  <span className={`px-2 py-1 font-semibold leading-tight rounded-full ${mhs.Status ? 'text-green-900 bg-green-200' : 'text-red-900 bg-red-200'}`}>
                    {mhs.Status ? 'Aktif' : 'Tidak Aktif'}
                  </span>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  <Link to={`/detail/${mhs.NIM}`} className="text-indigo-600 hover:text-indigo-900 mr-3 font-medium">Detail</Link>
                  <Link to={`/edit/${mhs.NIM}`} className="text-indigo-600 hover:text-indigo-900 mr-3 font-medium">Edit</Link>
                  <button onClick={() => handleDelete(mhs.NIM)} className="text-red-600 hover:text-red-900 font-medium">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MahasiswaList;