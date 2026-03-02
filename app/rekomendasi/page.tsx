    "use client";

    import { useState } from "react";
    import Link from "next/link";
    import { ArrowLeft, Stethoscope, AlertTriangle, CheckCircle, Info, Activity, User, Baby, HeartPulse, Building2, Shield } from "lucide-react";

    // Tipe Data Input User
    type UserInput = {
    umur: string;
    inginHamil: string;
    menyusui: string;
    nifas: string;
    riwayat: string[];
    };

    // Daftar Penyakit / Riwayat Kesehatan
    const daftarRiwayat = [
    { id: "hipertensi", nama: "Tekanan Darah Tinggi (Hipertensi)" },
    { id: "diabetes", nama: "Diabetes Mellitus" },
    { id: "stroke", nama: "Riwayat Stroke / Pembekuan Darah" },
    { id: "jantung", nama: "Penyakit Jantung" },
    { id: "migrain", nama: "Migrain dengan Aura" },
    { id: "kanker_payudara", nama: "Kanker Payudara" },
    { id: "radang_panggul", nama: "Radang Panggul" },
    { id: "IMS", nama: "Infeksi Menular Seksual" },
    { id: "obesitas", nama: "Obesitas (Berat Badan Berlebih)" },
    { id: "perokok", nama: "Perokok (Pasif/Aktif)" },
    ];

    // Database KB
    const dataMetodeKB = [
    { id: "coc", nama: "Pil KB Kombinasi & Suntik 1 Bulan", tipe: "Hormonal (Estrogen + Progestin)" },
    { id: "pop", nama: "Pil Mini, Suntik 3 Bulan, Implan", tipe: "Hormonal (Hanya Progestin)" },
    { id: "iud", nama: "IUD Tembaga (Spiral)", tipe: "Non-Hormonal Dalam Rahim" },
    { id: "kondom", nama: "Kondom", tipe: "Penghalang (Barrier)" },
    { id: "steril", nama: "Sterilisasi (Tubektomi/Vasektomi)", tipe: "Permanen" }
    ];

    export default function RekomendasiPage() {
    // State untuk form input
    const [inputData, setInputData] = useState<UserInput>({
        umur: "",
        inginHamil: "",
        menyusui: "",
        nifas: "",
        riwayat: []
    });

    const [isEvaluated, setIsEvaluated] = useState(false);

    // Handler untuk input text/radio
    const handleChange = (field: keyof UserInput, value: string) => {
        setInputData(prev => ({ ...prev, [field]: value }));
    };

    // Handler untuk checkbox riwayat penyakit
    const toggleRiwayat = (id: string) => {
        setInputData(prev => {
        const isSelected = prev.riwayat.includes(id);
        return {
            ...prev,
            riwayat: isSelected 
            ? prev.riwayat.filter(item => item !== id) 
            : [...prev.riwayat, id]
        };
        });
    };

    // MESIN INFERENSI CDSS (Berdasarkan WHO MEC)
    const evaluateMEC = () => {
        return dataMetodeKB.map(metode => {
        let maxCat = 1;
        let reasons: string[] = [];

        const addRule = (cat: number, reason: string) => {
            if (cat > maxCat) maxCat = cat;
            reasons.push(reason);
        };

        // 1. EVALUASI METODE: PIL KOMBINASI (COC) & SUNTIK 1 BULAN
        if (metode.id === "coc") {
            if (inputData.menyusui === "kurang_6") addRule(4, "Estrogen dapat menghentikan atau mengurangi produksi ASI pada bayi di bawah 6 bulan.");
            if (inputData.menyusui === "lebih_6") addRule(2, "Sebaiknya gunakan metode non-estrogen selama menyusui, namun risiko sudah berkurang dibanding < 6 bulan.");
            if (inputData.nifas === "kurang_6_minggu" && inputData.menyusui === "tidak") addRule(3, "Risiko pembekuan darah vena tinggi pada masa nifas awal jika ditambah estrogen.");
            if (inputData.umur === "lebih_35" && inputData.riwayat.includes("perokok")) addRule(4, "Kombinasi usia > 35 tahun, merokok, dan estrogen sangat berisiko memicu serangan jantung/stroke fatal.");
            if (inputData.riwayat.includes("hipertensi") || inputData.riwayat.includes("stroke") || inputData.riwayat.includes("jantung")) addRule(4, "Estrogen menyempitkan pembuluh darah dan memicu pengentalan darah.");
            if (inputData.riwayat.includes("migrain")) addRule(4, "Sangat berisiko memicu stroke iskemik.");
            if (inputData.riwayat.includes("kanker_payudara")) addRule(4, "Sel kanker payudara sensitif terhadap hormon buatan.");
            if (inputData.riwayat.includes("diabetes")) addRule(3, "Berisiko memperburuk fungsi pembuluh darah kecil yang rentan akibat diabetes.");
            if (inputData.riwayat.includes("obesitas")) addRule(2, "Obesitas meningkatkan risiko pembekuan darah, estrogen dapat menambah risiko tersebut.");
        }

        // 2. EVALUASI METODE: PROGESTIN ONLY (Suntik 3 bln, Implan, Pil Mini)
        if (metode.id === "pop") {
            if (inputData.riwayat.includes("kanker_payudara")) addRule(4, "Hormon progestin tetap berisiko memicu pertumbuhan sel kanker.");
            if (inputData.riwayat.includes("hipertensi") || inputData.riwayat.includes("stroke") || inputData.riwayat.includes("jantung")) addRule(2, "Lebih aman dari kombinasi estrogen, namun tekanan darah harus dievaluasi berkala.");
            if (inputData.riwayat.includes("diabetes")) addRule(2, "Cukup aman, namun perlu pemantauan gula darah berkala.");
        }

        // 3. EVALUASI METODE: IUD TEMBAGA
        if (metode.id === "iud") {
            if (inputData.riwayat.includes("radang_panggul") || inputData.riwayat.includes("IMS")) addRule(4, "Pemasangan IUD saat ada infeksi pelvis/IMS aktif dapat mendorong bakteri ke rahim dan merusak kesuburan.");
            if (inputData.nifas === "kurang_6_minggu") addRule(2, "Rahim masih dalam proses pemulihan (involusi), risiko IUD terlepas/bergeser sedikit lebih tinggi.");
        }

        // 4. EVALUASI METODE: STERIL (MOW/MOP)
        if (metode.id === "steril") {
            if (inputData.inginHamil === "ya" || inputData.inginHamil === "ragu") addRule(4, "Metode ini bersifat permanen. Tidak boleh dilakukan jika masih memiliki keinginan atau ragu untuk punya anak lagi.");
            if (inputData.umur === "kurang_20") addRule(3, "Sangat tidak disarankan pada usia terlalu muda karena peluang penyesalan di masa depan sangat tinggi.");
        }

        // 5. EVALUASI METODE: KONDOM
        if (metode.id === "kondom") {
            // Kondom pada dasarnya Kategori 1 untuk hampir semua kondisi klinis
        }

        // Set alasan default jika tidak ada pantangan (Kategori 1)
        if (reasons.length === 0) {
            reasons.push("Tidak ada pantangan medis untuk kondisi Anda. Metode ini aman digunakan.");
        }

        return { ...metode, category: maxCat, reasons };
        }).sort((a, b) => a.category - b.category);
    };

    const handleEvaluate = () => {
        // Validasi input dasar
        if (!inputData.umur || !inputData.inginHamil || !inputData.menyusui || !inputData.nifas) {
        alert("Mohon lengkapi Data Dasar dan Status Reproduksi Anda terlebih dahulu.");
        return;
        }
        setIsEvaluated(true);
    };

    const hasilEvaluasi = isEvaluated ? evaluateMEC() : [];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 font-sans">
        <div className="bg-teal-700 text-white pt-10 pb-20 px-4">
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/4">
            <Baby size={300} />
            </div>
            <div className="max-w-5xl mx-auto">
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

        <div className="max-w-5xl mx-auto px-4 -mt-10">
            {!isEvaluated ? (
            <div className="space-y-6">
                {/* Form Input Data Dasar */}
                <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b pb-3">
                    <User className="text-teal-600" /> Data Dasar & Reproduksi
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Umur */}
                    <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Rentang Usia</label>
                    <div className="flex gap-3">
                        {["kurang_20", "20_35", "lebih_35"].map(val => (
                        <label key={val} className={`flex-1 text-center p-3 rounded-lg border cursor-pointer transition ${inputData.umur === val ? 'bg-teal-50 border-teal-500 text-teal-700 font-bold' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                            <input type="radio" name="umur" className="hidden" onChange={() => handleChange("umur", val)} />
                            {val === "kurang_20" ? "< 20 Thn" : val === "20_35" ? "20-35 Thn" : "> 35 Thn"}
                        </label>
                        ))}
                    </div>
                    </div>

                    {/* Ingin Hamil */}
                    <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Ingin Hamil Lagi di Masa Depan?</label>
                    <div className="flex gap-3">
                        {["ya", "tidak", "ragu"].map(val => (
                        <label key={val} className={`flex-1 text-center p-3 rounded-lg border cursor-pointer transition ${inputData.inginHamil === val ? 'bg-teal-50 border-teal-500 text-teal-700 font-bold' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                            <input type="radio" name="inginHamil" className="hidden" onChange={() => handleChange("inginHamil", val)} />
                            {val.charAt(0).toUpperCase() + val.slice(1)}
                        </label>
                        ))}
                    </div>
                    </div>

                    {/* Menyusui */}
                    <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Status Menyusui (Eksklusif)</label>
                    <div className="flex gap-3">
                        {["tidak", "kurang_6", "lebih_6"].map(val => (
                        <label key={val} className={`flex-1 text-center p-3 rounded-lg border cursor-pointer transition ${inputData.menyusui === val ? 'bg-teal-50 border-teal-500 text-teal-700 font-bold' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                            <input type="radio" name="menyusui" className="hidden" onChange={() => handleChange("menyusui", val)} />
                            {val === "tidak" ? "Tidak" : val === "kurang_6" ? "< 6 Bulan" : "> 6 Bulan"}
                        </label>
                        ))}
                    </div>
                    </div>

                    {/* Masa Nifas */}
                    <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Pasca Persalinan (Nifas)</label>
                    <div className="flex gap-3">
                        {["tidak", "kurang_6_minggu", "lebih_6_minggu"].map(val => (
                        <label key={val} className={`flex-1 text-center p-3 rounded-lg border cursor-pointer transition ${inputData.nifas === val ? 'bg-teal-50 border-teal-500 text-teal-700 font-bold' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                            <input type="radio" name="nifas" className="hidden" onChange={() => handleChange("nifas", val)} />
                            {val === "tidak" ? "Tidak / Belum" : val === "kurang_6_minggu" ? "< 6 Minggu" : "> 6 Minggu"}
                        </label>
                        ))}
                    </div>
                    </div>
                </div>
                </div>

                {/* Riwayat Penyakit */}
                <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 border-b pb-3">
                    <HeartPulse className="text-teal-600" /> Riwayat Kesehatan Klinis
                </h2>
                <p className="text-sm text-slate-500 mb-4">Centang semua kondisi medis yang sedang atau pernah Anda derita.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {daftarRiwayat.map(penyakit => (
                    <label 
                        key={penyakit.id} 
                        className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${inputData.riwayat.includes(penyakit.id) ? 'bg-teal-50 border-teal-500 shadow-sm' : 'bg-white border-slate-200 hover:border-teal-300'}`}
                    >
                        <input 
                        type="checkbox" 
                        className="mt-1 w-5 h-5 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
                        checked={inputData.riwayat.includes(penyakit.id)}
                        onChange={() => toggleRiwayat(penyakit.id)}
                        />
                        <span className={`text-sm font-medium leading-snug ${inputData.riwayat.includes(penyakit.id) ? 'text-teal-800' : 'text-slate-600'}`}>
                        {penyakit.nama}
                        </span>
                    </label>
                    ))}
                </div>
                </div>

                <button 
                onClick={handleEvaluate}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all text-lg flex justify-center items-center gap-2"
                >
                <Activity /> Analisis Metode KB Sekarang
                </button>
            </div>
            ) : (
            <div className="space-y-6">
                
                {/* INI ADALAH BAGIAN YANG SUDAH DIPERBAIKI (KOTAK PUTIH PENUTUP HEADER) */}
                <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-teal-800">Klasifikasi Kriteria WHO MEC</h2>
                <button 
                    onClick={() => setIsEvaluated(false)} 
                    className="text-teal-700 bg-teal-50 font-semibold hover:bg-teal-100 border border-teal-200 px-6 py-2.5 rounded-xl transition-all shadow-sm"
                >
                    Input Ulang Data
                </button>
                </div>
                
                {hasilEvaluasi.map((hasil) => {
                let styleConfig;
                
                if (hasil.category === 1) {
                    styleConfig = { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-800", badge: "Aman Digunakan", badgeBg: "bg-emerald-100", icon: <CheckCircle className="text-emerald-500" size={24} /> };
                } else if (hasil.category === 2) {
                    styleConfig = { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", badge: "Manfaat > Risiko", badgeBg: "bg-blue-100", icon: <Info className="text-blue-500" size={24} /> };
                } else if (hasil.category === 3) {
                    styleConfig = { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-800", badge: "Risiko > Manfaat", badgeBg: "bg-orange-100", icon: <AlertTriangle className="text-orange-500" size={24} /> };
                } else {
                    styleConfig = { bg: "bg-red-50", border: "border-red-200", text: "text-red-800", badge: "Tidak Boleh Digunakan", badgeBg: "bg-red-100", icon: <AlertTriangle className="text-red-600" size={24} /> };
                }

                return (
                    <div key={hasil.id} className={`${styleConfig.bg} border ${styleConfig.border} rounded-2xl p-6 shadow-sm transition-all hover:shadow-md`}>
                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                        <div>
                        <span className="inline-block px-3 py-1 bg-white/80 rounded-full text-xs font-bold text-slate-600 mb-2 border border-slate-200">
                            {hasil.tipe}
                        </span>
                        <h3 className={`text-xl font-bold ${styleConfig.text}`}>{hasil.nama}</h3>
                        </div>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${styleConfig.badgeBg} border ${styleConfig.border} font-bold text-sm ${styleConfig.text} whitespace-nowrap`}>
                        {styleConfig.icon} <span>Kategori {hasil.category}: {styleConfig.badge}</span>
                        </div>
                    </div>
                    
                    <div className="bg-white/70 p-4 rounded-xl border border-white/50">
                        <p className="text-sm font-bold text-slate-700 mb-2">Penjelasan Klinis:</p>
                        <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm">
                        {hasil.reasons.map((reason, i) => (
                            <li key={i}>{reason}</li>
                        ))}
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