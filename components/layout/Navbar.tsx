    "use client";
    import { useState } from "react";
    import Link from "next/link";
    import { Menu, X, ChevronDown, Activity } from "lucide-react";

    export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-teal-700 hover:text-teal-600 transition">
            <Activity className="text-teal-500" /> Edu<span className="text-teal-500">KB</span>
            </Link>
            
            <ul className="hidden md:flex items-center gap-8 font-medium text-slate-700">
            <li><Link href="/belajar" className="hover:text-teal-600 transition">Fase KB</Link></li>
            <li className="relative group">
                <button className="flex items-center gap-1 hover:text-teal-600 transition py-2">
                Materi Edukasi <ChevronDown size={18} className="group-hover:rotate-180 transition-transform duration-300 text-slate-500" />
                </button>
                <div className="absolute left-0 hidden w-64 pt-3 bg-white rounded-xl shadow-xl group-hover:block z-50 border border-slate-100">
                <ul className="py-2 text-sm text-slate-700 flex flex-col">
                    <li><Link href="/reproduksi" className="block px-5 py-3 hover:bg-teal-50 hover:text-teal-700 transition">Kesehatan Reproduksi & Masa Subur</Link></li>
                    <li><Link href="/peran-pasangan" className="block px-5 py-3 hover:bg-teal-50 hover:text-teal-700 transition">Peran Suami dalam KB</Link></li>
                </ul>
                </div>
            </li>
            <li><Link href="/rekomendasi" className="hover:text-teal-500 transition">Kalkulator KB</Link></li>
            <li><Link href="/ovulasi" className="hover:text-teal-600 transition">Kalkulator Masa Subur</Link></li>
            <li><Link href="/pengingat-kb" className="hover:text-teal-600 transition">Pengingat Kontrol KB</Link></li>
            <li><Link href="/tentang" className="hover:text-teal-600 transition">Tentang Kami</Link></li>
            </ul>

            <button className="md:hidden text-teal-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>

        {isMenuOpen && (
            <ul className="md:hidden bg-white px-4 py-6 flex flex-col gap-5 text-center shadow-lg border-t text-slate-700 font-medium z-50 absolute w-full left-0">
            <li><Link href="/belajar" onClick={() => setIsMenuOpen(false)}>Fase KB</Link></li>
            <li><Link href="/rekomendasi" onClick={() => setIsMenuOpen(false)}>Kalkulator KB Cerdas</Link></li>
            <li><Link href="/ovulasi" onClick={() => setIsMenuOpen(false)}>Kalkulator Masa Subur</Link></li>
            <li><Link href="/pengingat-kb" onClick={() => setIsMenuOpen(false)}>Pengingat Kontrol KB</Link></li>
            <li><Link href="/tentang" onClick={() => setIsMenuOpen(false)}>Tentang Kami</Link></li>
            <li className="border-t border-slate-100 pt-4 mt-2">
                <span className="block text-teal-800 font-bold mb-4">Materi Edukasi</span>
                <ul className="flex flex-col gap-4 text-sm font-normal">
                <li><Link href="/reproduksi" onClick={() => setIsMenuOpen(false)}>Kesehatan Reproduksi & Masa Subur</Link></li>
                <li><Link href="/peran-pasangan" onClick={() => setIsMenuOpen(false)}>Peran Suami dalam KB</Link></li>
                </ul>
            </li>
            </ul>
        )}
        </nav>
    );
    }   