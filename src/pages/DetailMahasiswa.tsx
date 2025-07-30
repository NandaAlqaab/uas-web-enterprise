// src/pages/DetailMahasiswa.tsx
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// Pastikan path ke supabaseClient sudah benar
import toast from 'react-hot-toast';
import { FaUser, FaVenusMars, FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaCheckCircle, FaTimesCircle, FaArrowLeft } from 'react-icons/fa';
import supabase from '../utils/supabase';

// Pastikan Anda memiliki tipe data ini atau sesuaikan path-nya
// interface Mahasiswa { ... } 

const DetailMahasiswa = () => {
  const { nim } = useParams<{ nim: string }>();
  const navigate = useNavigate();
  // Gunakan tipe data Mahasiswa yang sudah Anda definisikan
  const [mahasiswa, setMahasiswa] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!nim) return;
      setLoading(true);
      
      const { data, error } = await supabase
        .from('mahasiswa')
        .select('*')
        .eq('NIM', nim)
        .single();

      if (error) {
        toast.error("Data mahasiswa tidak ditemukan.");
        navigate('/');
      } else {
        setMahasiswa(data);
      }
      setLoading(false);
    };
    fetchDetail();
  }, [nim, navigate]);
  
  // Fungsi untuk format tanggal menjadi lebih rapi
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return <div className="text-center mt-20 text-xl font-semibold">Memuat Data...</div>;
  }

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header Kartu */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center">
              <FaUser className="text-white text-4xl" />
            </div>
            <div className="ml-5">
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{mahasiswa.Name}</h1>
              <p className="text-lg text-indigo-200 font-mono">{mahasiswa.NIM}</p>
            </div>
          </div>
        </div>
        
        {/* Body Kartu */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Detail Item */}
          <div className="flex items-start space-x-4 py-2 border-b border-gray-100">
            <FaVenusMars className="text-xl text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Jenis Kelamin</p>
              <p className="font-semibold text-lg text-gray-800">{mahasiswa.Gender === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 py-2 border-b border-gray-100">
            <FaCalendarAlt className="text-xl text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Tanggal Lahir</p>
              <p className="font-semibold text-lg text-gray-800">{formatDate(mahasiswa.BirthDate)}</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 py-2 border-b border-gray-100 md:border-b-0">
            <FaPhone className="text-xl text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Kontak</p>
              <p className="font-semibold text-lg text-gray-800">{mahasiswa.Contact || 'Tidak ada'}</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 py-2">
             {mahasiswa.Status 
               ? <FaCheckCircle className="text-2xl text-green-500 mt-1" />
               : <FaTimesCircle className="text-2xl text-red-500 mt-1" />
             }
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className={`font-bold text-xl ${mahasiswa.Status ? 'text-green-600' : 'text-red-600'}`}>
                {mahasiswa.Status ? 'Aktif' : 'Tidak Aktif'}
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 py-2 md:col-span-2 border-t border-gray-100 pt-6">
            <FaMapMarkerAlt className="text-xl text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Alamat</p>
              <p className="font-semibold text-lg text-gray-800">{mahasiswa.Address || 'Tidak ada'}</p>
            </div>
          </div>
        </div>
        
        {/* Footer Kartu */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold text-sm rounded-lg shadow-md transition-colors duration-300"
          >
            <FaArrowLeft className="mr-2" />
            Kembali ke Daftar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailMahasiswa;