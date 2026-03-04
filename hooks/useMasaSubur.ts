    import { useState } from "react";
    import { HasilOvulasi } from "@/types";

    export function useMasaSubur() {
    const [hpht, setHpht] = useState("");
    const [siklus, setSiklus] = useState("28");
    const [hasil, setHasil] = useState<HasilOvulasi | null>(null);

    const hitungMasaSubur = (e: React.FormEvent) => {
        e.preventDefault();
        if (!hpht || !siklus) return;

        const panjangSiklus = Math.max(21, Math.min(35, Number(siklus) || 28));
        const hphtDate = new Date(hpht);

        // Asumsi ovulasi = 14 hari sebelum haid berikutnya
        const ovulationOffset = panjangSiklus - 14;
        const ovulationDate = new Date(hphtDate);
        ovulationDate.setDate(hphtDate.getDate() + ovulationOffset - 1);

        const fertileStart = new Date(ovulationDate);
        fertileStart.setDate(ovulationDate.getDate() - 5);

        const fertileEnd = new Date(ovulationDate);
        fertileEnd.setDate(ovulationDate.getDate() + 1);

        const nextPeriod = new Date(hphtDate);
        nextPeriod.setDate(hphtDate.getDate() + panjangSiklus);

        setHasil({ fertileStart, fertileEnd, ovulationDate, nextPeriod });
    };

    return { hpht, setHpht, siklus, setSiklus, hasil, hitungMasaSubur };
    }