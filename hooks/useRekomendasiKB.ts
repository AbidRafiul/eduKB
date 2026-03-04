    import { useState } from "react";
    import { UserInput } from "@/types";
    import { dataMetodeKB } from "@/data/kbData";

    export function useRekomendasiKB() {
    const [inputData, setInputData] = useState<UserInput>({
        umur: "", inginHamil: "", menyusui: "", nifas: "", riwayat: []
    });
    const [isEvaluated, setIsEvaluated] = useState(false);

    const handleChange = (field: keyof UserInput, value: string) => {
        setInputData(prev => ({ ...prev, [field]: value }));
    };

    const toggleRiwayat = (id: string) => {
        setInputData(prev => {
        const isSelected = prev.riwayat.includes(id);
        return {
            ...prev,
            riwayat: isSelected ? prev.riwayat.filter(item => item !== id) : [...prev.riwayat, id]
        };
        });
    };

    const evaluateMEC = () => {
        return dataMetodeKB.map(metode => {
        let maxCat = 1;
        let reasons: string[] = [];

        const addRule = (cat: number, reason: string) => {
            if (cat > maxCat) maxCat = cat;
            reasons.push(reason);
        };

        if (metode.id === "coc") {
            if (inputData.menyusui === "kurang_6") addRule(4, "Estrogen mengurangi ASI bayi < 6 bulan.");
            if (inputData.menyusui === "lebih_6") addRule(2, "Gunakan non-estrogen selama menyusui.");
            if (inputData.nifas === "kurang_6_minggu" && inputData.menyusui === "tidak") addRule(3, "Risiko pembekuan darah tinggi di masa nifas.");
            if (inputData.umur === "lebih_35" && inputData.riwayat.includes("perokok")) addRule(4, "Usia > 35 & perokok dilarang pakai estrogen.");
            if (inputData.riwayat.includes("hipertensi") || inputData.riwayat.includes("stroke") || inputData.riwayat.includes("jantung")) addRule(4, "Estrogen memicu pengentalan darah.");
            if (inputData.riwayat.includes("migrain")) addRule(4, "Berisiko memicu stroke iskemik.");
            if (inputData.riwayat.includes("kanker_payudara")) addRule(4, "Kanker sensitif terhadap hormon.");
        }
        if (metode.id === "pop") {
            if (inputData.riwayat.includes("kanker_payudara")) addRule(4, "Progestin berisiko memicu sel kanker.");
            if (inputData.riwayat.includes("hipertensi") || inputData.riwayat.includes("jantung")) addRule(2, "Perlu evaluasi tekanan darah.");
        }
        if (metode.id === "iud") {
            if (inputData.riwayat.includes("radang_panggul") || inputData.riwayat.includes("IMS")) addRule(4, "Mendorong bakteri infeksi ke rahim.");
            if (inputData.nifas === "kurang_6_minggu") addRule(2, "Risiko IUD terlepas sedikit lebih tinggi.");
        }
        if (metode.id === "steril") {
            if (inputData.inginHamil === "ya" || inputData.inginHamil === "ragu") addRule(4, "Ini permanen. Dilarang jika ragu.");
            if (inputData.umur === "kurang_20") addRule(3, "Risiko penyesalan tinggi di usia muda.");
        }
        if (reasons.length === 0) reasons.push("Metode ini aman digunakan.");

        return { ...metode, category: maxCat, reasons };
        }).sort((a, b) => a.category - b.category);
    };

    const handleEvaluate = () => {
        if (!inputData.umur || !inputData.inginHamil || !inputData.menyusui || !inputData.nifas) {
        alert("Mohon lengkapi Data Dasar terlebih dahulu.");
        return;
        }
        setIsEvaluated(true);
    };

    const hasilEvaluasi = isEvaluated ? evaluateMEC() : [];

    return { inputData, isEvaluated, setIsEvaluated, handleChange, toggleRiwayat, handleEvaluate, hasilEvaluasi };
    }