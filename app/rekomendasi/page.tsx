"use client";
import Link from "next/link";
import { ArrowLeft, Stethoscope, AlertTriangle, CheckCircle, Info, Activity, User, Baby, HeartPulse } from "lucide-react";
import { daftarRiwayat } from "@/data/kbData";
import { useRekomendasiKB } from "@/hooks/useRekomendasiKB";

export default function RekomendasiPage() {
  const { inputData, isEvaluated, setIsEvaluated, handleChange, toggleRiwayat, handleEvaluate, hasilEvaluasi } = useRekomendasiKB();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 font-sans overflow-x-hidden">
      {/* Header */}
      <div className="bg-teal-700 text-white pt-10 pb-20 px-4 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/4">
            <Baby size={300} />
          </div>
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-teal-100 hover:text-white mb-8 transition">
            <ArrowLeft size={20} /> Kembali ke Beranda
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Stethoscope size={40} className="text-teal-300" />
            <h1 className="text-3xl md:text-4xl font-bold">Smart Contraception Match</h1>
          </div>
          <p className="text-lg text-teal-100">Clinical Decision Support System (CDSS) berbasis kriteria kelayakan medis WHO MEC.</p>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-20">
        {!isEvaluated ? (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b pb-3">
                <User className="text-teal-600" /> Data Dasar & Reproduksi
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Rentang Usia</label>
                  <div className="flex gap-3">
                    {["kurang_20", "20_35", "lebih_35"].map(val => (
                      <label key={val} className={`flex-1 text-center p-3 rounded-lg border cursor-pointer transition ${inputData.umur === val ? 'bg-teal-50 border-teal-500 text-teal-700 font-bold' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                        <input type="radio" className="hidden" onChange={() => handleChange("umur", val)} />
                        {val === "kurang_20" ? "< 20 Thn" : val === "20_35" ? "20-35 Thn" : "> 35 Thn"}
                      </label>
                    ))}
                  </div>
                </div>
                {/* Bagian Input Lainnya Diringkas Formatnya */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Ingin Hamil Lagi?</label>
                  <div className="flex gap-3">
                    {["ya", "tidak", "ragu"].map(val => (
                      <label key={val} className={`flex-1 text-center p-3 rounded-lg border cursor-pointer transition ${inputData.inginHamil === val ? 'bg-teal-50 border-teal-500 text-teal-700 font-bold' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                        <input type="radio" className="hidden" onChange={() => handleChange("inginHamil", val)} />
                        {val.charAt(0).toUpperCase() + val.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Status Menyusui</label>
                  <div className="flex gap-3">
                    {["tidak", "kurang_6", "lebih_6"].map(val => (
                      <label key={val} className={`flex-1 text-center p-3 rounded-lg border cursor-pointer transition ${inputData.menyusui === val ? 'bg-teal-50 border-teal-500 text-teal-700 font-bold' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                        <input type="radio" className="hidden" onChange={() => handleChange("menyusui", val)} />
                        {val === "tidak" ? "Tidak" : val === "kurang_6" ? "< 6 Bln" : "> 6 Bln"}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Pasca Persalinan (Nifas)</label>
                  <div className="flex gap-3">
                    {["tidak", "kurang_6_minggu", "lebih_6_minggu"].map(val => (
                      <label key={val} className={`flex-1 text-center p-3 rounded-lg border cursor-pointer transition ${inputData.nifas === val ? 'bg-teal-50 border-teal-500 text-teal-700 font-bold' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                        <input type="radio" className="hidden" onChange={() => handleChange("nifas", val)} />
                        {val === "tidak" ? "Tidak" : val === "kurang_6_minggu" ? "< 6 Mgg" : "> 6 Mgg"}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 border-b pb-3">
                <HeartPulse className="text-teal-600" /> Riwayat Kesehatan Klinis
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {daftarRiwayat.map(penyakit => (
                  <label key={penyakit.id} className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${inputData.riwayat.includes(penyakit.id) ? 'bg-teal-50 border-teal-500 shadow-sm' : 'bg-white border-slate-200 hover:border-teal-300'}`}>
                    <input type="checkbox" className="mt-1 w-5 h-5 text-teal-600 rounded" checked={inputData.riwayat.includes(penyakit.id)} onChange={() => toggleRiwayat(penyakit.id)} />
                    <span className={`text-sm font-medium ${inputData.riwayat.includes(penyakit.id) ? 'text-teal-800' : 'text-slate-600'}`}>{penyakit.nama}</span>
                  </label>
                ))}
              </div>
            </div>
            <button onClick={handleEvaluate} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all text-lg flex justify-center items-center gap-2">
              <Activity /> Analisis Metode KB Sekarang
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-teal-800">Klasifikasi Kriteria WHO MEC</h2>
              <button onClick={() => setIsEvaluated(false)} className="text-teal-700 bg-teal-50 font-semibold hover:bg-teal-100 border border-teal-200 px-6 py-2.5 rounded-xl transition-all shadow-sm">
                Input Ulang Data
              </button>
            </div>
            {hasilEvaluasi.map((hasil) => {
              const styleConfig = hasil.category === 1 
                ? { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-800", badge: "Aman", badgeBg: "bg-emerald-100", icon: <CheckCircle className="text-emerald-500" size={24} /> }
                : hasil.category === 2 
                ? { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", badge: "Manfaat > Risiko", badgeBg: "bg-blue-100", icon: <Info className="text-blue-500" size={24} /> }
                : hasil.category === 3 
                ? { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-800", badge: "Risiko > Manfaat", badgeBg: "bg-orange-100", icon: <AlertTriangle className="text-orange-500" size={24} /> }
                : { bg: "bg-red-50", border: "border-red-200", text: "text-red-800", badge: "Dilarang", badgeBg: "bg-red-100", icon: <AlertTriangle className="text-red-600" size={24} /> };

              return (
                <div key={hasil.id} className={`${styleConfig.bg} border ${styleConfig.border} rounded-2xl p-6 shadow-sm transition-all hover:shadow-md`}>
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-white/80 rounded-full text-xs font-bold text-slate-600 mb-2 border border-slate-200">{hasil.tipe}</span>
                      <h3 className={`text-xl font-bold ${styleConfig.text}`}>{hasil.nama}</h3>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${styleConfig.badgeBg} border ${styleConfig.border} font-bold text-sm ${styleConfig.text} whitespace-nowrap`}>
                      {styleConfig.icon} <span>Kategori {hasil.category}: {styleConfig.badge}</span>
                    </div>
                  </div>
                  <div className="bg-white/70 p-4 rounded-xl border border-white/50">
                    <p className="text-sm font-bold text-slate-700 mb-2">Penjelasan Klinis:</p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm">
                      {hasil.reasons.map((reason, i) => <li key={i}>{reason}</li>)}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}