"use client";
import Link from "next/link";
import { ArrowLeft, CalendarHeart, Activity, Info } from "lucide-react";
import { useMasaSubur } from "@/hooks/useMasaSubur";

function formatTanggal(d: Date) {
  return d.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

export default function OvulasiPage() {
  const { hpht, setHpht, siklus, setSiklus, hasil, hitungMasaSubur } = useMasaSubur();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 font-sans overflow-x-hidden">
      <div className="bg-teal-700 text-white pt-10 pb-20 px-4 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/4">
            <Activity size={260} />
          </div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-teal-100 hover:text-white mb-8 transition">
            <ArrowLeft size={20} /> Kembali ke Beranda
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <CalendarHeart size={36} className="text-teal-100" />
            <h1 className="text-3xl md:text-4xl font-bold">Kalkulator Masa Subur</h1>
          </div>
          <p className="text-lg text-teal-100 max-w-2xl">Bantu memperkirakan hari ovulasi dan masa subur Anda berdasarkan HPHT dan rata-rata panjang siklus haid.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-slate-100">
          <form onSubmit={hitungMasaSubur} className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">HPHT (Hari Pertama Haid Terakhir)</label>
                <input type="date" value={hpht} onChange={(e) => setHpht(e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Rata-rata Panjang Siklus Haid (hari)</label>
                <input type="number" min={21} max={35} value={siklus} onChange={(e) => setSiklus(e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white" required />
                <p className="mt-1 text-xs text-slate-500">Umumnya antara 21–35 hari, paling sering 28 hari.</p>
              </div>
              <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all flex justify-center items-center gap-2">
                Hitung Masa Subur
              </button>
              <div className="flex items-start gap-2 text-xs text-slate-600 bg-teal-50/70 border border-teal-100 rounded-xl p-3">
                <Info size={16} className="text-teal-600 mt-0.5 shrink-0" />
                <p>Hasil ini hanya perkiraan berdasarkan metode kalender, bukan alat diagnosis. Siklus yang tidak teratur, stres, dan kondisi medis tertentu dapat mengubah waktu ovulasi.</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 md:p-6 space-y-4">
              <h2 className="text-lg font-bold text-teal-800 mb-1">Hasil Perkiraan</h2>
              {hasil ? (
                <div className="space-y-3 text-sm">
                  <div className="p-3 rounded-xl bg-white border border-teal-100 shadow-sm">
                    <p className="text-xs font-bold text-teal-700 uppercase mb-1">Rentang Masa Subur</p>
                    <p className="font-semibold text-slate-800">{formatTanggal(hasil.fertileStart)} s/d {formatTanggal(hasil.fertileEnd)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-emerald-100 shadow-sm">
                    <p className="text-xs font-bold text-emerald-700 uppercase mb-1">Perkiraan Hari Ovulasi</p>
                    <p className="font-semibold text-slate-800">{formatTanggal(hasil.ovulationDate)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-600 uppercase mb-1">Perkiraan Haid Berikutnya</p>
                    <p className="font-semibold text-slate-800">{formatTanggal(hasil.nextPeriod)}</p>
                  </div>
                  <p className="mt-4 text-xs text-slate-500 leading-relaxed text-justify">
                    Untuk <span className="font-semibold text-slate-700">menghindari kehamilan</span> dengan metode kalender, dianjurkan tidak melakukan hubungan seksual tanpa pengaman pada rentang masa subur di atas. Jika <span className="font-semibold text-slate-700">sedang merencanakan kehamilan</span>, justru disarankan berhubungan pada rentang hari tersebut.
                  </p>
                </div>
              ) : (
                <div className="h-full min-h-[200px] flex items-center justify-center text-center text-sm text-slate-500">
                  Masukkan HPHT dan panjang siklus untuk melihat perkiraan masa subur Anda di sini.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}