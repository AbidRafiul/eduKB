    "use client";
    import { useState } from "react";
    import { MapPin } from "lucide-react";

    export default function Footer() {
    const [isLocating, setIsLocating] = useState(false);

    const handleFindMidwife = () => {
        if (typeof window === "undefined") return;
        if (!("geolocation" in navigator)) {
        alert("Browser Anda belum mendukung fitur lokasi otomatis.");
        return;
        }
        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            const query = encodeURIComponent("Bidan Praktek Mandiri Terdekat");
            window.open(`https://www.google.com/maps/search/${query}/@${latitude},${longitude},15z`, "_blank");
            setIsLocating(false);
        },
        () => {
            alert("Gagal mengakses lokasi. Pastikan izin lokasi diaktifkan.");
            setIsLocating(false);
        }
        );
    };

    return (
        <footer className="bg-slate-900 text-slate-400 py-8 mt-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left text-sm leading-relaxed">
            <p className="font-semibold text-slate-300">© 2026 EduKB - Platform Edukasi Keluarga Berencana</p>
            <p className="text-slate-500 mt-1">
                Luaran Mata Kuliah Teknologi Tepat Guna Kebidanan <br className="md:hidden" />
                <span className="hidden md:inline"> | </span> Poltekkes Kemenkes Surabaya
            </p>
            </div>
            <button
            onClick={handleFindMidwife}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold shadow-lg transition-all disabled:opacity-70"
            disabled={isLocating}
            >
            <MapPin size={18} />
            {isLocating ? "Mencari lokasi bidan terdekat..." : "Cari Bidan Terdekat"}
            </button>
        </div>
        </footer>
    );
    }