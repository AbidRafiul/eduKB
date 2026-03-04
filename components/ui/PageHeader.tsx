    import Link from "next/link";
    import { ArrowLeft } from "lucide-react";
    import { ElementType } from "react";

    // Kita definisikan "pesanan" (props) apa saja yang bisa diterima oleh Header ini
    type PageHeaderProps = {
    title: string;
    description: string;
    Icon: ElementType; // Untuk menerima ikon dari lucide-react
    };

    export default function PageHeader({ title, description, Icon }: PageHeaderProps) {
    return (
        <div className="bg-teal-700 text-white pt-10 pb-24 px-4 relative">
        {/* Kandang Gaib Ikon Raksasa */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/4">
            <Icon size={300} />
            </div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 text-teal-100 hover:text-white mb-8 transition">
            <ArrowLeft size={20} /> Kembali ke Beranda
            </Link>
            <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
            </div>
            <p className="text-lg text-teal-100 max-w-2xl">{description}</p>
        </div>
        </div>
    );
    }