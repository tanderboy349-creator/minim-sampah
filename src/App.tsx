import React, { useState, useEffect } from "react";
import { 
  Leaf, 
  Trash2, 
  Sparkles, 
  Droplet, 
  ChevronDown, 
  Heart, 
  MapPin, 
  CheckCircle, 
  Calculator, 
  Share2, 
  Award, 
  Info,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
  ShieldCheck,
  Send,
  Check,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Pre-populated realistic zero waste pledges from Indonesian cities
interface Pledge {
  id: string;
  name: string;
  city: string;
  pledgeText: string;
  timestamp: string;
  isCustom?: boolean;
}

const initialPledges: Pledge[] = [
  {
    id: "1",
    name: "Siti Rahma",
    city: "Jakarta Selatan",
    pledgeText: "Saya SIAP mengurangi sampah plastik sekali pakai dengan selalu membawa tas belanja kain dan tumbler sendiri ke mana pun! 🎒🥤",
    timestamp: "Baru saja",
  },
  {
    id: "2",
    name: "Budi Santoso",
    city: "Surabaya",
    pledgeText: "SIAP mengompos sampah dapur organik dari rumah mulai minggu ini! 🌱",
    timestamp: "2 menit yang lalu",
  },
  {
    id: "3",
    name: "Luh Gede Astuti",
    city: "Denpasar, Bali",
    pledgeText: "SIAP menolak sedotan plastik saat jajan di warung dan pantai! 🏝️🍹",
    timestamp: "5 menit yang lalu",
  },
  {
    id: "4",
    name: "Rian Hidayat",
    city: "Bandung",
    pledgeText: "SIAP memilah sampah botol PET dan menyalurkannya ke bank sampah terdekat! ♻️",
    timestamp: "12 menit yang lalu",
  }
];

export default function App() {
  // Beach Slider state
  const [sliderPos, setSliderPos] = useState<number>(50);
  
  // Interactive comments / pledge stream state
  const [pledges, setPledges] = useState<Pledge[]>(initialPledges);
  const [inputName, setInputName] = useState<string>("");
  const [inputCity, setInputCity] = useState<string>("");
  const [inputPledge, setInputPledge] = useState<string>("");
  const [pledgeError, setPledgeError] = useState<string>("");
  const [pledgeSuccess, setPledgeSuccess] = useState<boolean>(false);

  // Calculator states
  const [plasticBags, setPlasticBags] = useState<number>(10);
  const [plasticBottles, setPlasticBottles] = useState<number>(8);
  const [plasticStraws, setPlasticStraws] = useState<number>(12);

  // Form states for Certificate signup
  const [signupName, setSignupName] = useState<string>("");
  const [signupEmail, setSignupEmail] = useState<string>("");
  const [signupCity, setSignupCity] = useState<string>("");
  const [signupLevel, setSignupLevel] = useState<string>("Pemula Hijau");
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [certificateData, setCertificateData] = useState<any>(null);

  // Active FAQ index
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Calculate annual waste and CO2 savings
  const annualBags = plasticBags * 52;
  const annualBottles = plasticBottles * 52;
  const annualStraws = plasticStraws * 52;
  const totalItemsSaved = annualBags + annualBottles + annualStraws;
  
  // 1 bag = 33g CO2, 1 bottle = 80g CO2, 1 straw = 5g CO2 (Approximate)
  const co2SavedKg = Math.round(((annualBags * 33) + (annualBottles * 80) + (annualStraws * 5)) / 1000);
  
  // Equiv to planting X trees (1 tree absorbs ~22kg CO2 per year)
  const treesEquivalent = (co2SavedKg / 22).toFixed(1);

  // Handle "Tulis SIAP" Comment Submission
  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim() || !inputCity.trim() || !inputPledge.trim()) {
      setPledgeError("Semua kolom harus diisi ya, Kak!");
      return;
    }

    // Must contain "SIAP"
    if (!inputPledge.toUpperCase().includes("SIAP")) {
      setPledgeError("Silakan tulis kata 'SIAP' di dalam pesan komitmenmu untuk bergabung resmi! 💪");
      return;
    }

    const newPledge: Pledge = {
      id: Date.now().toString(),
      name: inputName.trim(),
      city: inputCity.trim(),
      pledgeText: inputPledge.trim(),
      timestamp: "Baru saja",
      isCustom: true
    };

    setPledges([newPledge, ...pledges]);
    setInputName("");
    setInputCity("");
    setInputPledge("");
    setPledgeError("");
    setPledgeSuccess(true);
    setTimeout(() => setPledgeSuccess(false), 4000);
  };

  // Pre-fill pledge input helper
  const fillReadyPledge = () => {
    setInputPledge("Saya SIAP berkontribusi mewujudkan Indonesia minim sampah! Mulai hari ini saya berkomitmen menghindari plastik sekali pakai.");
  };

  // Handle CTA Form Signup -> Generate Certificate
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim() || !signupEmail.trim() || !signupCity.trim()) {
      alert("Harap lengkapi semua kolom pendaftaran.");
      return;
    }

    const levelBadges: Record<string, string> = {
      "Pemula Hijau": "Pejuang Ramah Lingkungan Level 1",
      "Pejuang Lingkungan": "Pendekar Minim Sampah Level 2",
      "Pahlawan Bumi": "Hero Zero Waste Indonesia Level 3"
    };

    setCertificateData({
      name: signupName.trim(),
      city: signupCity.trim(),
      email: signupEmail.trim(),
      badge: levelBadges[signupLevel] || "Ksatria Hijau",
      date: new Date().toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }),
      certNumber: "ZW-ID-" + Math.floor(100000 + Math.random() * 900000)
    });
    setIsCertificateOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 selection:bg-emerald-200 selection:text-emerald-900 overflow-x-hidden">
      
      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-100 rounded-2xl shadow-[inset_0_-3px_5px_rgba(0,0,0,0.15),0_4px_6px_rgba(34,197,94,0.15)] flex items-center justify-center border border-emerald-200">
              <Leaf className="w-6 h-6 text-emerald-600 animate-pulse" />
            </div>
            <div>
              <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                ZeroWaste.ID
              </span>
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Gerakan Minim Sampah</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8 font-sans text-sm font-medium">
            <a href="#fakta" className="text-slate-600 hover:text-emerald-600 transition-colors">Fakta Sampah</a>
            <a href="#solusi" className="text-slate-600 hover:text-emerald-600 transition-colors">Solusi Praktis</a>
            <a href="#kalkulator" className="text-slate-600 hover:text-emerald-600 transition-colors">Kalkulator Dampak</a>
            <a href="#komitmen" className="text-slate-600 hover:text-emerald-600 transition-colors">Gabung Gerakan</a>
          </div>

          <div className="flex items-center space-x-3">
            <span className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
              🌿 #HidupMinimSampah
            </span>
            <a 
              href="#komitmen" 
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-full shadow-[0_4px_12px_rgba(34,197,94,0.3),inset_0_-2px_0_rgba(0,0,0,0.1)] hover:translate-y-[-1px] transition-all duration-200"
            >
              Ikut Pledge
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-8 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* HERO TEXT */}
            <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full tracking-wide uppercase border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> TREN BARU INDONESIA SEHAT
              </span>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-900 leading-tight">
                Mengapa Hidup Minim Sampah Menjadi{" "}
                <span className="relative inline-block text-emerald-600">
                  Tren Penting
                  <span className="absolute bottom-1 left-0 w-full h-2.5 bg-emerald-200 -z-10 rounded-full"></span>
                </span>{" "}
                di Indonesia Saat Ini?
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Bergabunglah dengan gerakan <strong className="text-emerald-700">Zero Waste Indonesia</strong> dan mulai langkah kecil untuk bumi yang lebih bersih. Ubah kebiasaan belanja, pilah dari rumah, dan selamatkan laut kita dari krisis plastik.
              </p>

              {/* ACTION BUTTON WITH COMMENTS QUICK LAUNCH */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a 
                  href="#tulis-siap"
                  className="w-full sm:w-auto text-center px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-[0_10px_20px_rgba(34,197,94,0.3),inset_0_-4px_0_rgba(0,0,0,0.15)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Mulai Sekarang - Tulis 'SIAP' 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#fakta"
                  className="w-full sm:w-auto text-center px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-2xl border-2 border-slate-200 shadow-sm transition-all duration-200"
                >
                  Pelajari Fakta
                </a>
              </div>

              {/* STATS BADGES */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 max-w-md mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <p className="font-display font-black text-2xl text-emerald-600">12K+</p>
                  <p className="text-xs text-slate-500 font-medium">Eco Warriors</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="font-display font-black text-2xl text-sky-500">1.2M+</p>
                  <p className="text-xs text-slate-500 font-medium">Plastik Dihindari</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="font-display font-black text-2xl text-emerald-700">34+</p>
                  <p className="text-xs text-slate-500 font-medium">Kota Berpartisipasi</p>
                </div>
              </div>
            </div>

            {/* SPLIT SCREEN COMPARISON IMAGE SLIDER */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full max-w-xl bg-white p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
                
                {/* Visual Title Header */}
                <div className="flex justify-between items-center mb-3 px-2">
                  <span className="text-xs font-bold text-red-500 flex items-center gap-1">
                    <Trash2 className="w-3.5 h-3.5" /> JIKA KITA ABAI
                  </span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <Leaf className="w-3.5 h-3.5" /> DAMPAK JIKA MINIM SAMPAH
                  </span>
                </div>

                {/* THE INTERACTIVE SLIDER STAGE */}
                <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-inner select-none">
                  
                  {/* DIRTY BEACH / GROUND LAYER (Right Side base) */}
                  <div className="absolute inset-0">
                    <img 
                      src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=1200&q=80" 
                      alt="Pantai Tercemar Sampah Plastik Indonesia"
                      className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.1]"
                      referrerPolicy="no-referrer"
                    />
                    {/* Dark/Red gloom warning badge */}
                    <div className="absolute bottom-4 left-4 bg-rose-600/90 backdrop-blur-md text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-md">
                      🚨 Terancam Sampah Plastik
                    </div>
                  </div>

                  {/* CLEAN BEACH / TOP LAYER (Controlled width) */}
                  <div 
                    className="absolute inset-0 border-r-4 border-white transition-all duration-75"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <div className="absolute inset-0 w-[576px] h-full">
                      <img 
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" 
                        alt="Pantai Bersih Asri Indonesia"
                        className="w-full h-full object-cover filter brightness-105"
                        style={{ width: "576px", maxWidth: "none" }}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Bright green eco success badge */}
                    <div className="absolute bottom-4 right-4 bg-emerald-500/90 backdrop-blur-md text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-md whitespace-nowrap">
                      🌴 Masa Depan Indonesia Bersih
                    </div>
                  </div>

                  {/* Drag Handle Overlay */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="w-10 h-10 bg-white hover:bg-emerald-50 rounded-full border-4 border-emerald-500 flex items-center justify-center shadow-lg -translate-x-1/2 transition-transform hover:scale-110">
                      <div className="flex space-x-0.5 text-emerald-600 font-extrabold text-[10px]">
                        <span>◀</span><span>▶</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Range input controller */}
                <div className="mt-4 px-2">
                  <label className="block text-xs font-bold text-slate-500 text-center mb-1">
                    Geser slider untuk melihat perbandingan pantai Indonesia:
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={sliderPos}
                    onChange={(e) => setSliderPos(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-1">
                    <span>100% Tercemar 😢</span>
                    <span className="text-emerald-600 font-bold">Ubah Masa Depan kita ✨</span>
                    <span>100% Bebas Sampah 😍</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section id="fakta" className="py-20 bg-slate-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-3.5 py-1.5 bg-sky-100 text-sky-800 text-xs font-bold rounded-full tracking-wide uppercase border border-sky-200">
              🚨 DARURAT SAMPAH PLASTIK
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
              Fakta yang Harus Kita Ketahui Bersama
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
              Indonesia sedang mengalami krisis polusi sampah plastik yang sangat mengkhawatirkan. Berikut adalah angka-angka nyata yang mengancam ekosistem kita jika kita terus abai.
            </p>
          </div>

          {/* CLAYMORPHIC FACTS CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* CARD 1 */}
            <div className="bg-white rounded-3xl p-6 border-b-[6px] border-slate-300 hover:border-sky-400 hover:-translate-y-1.5 transition-all duration-300 shadow-[inset_0_-4px_8px_rgba(0,0,0,0.03),_0_12px_24px_-8px_rgba(0,0,0,0.1)] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center font-bold text-xl shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1),0_4px_8px_rgba(14,165,233,0.15)] border border-sky-200">
                  🦖
                </div>
                <h3 className="text-slate-400 uppercase tracking-widest text-xs font-extrabold">Volume Sampah Harian</h3>
                <p className="font-display font-black text-3xl text-slate-900 tracking-tight">85,000 Ton</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Dihasilkan setiap harinya secara nasional di Indonesia. Setara berat <strong className="text-slate-800">14.000 Gajah Sumatra dewasa</strong> yang menumpuk di daratan.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <Info className="w-3.5 h-3.5 text-sky-500" /> Sumber: KLHK RI
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-white rounded-3xl p-6 border-b-[6px] border-slate-300 hover:border-red-400 hover:-translate-y-1.5 transition-all duration-300 shadow-[inset_0_-4px_8px_rgba(0,0,0,0.03),_0_12px_24px_-8px_rgba(0,0,0,0.1)] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center font-bold text-xl shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1),0_4px_8px_rgba(239,68,68,0.15)] border border-red-200">
                  🥈
                </div>
                <h3 className="text-slate-400 uppercase tracking-widest text-xs font-extrabold">Polutan Laut Dunia</h3>
                <p className="font-display font-black text-3xl text-red-600 tracking-tight">Peringkat #2</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Indonesia merupakan salah satu <strong className="text-slate-800">negara penyumbang sampah plastik laut terbesar di dunia</strong>. Keindahan wisata maritim kita kini terancam punah.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <Info className="w-3.5 h-3.5 text-red-400" /> Jurnal Science
              </div>
            </div>

            {/* CARD 3 */}
            <div className="bg-white rounded-3xl p-6 border-b-[6px] border-slate-300 hover:border-amber-400 hover:-translate-y-1.5 transition-all duration-300 shadow-[inset_0_-4px_8px_rgba(0,0,0,0.03),_0_12px_24px_-8px_rgba(0,0,0,0.1)] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center font-bold text-xl shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1),0_4px_8px_rgba(245,158,11,0.15)] border border-amber-200">
                  🛍️
                </div>
                <h3 className="text-slate-400 uppercase tracking-widest text-xs font-extrabold">Konsumsi Harian</h3>
                <p className="font-display font-black text-3xl text-slate-900 tracking-tight">10 Juta</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Kantong plastik sekali pakai dikonsumsi warga Indonesia setiap hari. Rata-rata hanya <strong className="text-slate-800">dipakai 12 menit</strong> sebelum akhirnya berakhir di pembuangan sampah.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <Info className="w-3.5 h-3.5 text-amber-500" /> Greeneration Foundation
              </div>
            </div>

            {/* CARD 4 */}
            <div className="bg-white rounded-3xl p-6 border-b-[6px] border-slate-300 hover:border-emerald-400 hover:-translate-y-1.5 transition-all duration-300 shadow-[inset_0_-4px_8px_rgba(0,0,0,0.03),_0_12px_24px_-8px_rgba(0,0,0,0.1)] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center font-bold text-xl shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1),0_4px_8px_rgba(16,185,129,0.15)] border border-emerald-200">
                  ♻️
                </div>
                <h3 className="text-slate-400 uppercase tracking-widest text-xs font-extrabold">Rasio Daur Ulang</h3>
                <p className="font-display font-black text-3xl text-emerald-600 tracking-tight">Hanya 10%</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Dari total sampah plastik yang berhasil didaur ulang secara resmi. Sisanya <strong className="text-slate-800">90% mencemari tanah subur</strong> dan meracuni biota laut kita.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <Info className="w-3.5 h-3.5 text-emerald-500" /> Riset Sustainable Waste ID
              </div>
            </div>

          </div>

          {/* Interactive highlight banner */}
          <div className="mt-12 bg-emerald-50 border-2 border-emerald-100 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="font-display font-bold text-lg text-emerald-900">
                Apakah Kita Akan Membiarkan Alam Indonesia Rusak?
              </h4>
              <p className="text-emerald-700 text-sm max-w-2xl">
                Bila tidak ada aksi nyata, diperkirakan pada tahun 2050 akan ada lebih banyak plastik daripada ikan di samudra kita. Gaya hidup minim sampah bukan lagi sekadar pilihan, melainkan sebuah tanggung jawab bersama.
              </p>
            </div>
            <a 
              href="#solusi" 
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl transition-all shadow-[0_4px_12px_rgba(16,185,129,0.2)] whitespace-nowrap cursor-pointer"
            >
              Lihat Solusinya ⬇
            </a>
          </div>

        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section id="solusi" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-3.5 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full tracking-wide uppercase border border-emerald-200">
              🌱 SOLUSI PILIHAN BERSAMA
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
              Hidup Minim Sampah adalah Solusinya
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
              Gaya hidup Zero Waste mengajarkan kita untuk mengevaluasi konsumsi demi kelestarian bumi. Berikut adalah 3 pilar aksi minim sampah sederhana yang bisa dimulai sekarang!
            </p>
          </div>

          {/* PILAR GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* PILAR 1: REDUCE */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-inner mb-6">
                🎒
              </div>
              <h3 className="font-display font-extrabold text-xl text-slate-900 mb-3">1. Kurangi (Reduce)</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Menghindari timbulan sampah sejak dari awal. Katakan tidak pada kantong plastik, ganti dengan totebag kain, bawa botol minum isi ulang (tumbler), dan wadah makanan mandiri saat bepergian.
              </p>
              <ul className="space-y-3.5 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                  Bawa tas belanja kain lipat di dalam tas harian.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                  Tolak sedotan plastik, bawa sedotan stainless/bambu.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                  Pilih membeli produk dengan ukuran kemasan curah/besar.
                </li>
              </ul>
            </div>

            {/* PILAR 2: REUSE */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-inner mb-6">
                🔄
              </div>
              <h3 className="font-display font-extrabold text-xl text-slate-900 mb-3">2. Gunakan Kembali (Reuse)</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Memaksimalkan masa pakai suatu barang sebelum membuangnya. Ubah wadah bekas selai menjadi toples bumbu dapur, gunakan botol kaca sabun isi ulang, dan donasikan pakaian lama layak pakai.
              </p>
              <ul className="space-y-3.5 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-sky-500 font-bold mt-0.5">✓</span>
                  Gunakan kembali jar kaca bekas makanan untuk wadah.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-sky-500 font-bold mt-0.5">✓</span>
                  Beli produk perawatan diri di toko curah (refill store).
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-sky-500 font-bold mt-0.5">✓</span>
                  Gunakan kertas sisa cetak dua sisi untuk catatan oret-oretan.
                </li>
              </ul>
            </div>

            {/* PILAR 3: ROT & RECYCLE */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-inner mb-6">
                🍂
              </div>
              <h3 className="font-display font-extrabold text-xl text-slate-900 mb-3">3. Kelola & Kompos (Rot)</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Sampah organik seperti sisa sayur dan kulit buah mendominasi 60% sampah rumah tangga Indonesia. Mengompos sampah organik di rumah dapat mencegah pelepasan gas metana yang merusak atmosfer.
              </p>
              <ul className="space-y-3.5 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-500 font-bold mt-0.5">✓</span>
                  Pisahkan wadah sampah organik vs anorganik sejak di dapur.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-500 font-bold mt-0.5">✓</span>
                  Buat kompos sederhana menggunakan metode Takakura atau biopori.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-500 font-bold mt-0.5">✓</span>
                  Kirim sampah plastik bernilai tinggi ke Bank Sampah terdekat.
                </li>
              </ul>
            </div>

          </div>

          {/* VISUAL LAYOUT OF SOLUTION BENEFITS */}
          <div className="mt-16 bg-gradient-to-br from-emerald-50 to-sky-50 rounded-3xl p-8 lg:p-12 border border-emerald-100/50 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Graphic Mock of solution lifestyle (Using gorgeous real photos + badges) */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80" 
                  alt="Aksi memelihara pohon dan tanaman ramah lingkungan"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-750"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <span className="bg-emerald-500 text-white text-[11px] font-bold px-3 py-1 rounded-full w-max mb-2">
                    #ZeroWasteLifestyle
                  </span>
                  <h4 className="text-white font-display font-extrabold text-xl leading-snug">
                    Aksi Nyata Menyelamatkan Keanekaragaman Hayati Indonesia
                  </h4>
                  <p className="text-emerald-100 text-xs mt-1">
                    Gaya hidup minim sampah berdampak instan dalam mewariskan laut, sungai, dan tanah subur yang sehat untuk generasi masa depan Indonesia.
                  </p>
                </div>
              </div>

              {/* Text lists of actual impacts */}
              <div className="space-y-6">
                <h3 className="font-display font-extrabold text-2xl text-slate-900">
                  Dampak Hebat yang Akan Anda Rasakan:
                </h3>
                
                <div className="space-y-4">
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-sm">
                      👨‍👩‍👦
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Keluarga Lebih Sehat & Hemat</h4>
                      <p className="text-slate-600 text-sm mt-0.5">
                        Menghindari konsumsi mikroplastik dari wadah makanan plastik murahan. Mengurangi pengeluaran berlebih untuk produk sekali pakai yang sia-sia.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-bold text-sm">
                      🏡
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Rumah Bersih & Minimalis (Declutter)</h4>
                      <p className="text-slate-600 text-sm mt-0.5">
                        Lebih sedikit timbunan barang plastik tak berguna di gudang Anda. Rumah terasa lebih lapang, tenang, dan tertata rapi khas konsep gaya hidup ramah lingkungan.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold text-sm">
                      🌊
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Ekosistem Laut & Pantai Terjaga</h4>
                      <p className="text-slate-600 text-sm mt-0.5">
                        Mengurangi resiko biota laut mati karena tersangkut kantong plastik atau memakan mikroplastik berbahaya yang akhirnya kembali kita konsumsi lewat hidangan laut.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* INTERACTIVE CALCULATOR SECTION */}
      <section id="kalkulator" className="py-20 bg-slate-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* CALCULATOR LOGIC FORM */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <span className="px-3.5 py-1.5 bg-sky-100 text-sky-800 text-xs font-bold rounded-full tracking-wide uppercase border border-sky-200">
                  🧮 KALKULATOR PENYELAMAT BUMI
                </span>
                <h2 className="font-display font-extrabold text-3xl text-slate-900 leading-tight">
                  Ukur Pengurangan Sampahmu Hari Ini!
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Geser intensitas kebiasaan penggunaan plastik sekali pakai Anda saat ini. Kami akan langsung menghitung perkiraan kontribusi nyata penyelamatan bumi jika Anda beralih ke minim sampah!
                </p>
              </div>

              {/* Sliders Container with claymorphic card styling */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-[inset_0_-4px_8px_rgba(0,0,0,0.03),_0_15px_30px_rgba(0,0,0,0.04)] space-y-6">
                
                {/* SLIDER 1: PLASTIC BAGS */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      🛍️ Kantong Belanja Plastik
                    </span>
                    <span className="font-mono bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-bold text-xs">
                      {plasticBags} lembar / minggu
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    value={plasticBags} 
                    onChange={(e) => setPlasticBags(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <p className="text-[11px] text-slate-400">Rata-rata belanja ke pasar, swalayan, atau warung kelontong.</p>
                </div>

                {/* SLIDER 2: BOTTLES/CUPS */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      🥤 Botol / Gelas Minum Plastik
                    </span>
                    <span className="font-mono bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-bold text-xs">
                      {plasticBottles} botol / minggu
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    value={plasticBottles} 
                    onChange={(e) => setPlasticBottles(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <p className="text-[11px] text-slate-400">Air mineral botol kemasan, gelas kopi jajan, atau teh manis sekali pakai.</p>
                </div>

                {/* SLIDER 3: STRAWS */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      🥤 Sedotan Plastik
                    </span>
                    <span className="font-mono bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-bold text-xs">
                      {plasticStraws} sedotan / minggu
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    value={plasticStraws} 
                    onChange={(e) => setPlasticStraws(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <p className="text-[11px] text-slate-400">Sedotan plastik yang didapat saat jajan minuman dingin.</p>
                </div>

              </div>
            </div>

            {/* CALCULATOR RESULTS */}
            <div className="lg:col-span-6">
              <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-sky-700 text-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(16,185,129,0.3),inset_0_-8px_16px_rgba(0,0,0,0.15)] space-y-6 relative overflow-hidden">
                
                {/* Decorative blob shapes */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-36 h-36 bg-sky-500/10 rounded-full blur-xl pointer-events-none"></div>

                <div className="flex items-center space-x-3 pb-4 border-b border-white/15">
                  <div className="p-2.5 bg-white/10 rounded-2xl">
                    <Calculator className="w-6 h-6 text-emerald-100" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-lg">Estimasi Dampak Tahunanmu</h3>
                    <p className="text-xs text-emerald-200">Jika beralih menerapkan hidup minim sampah</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  
                  {/* METRIC 1: ITEMS SAVED */}
                  <div className="bg-white/10 backdrop-blur-sm p-4.5 rounded-2xl border border-white/10">
                    <span className="text-xs text-emerald-100 font-semibold uppercase tracking-wider block mb-1">
                      Plastik Dihindari
                    </span>
                    <span className="font-display font-black text-2xl tracking-tight block">
                      {totalItemsSaved.toLocaleString("id-ID")}
                    </span>
                    <span className="text-[10px] text-emerald-200 block mt-1">
                      Pcs barang plastik / tahun
                    </span>
                  </div>

                  {/* METRIC 2: CO2 SAVED */}
                  <div className="bg-white/10 backdrop-blur-sm p-4.5 rounded-2xl border border-white/10">
                    <span className="text-xs text-emerald-100 font-semibold uppercase tracking-wider block mb-1">
                      Emisi CO₂ Ditekan
                    </span>
                    <span className="font-display font-black text-2xl tracking-tight block">
                      {co2SavedKg} Kg
                    </span>
                    <span className="text-[10px] text-emerald-200 block mt-1">
                      Karbon berbahaya / tahun
                    </span>
                  </div>

                </div>

                {/* HIGHLIGHT: TREES EQUIVALENT */}
                <div className="bg-white text-slate-800 p-5 rounded-2xl flex items-center gap-4 border border-emerald-500/10 shadow-lg">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl shrink-0">
                    🌳
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">
                      SETARA DENGAN MENANAM
                    </span>
                    <h4 className="font-display font-black text-xl text-emerald-700 tracking-tight leading-none mt-1">
                      {treesEquivalent} Pohon Dewasa
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Pohon yang menyerap gas karbon merusak selama satu tahun penuh.
                    </p>
                  </div>
                </div>

                {/* RANKING DESCRIPTION */}
                <div className="pt-2 text-center">
                  <span className="text-xs text-emerald-200 font-bold uppercase tracking-widest block mb-1">GELAR PRESTASI POTENSIALMU</span>
                  <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-yellow-400 text-slate-900 font-display font-extrabold text-sm rounded-full shadow-md">
                    👑 {totalItemsSaved === 0 ? "Mulailah Hidup Minim Sampah!" : totalItemsSaved < 200 ? "Pejuang Hijau Baru" : totalItemsSaved < 1000 ? "Pendekar Lingkungan" : "Pahlawan Penjaga Bumi"}
                  </div>
                  <p className="text-xs text-emerald-100/80 mt-3 leading-relaxed">
                    "Setiap kontribusi kecil dari kita sangat berharga bagi lautan dan alam liar di Indonesia. Kamu sudah memulai langkah hebat!"
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* TULIS SIAP COMMENT BOARD (HERO REQUIREMENT) */}
      <section id="tulis-siap" className="py-20 bg-emerald-50/50 border-y border-emerald-100 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider">
              📣 LIVE COMMENT BOARD INDONESIA
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
              Pernyataan Komitmen: Tulis "SIAP"
            </h2>
            <p className="text-slate-600 text-sm">
              Sesuai instruksi gerakan, nyatakan tekadmu dengan menulis kata <strong className="text-emerald-600 font-black">"SIAP"</strong> pada pesan komitmen di bawah ini dan jadilah bagian dari revolusi zero waste!
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-8">
            
            {/* Input Form */}
            <form onSubmit={handlePledgeSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Nama Kamu
                  </label>
                  <input 
                    type="text" 
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-sm transition-all outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Kota Asal di Indonesia
                  </label>
                  <input 
                    type="text" 
                    value={inputCity}
                    onChange={(e) => setInputCity(e.target.value)}
                    placeholder="Contoh: Yogyakarta, DIY"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-sm transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Pesan Komitmen (Wajib Mengandung Kata "SIAP")
                  </label>
                  <button 
                    type="button"
                    onClick={fillReadyPledge}
                    className="text-xs text-emerald-600 font-extrabold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    ✨ Gunakan Templat
                  </button>
                </div>
                <textarea 
                  value={inputPledge}
                  onChange={(e) => setInputPledge(e.target.value)}
                  placeholder="Contoh: Saya SIAP membawa tote bag sendiri dan pilah sampah dapur mulai hari ini demi laut sehat!"
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-sm transition-all outline-none resize-none"
                  required
                ></textarea>
              </div>

              {pledgeError && (
                <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl flex items-center gap-2 border border-rose-100">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{pledgeError}</span>
                </div>
              )}

              {pledgeSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-xl flex items-center gap-2 border border-emerald-100">
                  <Check className="w-4 h-4 shrink-0 animate-bounce" />
                  <span>Luar biasa! Komitmen ramah lingkunganmu berhasil terkirim ke dinding publik! 🌍🎉</span>
                </div>
              )}

              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-[0_4px_12px_rgba(16,185,129,0.25)] flex items-center gap-2 cursor-pointer transition-all hover:translate-y-[-1px]"
                >
                  <Send className="w-4 h-4" /> Kirim Komitmen
                </button>
              </div>
            </form>

            {/* LIVE COMMENTS STREAM */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
                Daftar Komitmen Pendekar Hijau ({pledges.length} Komentar)
              </h4>

              <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1">
                <AnimatePresence initial={false}>
                  {pledges.map((pledge) => (
                    <motion.div 
                      key={pledge.id}
                      initial={pledge.isCustom ? { opacity: 0, y: -20 } : false}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-colors flex items-start gap-3.5"
                    >
                      <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                        👤
                      </div>
                      <div className="space-y-1 w-full">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <span className="font-bold text-sm text-slate-800">{pledge.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{pledge.timestamp}</span>
                        </div>
                        <div className="flex items-center text-xs text-slate-500 font-semibold gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{pledge.city}</span>
                        </div>
                        <p className="text-sm text-slate-700 mt-1.5 leading-relaxed bg-white p-3 rounded-xl border border-slate-100 shadow-sm font-sans italic">
                          "{pledge.pledgeText}"
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION (WITH PLEDGE CERTIFICATE FORM) */}
      <section id="komitmen" className="py-20 bg-slate-900 text-white scroll-mt-20 relative overflow-hidden">
        
        {/* Background visual graphics */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* CTA Copywriting */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <span className="px-3.5 py-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full uppercase tracking-wider border border-emerald-500/30">
                ⭐ GABUNG SEBAGAI ANGGOTA AKTIF
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight leading-tight">
                Saya Siap Hidup Minim Sampah!
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                Pilih komitmen hidup ramah lingkunganmu hari ini secara resmi. Isi form berikut untuk mendapatkan <strong className="text-emerald-400">Sertifikat Digital Pahlawan Bumi</strong> berlisensi Zero Waste Indonesia untuk dibagikan ke sosial mediamu!
              </p>

              <div className="space-y-4 max-w-md mx-auto lg:mx-0 pt-2 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs shrink-0">
                    ✓
                  </div>
                  <span className="text-sm text-slate-200">Panduan Praktis Zero Waste Pemula (PDF)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs shrink-0">
                    ✓
                  </div>
                  <span className="text-sm text-slate-200">Akses Komunitas WA Group Regional</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs shrink-0">
                    ✓
                  </div>
                  <span className="text-sm text-slate-200">Sertifikat Digital khusus dengan nama pribadimu</span>
                </div>
              </div>
            </div>

            {/* FORM CARD */}
            <div className="lg:col-span-6">
              <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
                <h3 className="font-display font-bold text-xl text-slate-900 mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-emerald-500 animate-bounce" /> Klaim Sertifikat Hijau-mu
                </h3>

                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                      Nama Lengkap Anda
                    </label>
                    <input 
                      type="text" 
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      placeholder="Contoh: Siti Rahmawati, S.Kom"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-sm transition-all outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                      Alamat Email Aktif
                    </label>
                    <input 
                      type="email" 
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="Contoh: sitirahma@email.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-sm transition-all outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                      Domisili Kota Sekarang
                    </label>
                    <input 
                      type="text" 
                      value={signupCity}
                      onChange={(e) => setSignupCity(e.target.value)}
                      placeholder="Contoh: Denpasar, Bali"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-sm transition-all outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                      Target Komitmen Hidup Minim Sampah
                    </label>
                    <select 
                      value={signupLevel}
                      onChange={(e) => setSignupLevel(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 rounded-xl text-sm transition-all outline-none"
                    >
                      <option value="Pemula Hijau">Mulai Kurangi Kantong Belanja Plastik & Sedotan (Pemula)</option>
                      <option value="Pejuang Lingkungan">Kurangi Plastik Sekali Pakai & Mulai Pilah Sampah (Pejuang)</option>
                      <option value="Pahlawan Bumi">Kurangi Plastik, Mengompos Mandiri & Setor Bank Sampah (Hero)</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-[0_8px_16px_rgba(16,185,129,0.3),inset_0_-3px_0_rgba(0,0,0,0.15)] transition-all cursor-pointer hover:scale-[1.01]"
                    >
                      Saya Siap Hidup Minim Sampah & Buat Sertifikat
                    </button>
                  </div>

                </form>
              </div>
            </div>

          </div>

          {/* DYNAMIC CERTIFICATE GENERATION MODAL DISPLAY */}
          <AnimatePresence>
            {isCertificateOpen && certificateData && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
              >
                <motion.div 
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 max-w-2xl w-full relative overflow-hidden border-8 border-emerald-50 shadow-2xl"
                >
                  
                  {/* Close Button */}
                  <button 
                    onClick={() => setIsCertificateOpen(false)}
                    className="absolute top-4 right-4 w-9 h-9 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
                  >
                    ✕
                  </button>

                  {/* Certificate Design Layout */}
                  <div className="border-4 border-dashed border-emerald-200 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-emerald-50/20 to-white relative text-center space-y-6">
                    
                    {/* Leaf Decorative Emblem */}
                    <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-3xl shadow-md">
                      🌱
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-mono tracking-widest text-emerald-600 font-extrabold">SERTIFIKAT ELEKTRONIK PLEDGE</p>
                      <h3 className="font-display font-black text-2xl tracking-tight text-slate-900">PAHLAWAN ZERO WASTE</h3>
                      <p className="text-xs text-slate-400 font-mono">No: {certificateData.certNumber}</p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                      Sertifikat apresiasi ini diberikan sebagai bukti sah komitmen luhur dan aksi nyata menjaga kelestarian alam Indonesia kepada:
                    </p>

                    <div className="space-y-1">
                      <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-emerald-600 tracking-tight border-b-2 border-emerald-100 pb-2 w-max mx-auto px-4">
                        {certificateData.name}
                      </h4>
                      <p className="text-xs font-semibold text-slate-500 mt-1 flex items-center justify-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-500" /> Domisili: {certificateData.city}
                      </p>
                    </div>

                    <div className="py-2.5 px-4 bg-emerald-50 border border-emerald-100 rounded-xl inline-block">
                      <span className="text-xs text-emerald-800 font-extrabold uppercase">STATUS LEVEL KOMITMEN:</span>
                      <p className="text-sm font-bold text-slate-800 mt-0.5">🌟 {certificateData.badge}</p>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                      "Dengan ini berjanji mengurangi timbulan sampah plastik sekali pakai, memilah sisa konsumsi dari rumah, dan berkontribusi aktif mengedukasi masyarakat luas."
                    </p>

                    <div className="flex justify-between items-end pt-4 border-t border-slate-100">
                      <div className="text-left">
                        <p className="text-[9px] text-slate-400 font-mono">TANGGAL PENERBITAN</p>
                        <p className="text-xs font-bold text-slate-700">{certificateData.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-600 font-display font-black text-xs">ZeroWaste.ID</div>
                        <p className="text-[8px] text-slate-400">GERAKAN NASIONAL MINIM SAMPAH</p>
                      </div>
                    </div>

                  </div>

                  {/* Actions under certificate */}
                  <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 justify-between">
                    <p className="text-xs text-slate-500 text-center sm:text-left">
                      Tangkapan layar (screenshot) layar ini untuk dibagikan di Instagram Story & WhatsApp!
                    </p>
                    <button 
                      onClick={() => alert("Sertifikat berhasil diunduh ke memori ponsel/PC (simulasi). Bagikan dengan hashtag #HidupMinimSampah!")}
                      className="w-full sm:w-auto px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" /> Unduh Sertifikat
                    </button>
                  </div>

                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* INDONESIAN EDUCATION & FAQ ACCORDION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="px-3 py-1 bg-sky-100 text-sky-800 text-xs font-bold rounded-full uppercase">
              📚 EDUKASI UTAMA
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
              Pertanyaan & Tips Seputar Minim Sampah
            </h2>
            <p className="text-slate-600 text-sm">
              Bingung bagaimana cara mulai? Temukan jawaban dan tips praktis khusus untuk gaya hidup ramah lingkungan di Indonesia.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            
            {/* FAQ 1 */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden transition-colors hover:border-emerald-300">
              <button 
                onClick={() => setActiveFaq(activeFaq === 0 ? null : 0)}
                className="w-full px-6 py-5 bg-slate-50/50 hover:bg-slate-50 flex justify-between items-center text-left font-bold text-slate-800 text-sm sm:text-base outline-none cursor-pointer"
              >
                <span>Bagaimana cara termudah memulai hidup minim sampah bagi pemula di Indonesia?</span>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${activeFaq === 0 ? "rotate-180 text-emerald-500" : ""}`} />
              </button>
              {activeFaq === 0 && (
                <div className="px-6 py-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed bg-white space-y-2">
                  <p>Langkah terbaik adalah dengan tidak menuntut kesempurnaan langsung (imperfection zero-waste is better than nothing). Mulailah dari 3 kebiasaan dasar yang berdampak besar:</p>
                  <ul className="list-disc list-inside space-y-1 pl-2">
                    <li>Membawa wadah minum sendiri (tumbler) saat pergi keluar rumah agar tidak membeli air minum botol plastik.</li>
                    <li>Menyimpan 1 tas belanja kain lipat di dalam jok motor, mobil, atau ransel agar selalu siap menolak kantong kresek warung.</li>
                    <li>Menghabiskan makanan piringmu untuk menekan timbulan sisa sampah organik (food waste).</li>
                  </ul>
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden transition-colors hover:border-emerald-300">
              <button 
                onClick={() => setActiveFaq(activeFaq === 1 ? null : 1)}
                className="w-full px-6 py-5 bg-slate-50/50 hover:bg-slate-50 flex justify-between items-center text-left font-bold text-slate-800 text-sm sm:text-base outline-none cursor-pointer"
              >
                <span>Mengapa sisa sampah organik dapur justru berbahaya jika menumpuk di TPA?</span>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${activeFaq === 1 ? "rotate-180 text-emerald-500" : ""}`} />
              </button>
              {activeFaq === 1 && (
                <div className="px-6 py-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed bg-white space-y-2">
                  <p>Banyak yang beranggapan sampah organik (sisa sayur, buah, nasi) tidak berbahaya karena bisa membusuk. Padahal, ketika sampah organik tercampur plastik dan menumpuk di bawah timbunan TPA tanpa oksigen (kondisi anaerob), pembusukannya akan melepas <strong className="text-slate-800">Gas Metana (CH₄)</strong>.</p>
                  <p>Gas Metana memiliki kekuatan merusak atmosfer bumi <strong className="text-slate-800">25-30 kali lebih kuat dibanding Karbondioksida (CO₂)</strong>, sekaligus menjadi pemicu ledakan dan kebakaran tragis TPA (seperti tragedi TPA Leuwigajah 2005). Mengompos di rumah adalah solusi terbaik untuk masalah ini.</p>
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden transition-colors hover:border-emerald-300">
              <button 
                onClick={() => setActiveFaq(activeFaq === 2 ? null : 2)}
                className="w-full px-6 py-5 bg-slate-50/50 hover:bg-slate-50 flex justify-between items-center text-left font-bold text-slate-800 text-sm sm:text-base outline-none cursor-pointer"
              >
                <span>Di mana saya bisa menyalurkan sampah anorganik terpilah di Indonesia?</span>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${activeFaq === 2 ? "rotate-180 text-emerald-500" : ""}`} />
              </button>
              {activeFaq === 2 && (
                <div className="px-6 py-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed bg-white space-y-2">
                  <p>Saat ini ekosistem pengelolaan sampah terpilah di Indonesia sudah sangat berkembang pesat:</p>
                  <ul className="list-disc list-inside space-y-1.5 pl-2">
                    <li><strong className="text-slate-800">Bank Sampah Unit RT/RW:</strong> Hampir setiap kelurahan/desa kini memiliki Bank Sampah swadaya di mana Anda bisa menyetorkan plastik keras, kardus, dan kaleng untuk dikonversi menjadi saldo tabungan rupiah atau emas.</li>
                    <li><strong className="text-slate-800">Aplikasi Penjemput Sampah:</strong> Anda bisa memakai aplikasi digital seperti Rekosistem, Octopus, Waste4Change, atau Duitin untuk menjemput sampah kertas/plastik terpilah langsung dari rumah Anda.</li>
                    <li><strong className="text-slate-800">Drop Point Kosmetik & Kemasan:</strong> Berbagai brand kecantikan di mall besar menyediakan kotak drop-off kemasan kosong bekas pakai untuk didaur ulang secara gratis dengan imbalan poin belanja.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* FAQ 4 */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden transition-colors hover:border-emerald-300">
              <button 
                onClick={() => setActiveFaq(activeFaq === 3 ? null : 3)}
                className="w-full px-6 py-5 bg-slate-50/50 hover:bg-slate-50 flex justify-between items-center text-left font-bold text-slate-800 text-sm sm:text-base outline-none cursor-pointer"
              >
                <span>Apakah hidup minim sampah itu mahal?</span>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${activeFaq === 3 ? "rotate-180 text-emerald-500" : ""}`} />
              </button>
              {activeFaq === 3 && (
                <div className="px-6 py-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed bg-white space-y-2">
                  <p>Sama sekali tidak! Justru sebaliknya. Gaya hidup minim sampah didasarkan pada prinsip kesederhanaan (frugality) dan pengurangan belanja konsumtif.</p>
                  <p>Meskipun beberapa produk khusus (seperti sikat gigi bambu atau botol minum premium) memerlukan biaya awal sedikit lebih tinggi, jangka panjangnya Anda akan menghemat banyak uang dengan menolak kantong belanja berbayar, membuat pembersih organik buatan sendiri (eco-enzyme), dan tidak membeli air mineral kemasan berulang kali setiap hari.</p>
                </div>
              )}
            </div>

          </div>

          {/* Learn More Floating Button */}
          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500 mb-3">Ingin bergabung ke grup diskusi WA dan menerima tips mingguan?</p>
            <a 
              href="#komitmen" 
              className="inline-flex items-center gap-1.5 px-6 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-sm rounded-xl border border-emerald-200 shadow-sm transition-all cursor-pointer"
            >
              <Info className="w-4 h-4" /> Pelajari Lebih Lanjut & Gabung Komunitas
            </a>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-start">
            
            {/* Column 1: Info */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-emerald-500/15 rounded-xl flex items-center justify-center border border-emerald-500/20">
                  <Leaf className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="font-display font-extrabold text-lg text-white">ZeroWaste.ID</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                Gerakan kesadaran lingkungan independen untuk mewujudkan Indonesia bersih dari krisis sampah plastik sekali pakai. Bersama kita jaga laut, asri tanah kita, dan rawat bumi Indonesia tercinta.
              </p>
              <div className="flex space-x-4 pt-2">
                <a href="#" className="p-2 bg-slate-900 hover:bg-slate-850 hover:text-white rounded-lg transition-colors" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-slate-900 hover:bg-slate-850 hover:text-white rounded-lg transition-colors" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-slate-900 hover:bg-slate-850 hover:text-white rounded-lg transition-colors" aria-label="Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Hashtags */}
            <div className="md:col-span-4 space-y-3.5">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Kampanye & Tagar Resmi</h4>
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                <span className="px-3 py-1.5 bg-slate-900 text-emerald-400 rounded-lg font-mono font-bold border border-slate-850">
                  #HidupMinimSampah
                </span>
                <span className="px-3 py-1.5 bg-slate-900 text-sky-400 rounded-lg font-mono font-bold border border-slate-850">
                  #ZeroWasteIndonesia
                </span>
                <span className="px-3 py-1.5 bg-slate-900 text-slate-300 rounded-lg font-mono font-bold border border-slate-850">
                  #BebasPlastikSekaliPakai
                </span>
                <span className="px-3 py-1.5 bg-slate-900 text-slate-300 rounded-lg font-mono font-bold border border-slate-850">
                  #PilahSampahDariRumah
                </span>
              </div>
            </div>

            {/* Column 3: Links */}
            <div className="md:col-span-3 space-y-3.5">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Menu Pintasan</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><a href="#fakta" className="hover:text-white transition-colors">Fakta Krisis Sampah</a></li>
                <li><a href="#solusi" className="hover:text-white transition-colors">3 Langkah Solusi</a></li>
                <li><a href="#kalkulator" className="hover:text-white transition-colors">Kalkulator Dampak</a></li>
                <li><a href="#komitmen" className="hover:text-white transition-colors">Daftar Anggota / Sertifikat</a></li>
              </ul>
            </div>

          </div>

          {/* Copyright line */}
          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p className="text-slate-500 text-center sm:text-left">
              &copy; {new Date().getFullYear()} ZeroWaste.ID. Semua hak cipta dilindungi undang-undang.
            </p>
            <p className="text-slate-500 flex items-center gap-1">
              Dibuat dengan rasa cinta untuk kelestarian Alam Indonesia 🇮🇩❤️
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
