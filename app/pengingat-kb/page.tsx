"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bell, Syringe, Pill, Activity, Info } from "lucide-react";

type JenisKB = "pil" | "suntik1" | "suntik3" | "lainnya";

type ReminderData = {
  metode: string;
  jenis: JenisKB;
  lastVisit: string; // ISO date
  nextVisit: string; // ISO date
};

const intervalHari: Record<JenisKB, number> = {
  pil: 30,
  suntik1: 30,
  suntik3: 90,
  lainnya: 180,
};

function formatTanggalIndo(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PengingatKBPage() {
  const [jenis, setJenis] = useState<JenisKB>("suntik3");
  const [lastVisit, setLastVisit] = useState("");
  const [reminder, setReminder] = useState<ReminderData | null>(null);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const raw = localStorage.getItem("edukbKbReminder");
      if (!raw) return;
      const parsed: ReminderData = JSON.parse(raw);
      setReminder(parsed);
      setJenis(parsed.jenis);
      setLastVisit(parsed.lastVisit.split("T")[0] || "");
    } catch {
      // abaikan error
    }
  }, []);

  const hitungDanSimpan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lastVisit) return;

    const baseDate = new Date(lastVisit);
    const hari = intervalHari[jenis] ?? 30;
    const next = new Date(baseDate);
    next.setDate(baseDate.getDate() + hari);

    const metodeNama =
      jenis === "pil"
        ? "Pil KB Harian"
        : jenis === "suntik1"
        ? "Suntik KB 1 Bulan"
        : jenis === "suntik3"
        ? "Suntik KB 3 Bulan"
        : "Kontrol KB Lainnya";

    const data: ReminderData = {
      metode: metodeNama,
      jenis,
      lastVisit: baseDate.toISOString(),
      nextVisit: next.toISOString(),
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("edukbKbReminder", JSON.stringify(data));
    }

    setReminder(data);
  };

  const hitungSisaHari = (nextVisit: string) => {
    const today = new Date();
    const next = new Date(nextVisit);

    const todayMid = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const nextMid = new Date(
      next.getFullYear(),
      next.getMonth(),
      next.getDate()
    );

    const diffMs = nextMid.getTime() - todayMid.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  };

  const sisaHari = reminder ? hitungSisaHari(reminder.nextVisit) : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 font-sans overflow-x-hidden">
      
      {/* Header - Bebas overflow-hidden agar kotak form bisa menimpa rapi */}
      <div className="bg-teal-700 text-white pt-10 pb-20 px-4 relative">
        
        {/* Kandang gaib untuk ikon agar tidak tumpah ke kanan layar */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/4">
            <Activity size={260} />
          </div>
        </div>

        {/* Konten Header (z-10) */}
        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-teal-100 hover:text-white mb-8 transition"
          >
            <ArrowLeft size={20} /> Kembali ke Beranda
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <Bell size={36} className="text-teal-100" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Pengingat Jadwal Kontrol KB
            </h1>
          </div>
          <p className="text-lg text-teal-100 max-w-2xl">
            Simpan jadwal kontrol KB Anda di browser sehingga setiap kali
            membuka EduKB akan muncul pengingat otomatis.
          </p>
        </div>
      </div>

      {/* Konten Utama (z-20) */}
      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-slate-100 space-y-8">
          <form
            onSubmit={hitungDanSimpan}
            className="grid md:grid-cols-2 gap-8 items-start"
          >
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Jenis KB yang Digunakan
                </label>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition ${jenis === "pil" ? "border-teal-500 bg-teal-50" : "border-slate-200 hover:bg-slate-50"}`}>
                    <input
                      type="radio"
                      name="jenis"
                      className="hidden"
                      checked={jenis === "pil"}
                      onChange={() => setJenis("pil")}
                    />
                    <Pill className={`${jenis === "pil" ? "text-teal-600" : "text-slate-400"}`} size={18} />
                    <span className={`${jenis === "pil" ? "font-bold text-teal-800" : "text-slate-600"}`}>Pil KB Harian</span>
                  </label>

                  <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition ${jenis === "suntik1" ? "border-teal-500 bg-teal-50" : "border-slate-200 hover:bg-slate-50"}`}>
                    <input
                      type="radio"
                      name="jenis"
                      className="hidden"
                      checked={jenis === "suntik1"}
                      onChange={() => setJenis("suntik1")}
                    />
                    <Syringe className={`${jenis === "suntik1" ? "text-teal-600" : "text-slate-400"}`} size={18} />
                    <span className={`${jenis === "suntik1" ? "font-bold text-teal-800" : "text-slate-600"}`}>Suntik KB 1 Bulan</span>
                  </label>

                  <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition ${jenis === "suntik3" ? "border-teal-500 bg-teal-50" : "border-slate-200 hover:bg-slate-50"}`}>
                    <input
                      type="radio"
                      name="jenis"
                      className="hidden"
                      checked={jenis === "suntik3"}
                      onChange={() => setJenis("suntik3")}
                    />
                    <Syringe className={`${jenis === "suntik3" ? "text-teal-600" : "text-slate-400"}`} size={18} />
                    <span className={`${jenis === "suntik3" ? "font-bold text-teal-800" : "text-slate-600"}`}>Suntik KB 3 Bulan</span>
                  </label>

                  <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition ${jenis === "lainnya" ? "border-teal-500 bg-teal-50" : "border-slate-200 hover:bg-slate-50"}`}>
                    <input
                      type="radio"
                      name="jenis"
                      className="hidden"
                      checked={jenis === "lainnya"}
                      onChange={() => setJenis("lainnya")}
                    />
                    <Activity className={`${jenis === "lainnya" ? "text-teal-600" : "text-slate-400"}`} size={18} />
                    <span className={`${jenis === "lainnya" ? "font-bold text-teal-800" : "text-slate-600"}`}>Metode KB Lain (Implan/IUD)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tanggal Kunjungan / Suntik Terakhir
                </label>
                <input
                  type="date"
                  value={lastVisit}
                  onChange={(e) => setLastVisit(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
                  required
                />
                <p className="mt-1 text-xs text-slate-500">
                  Gunakan tanggal saat terakhir kali Anda kontrol atau suntik KB.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all flex justify-center items-center gap-2"
              >
                Simpan Pengingat di Browser
              </button>

              <div className="flex items-start gap-2 text-xs text-slate-500 bg-teal-50/70 border border-teal-100 rounded-xl p-3">
                <Info size={16} className="text-teal-600 mt-0.5 shrink-0" />
                <p>
                  Data disimpan aman di <strong>browser Anda sendiri</strong>{" "}
                  menggunakan <i>localStorage</i>. Jika berganti
                  HP / browser, Anda perlu mengatur ulang pengingat ini.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 md:p-6 space-y-4">
              <h2 className="text-lg font-bold text-teal-800 mb-1">
                Ringkasan Jadwal Kontrol
              </h2>

              {reminder ? (
                <div className="space-y-3 text-sm">
                  <div className="p-3 rounded-xl bg-white border border-teal-100 shadow-sm">
                    <p className="text-xs font-bold text-teal-700 uppercase mb-1">
                      Metode KB
                    </p>
                    <p className="font-semibold text-slate-800">
                      {reminder.metode}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-600 uppercase mb-1">
                      Kunjungan Terakhir
                    </p>
                    <p className="font-semibold text-slate-800">
                      {formatTanggalIndo(reminder.lastVisit)}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 shadow-sm">
                    <p className="text-xs font-bold text-amber-700 uppercase mb-1">
                      Jadwal Kontrol Berikutnya
                    </p>
                    <p className="text-lg font-bold text-amber-900 mb-2">
                      {formatTanggalIndo(reminder.nextVisit)}
                    </p>
                    {sisaHari !== null && (
                      <div className={`p-2 rounded-lg text-center font-bold text-sm ${sisaHari < 0 ? 'bg-red-100 text-red-700' : sisaHari === 0 ? 'bg-amber-200 text-amber-800' : 'bg-white text-amber-700 border border-amber-100'}`}>
                        {sisaHari < 0
                          ? "Jadwal ini sudah terlewat!"
                          : sisaHari === 0
                          ? "Jadwal kontrol Anda adalah HARI INI."
                          : `${sisaHari} hari lagi menuju kontrol berikutnya.`}
                      </div>
                    )}
                  </div>

                  <p className="mt-4 text-xs text-slate-500 leading-relaxed text-center">
                    Pengingat otomatis akan muncul di <strong>Beranda EduKB</strong> setiap kali Anda membuka website ini.
                  </p>
                </div>
              ) : (
                <div className="h-full min-h-50 flex items-center justify-center text-center text-sm text-slate-500 bg-white rounded-xl border border-slate-200">
                  <div className="px-4">
                    Belum ada jadwal tersimpan.<br/><br/>Isi formulir di sebelah kiri, lalu tekan tombol <span className="font-semibold text-teal-600">Simpan Pengingat</span>.
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}