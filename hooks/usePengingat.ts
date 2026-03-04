    import { useState, useEffect } from "react";
    import { JenisKB, ReminderData } from "@/types";

    const intervalHari: Record<JenisKB, number> = {
    pil: 30, suntik1: 30, suntik3: 90, lainnya: 180,
    };

    export function usePengingat() {
    const [jenis, setJenis] = useState<JenisKB>("suntik3");
    const [lastVisit, setLastVisit] = useState("");
    const [reminder, setReminder] = useState<ReminderData | null>(null);

    // Mengambil data dari localStorage saat halaman dimuat
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
        // Abaikan jika error
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
        jenis === "pil" ? "Pil KB Harian"
            : jenis === "suntik1" ? "Suntik KB 1 Bulan"
            : jenis === "suntik3" ? "Suntik KB 3 Bulan"
            : "Kontrol KB Lainnya";

        const data: ReminderData = {
        metode: metodeNama, jenis, lastVisit: baseDate.toISOString(), nextVisit: next.toISOString(),
        };

        if (typeof window !== "undefined") {
        localStorage.setItem("edukbKbReminder", JSON.stringify(data));
        }

        setReminder(data);
    };

    const hitungSisaHari = (nextVisit: string) => {
        const today = new Date();
        const next = new Date(nextVisit);
        const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const nextMid = new Date(next.getFullYear(), next.getMonth(), next.getDate());
        const diffMs = nextMid.getTime() - todayMid.getTime();
        return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    };

    const sisaHari = reminder ? hitungSisaHari(reminder.nextVisit) : null;

    return { jenis, setJenis, lastVisit, setLastVisit, reminder, sisaHari, hitungDanSimpan };
    }