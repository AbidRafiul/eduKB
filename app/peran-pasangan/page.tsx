import Link from "next/link";
import { ArrowLeft, Users, HeartHandshake } from "lucide-react";

export default function PeranPasanganPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 overflow-x-hidden font-sans">
      
      <div className="bg-teal-700 text-white pt-10 pb-24 px-4 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/4">
            <HeartHandshake size={300} />
          </div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-teal-100 hover:text-white mb-8 transition">
            <ArrowLeft size={20} /> Kembali ke Beranda
          </Link>
          <h1 className="text-4xl font-bold mb-4">KB Bukan Hanya Tugas Istri</h1>
          <p className="text-lg text-teal-100">Peran aktif suami (pasangan) sangat krusial dalam kesuksesan Keluarga Berencana.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-20 space-y-8">
        
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-slate-100">
          <div className="flex items-center gap-4 mb-6 text-slate-700">
            <Users size={32} className="text-teal-600" />
            <h2 className="text-2xl font-bold">Keterlibatan Pria dalam KB</h2>
          </div>
          <p className="mb-6 text-slate-600 leading-relaxed">Secara historis, beban kontrasepsi lebih banyak ditanggung oleh perempuan. Padahal, penggunaan alat kontrasepsi oleh pria juga sangat efektif, lebih praktis, dan memiliki efek samping medis yang jauh lebih minim.</p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="border border-slate-200 p-6 rounded-xl hover:shadow-md transition">
              <h3 className="text-xl font-bold text-teal-700 mb-2">1. Kondom Pria</h3>
              <p className="text-slate-600 text-sm">Metode penghalang yang sangat efektif jika digunakan dengan benar setiap kali berhubungan. Selain mencegah kehamilan, ini adalah <strong>satu-satunya</strong> alat yang mencegah penularan infeksi seksual.</p>
            </div>
            <div className="border border-slate-200 p-6 rounded-xl hover:shadow-md transition">
              <h3 className="text-xl font-bold text-teal-700 mb-2">2. Vasektomi (MOP)</h3>
              <p className="text-slate-600 text-sm">Metode operasi kecil permanen untuk pria yang tidak ingin punya anak lagi. <strong>Mitos:</strong> Vasektomi sama dengan kebiri. <strong>Fakta:</strong> Sama sekali berbeda, vasektomi tidak memengaruhi gairah, kejantanan, maupun hormon pria sama sekali.</p>
            </div>
          </div>
        </div>

        <div className="bg-teal-50 rounded-2xl p-8 md:p-12 border border-teal-100 text-center">
          <HeartHandshake size={48} className="mx-auto text-teal-600 mb-4" />
          <h2 className="text-2xl font-bold text-teal-800 mb-4">Dukungan Emosional Suami</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Jika istri yang menggunakan KB (seperti Pil atau Suntik/IUD), dukungan suami sangat dibutuhkan. Misalnya, mengingatkan jadwal minum pil, menemani ke fasilitas kesehatan, dan memahami jika ada perubahan *mood* akibat adaptasi hormon. Keputusan memilih jenis KB harus selalu menjadi <strong>keputusan bersama</strong>.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">Tanggung Jawab Bersama</h2>
          <ul className="space-y-4 text-slate-600">
            <li className="flex gap-3">
              <span className="text-teal-500 font-bold">✓</span>
              <p><strong>Komunikasi Terbuka:</strong> Suami harus peka dan aktif bertanya mengenai kenyamanan istri terhadap alat kontrasepsi yang dipakai. Jika ada keluhan (seperti pusing atau pendarahan), segera sepakati untuk berkonsultasi ke bidan/dokter.</p>
            </li>
            <li className="flex gap-3">
              <span className="text-teal-500 font-bold">✓</span>
              <p><strong>Perencanaan Finansial:</strong> KB sangat erat kaitannya dengan ekonomi. Suami berperan penting dalam menghitung kesiapan dana persalinan, kebutuhan gizi anak, hingga pendidikan masa depan sebelum memutuskan untuk menambah momongan.</p>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}