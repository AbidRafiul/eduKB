"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Menu, X, HeartPulse, Baby, TrendingUp, 
  ChevronDown, Activity 
} from "lucide-react";

const dataKB = [
  { id: 1, nama: "IUD (Spiral)", tipe: "Jangka Panjang", deskripsi: "Sangat efektif mencegah kehamilan hingga 5-10 tahun tanpa mempengaruhi hormon.", kategori: "umum" },
  { id: 2, nama: "Implan (Susuk)", tipe: "Jangka Panjang", deskripsi: "Efektif selama 3 tahun dan aman untuk ibu menyusui.", kategori: "menyusui" },
  { id: 3, nama: "Suntik KB 3 Bulan", tipe: "Hormonal", deskripsi: "Mengandung hormon progestin sehingga aman dan tidak mengganggu produksi ASI.", kategori: "menyusui" },
  { id: 4, nama: "Suntik KB 1 Bulan", tipe: "Hormonal", deskripsi: "Siklus haid biasanya lebih teratur dibanding suntik 3 bulan.", kategori: "umum" },
  { id: 5, nama: "Pil KB", tipe: "Hormonal", deskripsi: "Harus diminum setiap hari di jam yang sama untuk menjaga efektivitasnya.", kategori: "umum" },
  { id: 6, nama: "Kondom", tipe: "Penghalang", deskripsi: "Satu-satunya metode yang melindungi dari Infeksi Menular Seksual (IMS).", kategori: "umum" }
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setFilter] = useState("semua");
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Simple on-mount animation trigger
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true);
  }, []);

  const filteredKB = filter === "semua" 
    ? dataKB 
    : dataKB.filter(item => item.kategori === filter || item.tipe === 'Penghalang');

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans scroll-smooth">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-bold text-teal-700">
            <Activity className="text-teal-500" /> Edu<span className="text-teal-500">KB</span>
          </div>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 font-medium">
            <li><a href="#home" className="hover:text-teal-600 transition">Beranda</a></li>
            <li><a href="#edukasi" className="hover:text-teal-600 transition">Edukasi</a></li>
            <li><a href="#metode" className="hover:text-teal-600 transition">Metode KB</a></li>
            <li><a href="#mitos" className="hover:text-teal-600 transition">Mitos & Fakta</a></li>
          </ul>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-teal-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <ul className="md:hidden bg-white px-4 py-4 flex flex-col gap-4 text-center shadow-lg border-t">
            <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Beranda</a></li>
            <li><a href="#edukasi" onClick={() => setIsMenuOpen(false)}>Edukasi</a></li>
            <li><a href="#metode" onClick={() => setIsMenuOpen(false)}>Metode KB</a></li>
            <li><a href="#mitos" onClick={() => setIsMenuOpen(false)}>Mitos & Fakta</a></li>
          </ul>
        )}
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative h-[80vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-teal-900/80 z-10"></div>
        <Image 
          src="/hero.jpg" 
          alt="Keluarga Sehat" 
          fill
          className="object-cover"
        />
        <div className={`relative z-20 text-white max-w-2xl transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Edukasi Keluarga Berencana</h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">Rencanakan keluarga sehat untuk masa depan yang lebih cerah secara terukur dan medis.</p>
          <a href="/belajar" className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl">
          Mulai Belajar
          </a>
        </div>
      </header>

      {/* Edukasi Section */}
      <section id="edukasi" className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-teal-700 mb-6">Apa Itu Keluarga Berencana?</h2>
          <p className="text-lg leading-relaxed text-slate-600">
            Keluarga Berencana (KB) bukan sekadar membatasi jumlah anak, melainkan <strong className="text-teal-700">perencanaan matang</strong> terkait waktu kehamilan, jarak antar anak, dan kesiapan mental serta finansial keluarga.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <HeartPulse size={40}/>, title: "Kesehatan Ibu Terjaga", desc: "Memberi waktu rahim pulih setelah melahirkan, menurunkan risiko komplikasi." },
            { icon: <Baby size={40}/>, title: "Tumbuh Kembang Optimal", desc: "Setiap anak mendapat ASI dan kasih sayang maksimal karena jarak usia ideal." },
            { icon: <TrendingUp size={40}/>, title: "Stabilitas Finansial", desc: "Membantu merencanakan dana pendidikan dan masa depan dengan lebih terukur." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border-t-4 border-teal-400 text-center">
              <div className="text-teal-500 flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-teal-800 mb-3">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Filter / Kuis Section */}
      <section id="metode" className="bg-slate-100 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-teal-700 text-center mb-10">Pilih KB yang Tepat</h2>
          
          <div className="bg-white max-w-2xl mx-auto p-8 rounded-2xl shadow-sm text-center mb-12 border border-slate-200">
            <p className="text-lg mb-6 font-medium">Apakah Anda sedang dalam masa menyusui?</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { id: "semua", label: "Lihat Semua" },
                { id: "menyusui", label: "Ya, Menyusui" },
                { id: "umum", label: "Tidak / Umum" }
              ].map(btn => (
                <button 
                  key={btn.id}
                  onClick={() => setFilter(btn.id)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${filter === btn.id ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-100 text-teal-700 hover:bg-teal-50 border border-teal-200'}`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Metode KB */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredKB.map((kb) => (
              <div key={kb.id} className="bg-white p-6 rounded-xl shadow-sm hover:-translate-y-1 transition-transform border border-slate-100">
                <span className="inline-block bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {kb.tipe}
                </span>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{kb.nama}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{kb.deskripsi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mitos vs Fakta */}
      <section id="mitos" className="max-w-3xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-teal-700 text-center mb-10">Mitos vs Fakta</h2>
        <div className="space-y-4">
          {[
            { mitos: "KB pasti bikin badan gemuk.", fakta: "Kenaikan berat badan paling dipengaruhi oleh pola makan dan aktivitas fisik. Metode non-hormonal seperti IUD tidak mempengaruhi berat badan." },
            { mitos: "Pakai IUD (Spiral) bisa jalan-jalan ke jantung.", fakta: "Ini tidak benar secara medis. IUD diletakkan di dalam rongga rahim dan tidak memiliki akses untuk berpindah ke organ lain." },
            { mitos: "KB bikin rahim kering dan susah hamil lagi.", fakta: "Kesuburan akan kembali normal setelah penggunaan KB dihentikan. Waktu kembalinya kesuburan berbeda tiap metode." }
          ].map((item, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <button 
                onClick={() => toggleAccordion(index)}
                className="w-full text-left px-6 py-4 font-semibold text-slate-800 flex justify-between items-center hover:bg-slate-50 transition"
              >
                <span>Mitos: {item.mitos}</span>
                <ChevronDown className={`transform transition-transform ${openAccordion === index ? 'rotate-180 text-teal-500' : 'text-slate-400'}`} />
              </button>
              {openAccordion === index && (
                <div className="px-6 py-4 bg-teal-50/50 border-t border-slate-100 text-slate-600">
                  <strong className="text-teal-700">Fakta:</strong> {item.fakta}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Tautan Artikel Relevan */}
      <section className="max-w-6xl mx-auto px-4 py-10 border-t border-slate-200 text-center">
        <h3 className="text-xl font-bold text-teal-700 mb-6">Pelajari Materi Relevan Lainnya:</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/reproduksi" className="px-6 py-2 bg-slate-100 text-teal-700 rounded-full hover:bg-teal-100 transition font-medium">
            Kesehatan Reproduksi & Masa Subur
          </Link>
          <Link href="/peran-pasangan" className="px-6 py-2 bg-slate-100 text-teal-700 rounded-full hover:bg-teal-100 transition font-medium">
            Peran Suami dalam KB
          </Link>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center">
        <p>&copy; 2026 EduKB - Platform Edukasi Kesehatan Reproduksi</p>
      </footer>
    </div>
  );
}