    "use client";
    import { useState, useEffect } from "react";
    import Link from "next/link";
    import { Bell } from "lucide-react";
    import { ReminderData } from "@/types";

    export default function BannerPengingat() {
    const [kbReminder, setKbReminder] = useState<ReminderData | null>(null);
    const [daysRemaining, setDaysRemaining] = useState<number | null>(null);

    useEffect(() => {
        try {
        if (typeof window === "undefined") return;
        const raw = localStorage.getItem("edukbKbReminder");
        if (!raw) return;

        const parsed: ReminderData = JSON.parse(raw);
        if (!parsed.nextVisit) return;

        const today = new Date();
        const next = new Date(parsed.nextVisit);
        const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const nextMid = new Date(next.getFullYear(), next.getMonth(), next.getDate());
        const diffMs = nextMid.getTime() - todayMid.getTime();
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays >= 0 && diffDays <= 120) {
            setKbReminder(parsed);
            setDaysRemaining(diffDays);
        }
        } catch {
        // Abaikan
        }
    }, []);

    if (!kbReminder || daysRemaining === null) return null;

    return (
        <div className="bg-amber-50/95 backdrop-blur-sm border-b border-amber-200/60 shadow-sm relative z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm md:text-base">
            <div className="flex items-start sm:items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-full shrink-0 text-amber-600">
                <Bell size={20} className="animate-pulse" />
            </div>
            <div>
                <p className="text-slate-700">
                Jadwal <strong className="text-amber-800">{kbReminder.metode}</strong> Anda selanjutnya adalah{" "}
                {daysRemaining === 0 ? (
                    <strong className="text-red-600 bg-red-50 px-2 py-0.5 rounded">HARI INI</strong>
                ) : (
                    <strong className="text-amber-800">{daysRemaining} hari lagi</strong>
                )}
                {" "}pada tanggal <strong className="text-slate-800">
                    {new Date(kbReminder.nextVisit).toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </strong>.
                </p>
            </div>
            </div>
            <Link href="/pengingat-kb" className="shrink-0 bg-white hover:bg-amber-100 text-amber-700 border border-amber-200 px-4 py-1.5 rounded-full font-semibold transition-all shadow-sm text-sm">
            Atur Ulang
            </Link>
        </div>
        </div>
    );
    }