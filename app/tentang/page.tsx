import Link from "next/link";
import { ArrowLeft, Target, Users, GraduationCap, Building2 } from "lucide-react";

const timPenyusun = [
  { nama: "Alif Novianda Sari", nim: "P27824224004" },
  { nama: "Elvina Fatma Putri", nim: "P27824224026" },
  { nama: "Melyna Agustin", nim: "P27824224041" },
  { nama: "Putri Ananda Aunila", nim: "P27824224049" },
  { nama: "Riyang Kyala Sustagia", nim: "P27824224055" },
  { nama: "Tatika Sitha Septian Pratama", nim: "P27824224060" },
  { nama: "Ziyan Kamila", nim: "P27824224066" }
];

const dosenPembimbing = [
  "Astin Nur Hanifah, SST., M. Kes",
  "Teta Puji Rahayu, SST., M. Keb",
  "Dr. Nurlailis Saadah, Skp., M.Kes",
  "Tutiek Herlina, Skm., MMkes"
];

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 font-sans overflow-x-hidden">
      
      <div className="bg-teal-700 text-white pt-10 pb-24 px-4 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/4">
            <Building2 size={300} />
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-teal-100 hover:text-white mb-8 transition">
            <ArrowLeft size={20} /> Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tentang Kami</h1>
          <p className="text-lg text-teal-100 max-w-2xl">
            Platform edukasi Keluarga Berencana (KB) sebagai luaran mata kuliah Teknologi Tepat Guna dalam Kebidanan.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-20">
        
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-8 border border-slate-100">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            
            <div className="shrink-0 flex flex-col items-center justify-center mt-2">
              {/* Pastikan file public/logo.png tersedia */}
              <img 
                src="/logo.png" 
                alt="Logo Poltekkes Surabaya" 
                className="w-32 h-auto object-contain" 
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-teal-800 mb-4 flex items-center gap-2">
                <Target className="text-teal-600" /> Tujuan Aplikasi
              </h2>
              <p className="text-slate-600 leading-relaxed text-justify">
                Aplikasi ini diimplementasikan sebagai media pembelajaran dan informasi dalam mata kuliah <strong className="text-teal-700">Teknologi Tepat Guna dalam Kebidanan</strong>, dengan fokus pada topik Keluarga Berencana (KB). Aplikasi ini bertujuan untuk membantu pengguna dalam melakukan penapisan serta menentukan metode kontrasepsi yang sesuai dengan kebutuhan, kondisi kesehatan, dan karakteristik masing-masing individu.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b pb-4">
              <Users className="text-teal-600" /> Tim Penyusun
            </h2>
            <div className="space-y-3">
              {timPenyusun.map((anggota, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-lg hover:bg-teal-50 transition border border-transparent hover:border-teal-100">
                  <span className="font-medium text-slate-700">{anggota.nama}</span>
                  <span className="text-sm font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded">{anggota.nim}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100 h-fit">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b pb-4">
              <GraduationCap className="text-teal-600" /> Dosen Pengampu
            </h2>
            <div className="flex flex-col gap-3">
              {dosenPembimbing.map((dosen, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold shrink-0">
                    {index + 1}
                  </div>
                  <span className="font-medium text-slate-700 pt-1">{dosen}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}