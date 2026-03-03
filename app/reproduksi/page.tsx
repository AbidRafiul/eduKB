import Link from "next/link";
import { ArrowLeft, Activity, CalendarHeart, ArrowRight } from "lucide-react";

export default function ReproduksiPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 overflow-x-hidden font-sans">
      
      <div className="bg-teal-700 text-white pt-10 pb-24 px-4 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/4">
            <Activity size={300} />
          </div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-teal-100 hover:text-white mb-8 transition">
            <ArrowLeft size={20} /> Kembali ke Beranda
          </Link>
          <h1 className="text-4xl font-bold mb-4">Mengenal Kesehatan Reproduksi & Masa Subur</h1>
          <p className="text-lg text-teal-100">Kunci dasar perencanaan keluarga adalah memahami tubuh Anda sendiri.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-slate-100">
          <div className="flex items-center gap-4 mb-6 text-teal-700">
            <CalendarHeart size={32} />
            <h2 className="text-2xl font-bold">Memahami Siklus Menstruasi & Masa Subur</h2>
          </div>
          <p className="mb-4 text-slate-600">Siklus menstruasi normal wanita berlangsung antara 21 hingga 35 hari, dihitung dari hari pertama haid hingga hari pertama haid bulan berikutnya.</p>
          <p className="mb-6 text-slate-600"><strong>Masa subur (Jendela Ovulasi)</strong> adalah rentang hari di mana wanita paling berpeluang untuk hamil. Sel telur yang dilepaskan (ovulasi) hanya bertahan hidup 12-24 jam, sedangkan sperma bisa hidup di dalam rahim hingga 5 hari.</p>
          
          <div className="bg-teal-50 p-6 rounded-xl border border-teal-100 mb-8">
            <h3 className="font-bold text-teal-800 mb-2">KB Alami (Metode Kalender)</h3>
            <p className="text-slate-600 text-sm">Metode ini mengandalkan perhitungan masa subur untuk menghindari hubungan badan di waktu tersebut. Namun, tingkat kegagalannya cukup tinggi (kurang efektif) karena siklus wanita bisa bergeser akibat stres, kelelahan, atau hormon.</p>
          </div>
          
          <div className="flex items-center gap-4 mb-6 text-teal-700 mt-10">
            <Activity size={32} />
            <h2 className="text-2xl font-bold">Mengenali Tanda Fisik Masa Subur</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-slate-200 p-6 rounded-xl hover:shadow-md transition">
              <h3 className="text-xl font-bold text-teal-700 mb-2">Perubahan Lendir Serviks</h3>
              <p className="text-slate-600 text-sm">Menjelang ovulasi, tubuh akan memproduksi cairan vagina yang bening, licin, dan elastis (mirip putih telur mentah). Ini berfungsi membantu sperma berenang menuju sel telur.</p>
            </div>
            <div className="border border-slate-200 p-6 rounded-xl hover:shadow-md transition">
              <h3 className="text-xl font-bold text-teal-700 mb-2">Suhu Basal Tubuh Naik</h3>
              <p className="text-slate-600 text-sm">Suhu tubuh saat baru bangun tidur (sebelum beraktivitas) akan sedikit meningkat sekitar 0.3 - 0.5 derajat Celcius tepat setelah sel telur dilepaskan.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6 text-teal-700 mt-10">
            <Activity size={32} />
            <h2 className="text-2xl font-bold">Persiapan Pra-Kehamilan (Jika Ingin Hamil Lagi)</h2>
          </div>
          <ul className="list-disc pl-6 space-y-3 text-slate-600 marker:text-teal-500 mb-8">
            <li><strong>Konsumsi Asam Folat:</strong> Sangat penting diminum 3 bulan <em>sebelum</em> pembuahan untuk mencegah cacat tabung saraf pada janin.</li>
            <li><strong>Cek Kesehatan Berjangka:</strong> Memastikan ibu bebas dari anemia, rubella, dan penyakit infeksi menular lainnya.</li>
            <li><strong>Kesehatan Mental:</strong> Persiapan mental sama pentingnya dengan fisik. Hindari stres berlebih yang dapat mengganggu hormon reproduksi.</li>
          </ul>
          
          <Link href="/ovulasi" className="mt-4 inline-flex items-center justify-center w-full md:w-auto gap-2 bg-teal-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-700 transition shadow-md">
             Coba Kalkulator Masa Subur <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}