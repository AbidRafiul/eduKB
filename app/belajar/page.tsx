// app/belajar/page.tsx
import Link from "next/link";
import { ArrowLeft, BookOpen, ShieldCheck } from "lucide-react";

export default function BelajarPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Header */}
      <div className="bg-teal-700 text-white pt-10 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-teal-100 hover:text-white mb-8 transition">
            <ArrowLeft size={20} /> Kembali ke Beranda
          </Link>
          <h1 className="text-4xl font-bold mb-4">Panduan Lengkap Memahami KB</h1>
          <p className="text-lg text-teal-100">Pelajari bagaimana kontrasepsi bekerja dan fase perencanaan keluarga yang ideal.</p>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="max-w-4xl mx-auto px-4 -mt-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <div className="flex items-center gap-4 mb-6 text-teal-700">
            <BookOpen size={32} />
            <h2 className="text-2xl font-bold">3 Fase Perencanaan Keluarga (KB)</h2>
          </div>
          <p className="mb-6 text-slate-600 leading-relaxed">Secara medis dan demografis, tujuan program KB dibagi menjadi tiga fase utama sesuai dengan rentang usia dan kondisi reproduksi wanita:</p>
          
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 rounded-xl border-l-4 border-teal-500">
              <h3 className="text-xl font-bold text-teal-800 mb-2">1. Fase Menunda Kehamilan (Usia &lt; 20 Tahun)</h3>
              <p className="text-slate-600">Kehamilan di bawah usia 20 tahun memiliki risiko medis tinggi bagi ibu dan janin karena rahim belum matang sempurna. Di fase ini, sangat disarankan menggunakan metode kontrasepsi jika sudah aktif secara seksual.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border-l-4 border-emerald-500">
              <h3 className="text-xl font-bold text-teal-800 mb-2">2. Fase Menjarangkan Kehamilan (Usia 20 - 35 Tahun)</h3>
              <p className="text-slate-600">Ini adalah masa paling aman untuk hamil dan melahirkan. KB digunakan untuk mengatur jarak ideal antar anak (minimal 2-3 tahun) agar ibu bisa pulih dan anak mendapat ASI maksimal.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border-l-4 border-cyan-500">
              <h3 className="text-xl font-bold text-teal-800 mb-2">3. Fase Mengakhiri Kesuburan (Usia &gt; 35 Tahun)</h3>
              <p className="text-slate-600">Kehamilan di atas usia 35 tahun rentan akan komplikasi (seperti preeklamsia). Di fase ini, pasangan biasanya disarankan memilih metode KB jangka panjang (IUD/Implan) atau permanen (Steril).</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6 text-teal-700">
            <ShieldCheck size={32} />
            <h2 className="text-2xl font-bold">Bagaimana Kontrasepsi Bekerja?</h2>
          </div>
          <p className="mb-4 text-slate-600">Alat kontrasepsi bekerja dengan salah satu (atau kombinasi) dari tiga mekanisme berikut:</p>
          <ul className="list-disc pl-6 space-y-3 text-slate-600 marker:text-teal-500">
            <li><strong>Mencegah Pelepasan Sel Telur (Ovulasi):</strong> Hormon pada Pil, Suntik, dan Implan &quot;menipu&quot; tubuh agar tidak melepaskan sel telur setiap bulannya.</li>
            <li><strong>Menghalangi Pertemuan Sperma & Telur:</strong> Metode seperti Kondom membuat penghalang fisik, sementara IUD (Spiral) menciptakan lingkungan rahim yang tidak ramah bagi sperma.</li>
            <li><strong>Menebalkan Lendir Serviks:</strong> Hormon progestin membuat lendir di leher rahim menjadi sangat kental, sehingga sperma sulit berenang masuk ke dalam rahim.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}