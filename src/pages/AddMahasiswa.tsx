// src/pages/AddMahasiswa.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import supabase from '../utils/supabase';

const AddMahasiswa = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    NIM: '',
    Name: '',
    Gender: 'L',
    BirthDate: '',
    Address: '',
    Contact: '',
    Status: true,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        // Karena HTML tidak punya `e.target.checked` di tipe ini, kita perlu cast
        const checked = (e.target as HTMLInputElement).checked;
        setFormData({ ...formData, [name]: checked });
    } else {
        setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('mahasiswa').insert([formData]);

    if (error) {
      toast.error(`Gagal menambahkan data: ${error.message}`);
    } else {
      toast.success('Data mahasiswa berhasil ditambahkan!');
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Tambah Mahasiswa Baru</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div>
          <label htmlFor="NIM" className="block text-sm font-medium text-gray-700">NIM</label>
          <input type="text" name="NIM" id="NIM" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
          <label htmlFor="Name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
          <input type="text" name="Name" id="Name" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
          <label htmlFor="Gender" className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
          <select name="Gender" id="Gender" value={formData.Gender} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>
        <div>
          <label htmlFor="BirthDate" className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
          <input type="date" name="BirthDate" id="BirthDate" required onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
          <label htmlFor="Address" className="block text-sm font-medium text-gray-700">Alamat</label>
          <textarea name="Address" id="Address" rows={3} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </div>
        <div>
          <label htmlFor="Contact" className="block text-sm font-medium text-gray-700">Kontak</label>
          <input type="text" name="Contact" id="Contact" onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div className="flex items-center">
            <input type="checkbox" name="Status" id="Status" checked={formData.Status} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"/>
            <label htmlFor="Status" className="ml-2 block text-sm text-gray-900">Status Aktif</label>
        </div>
        <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => navigate('/')} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Batal</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300">
                {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default AddMahasiswa;