    export type UserInput = {
    umur: string;
    inginHamil: string;
    menyusui: string;
    nifas: string;
    riwayat: string[];
    };

    export type HasilOvulasi = {
    fertileStart: Date;
    fertileEnd: Date;
    ovulationDate: Date;
    nextPeriod: Date;
    };

    export type JenisKB = "pil" | "suntik1" | "suntik3" | "lainnya";

    export type ReminderData = {
    metode: string;
    jenis: JenisKB;
    lastVisit: string; 
    nextVisit: string; 
    };