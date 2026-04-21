import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Phone, 
  MapPin, 
  Clock, 
  Menu as MenuIcon, 
  X, 
  ChevronRight, 
  Instagram, 
  Facebook,
  UtensilsCrossed,
  Star,
  Award,
  Zap
} from 'lucide-react';

// Types for our data
interface FoodItem {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

interface Promotion {
  id: number;
  title: string;
  discount: string;
  code: string;
  image: string;
}

const MENU_ITEMS: FoodItem[] = [
  {
    id: 1,
    name: "Nasi Ayam Madu Original",
    price: "RM 12.00",
    description: "Nasi wangi dimasak sempurna, dihidangkan dengan ayam goreng madu herba, sup panas & sambal kicap istimewa.",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=800",
    category: "Nasi"
  },
  {
    id: 2,
    name: "Burger Bakar 'The Beast'",
    price: "RM 15.00",
    description: "Daging lembu premium 150g, keju cheddar cair, sos rahsia, dan sayuran segar dalam roti brioche lembut.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800",
    category: "Burger"
  },
  {
    id: 3,
    name: "Ayam Gepuk Sambal Padu",
    price: "RM 13.00",
    description: "Ayam goreng rangup yang 'digepuk' dengan sambal cili padi asli. Pedas yang membangkitkan selera!",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800",
    category: "Ayam"
  },
  {
    id: 4,
    name: "Satay Legend (10 Cucuk)",
    price: "RM 10.00",
    description: "Pilihan Ayam atau Daging, diperap semalaman dengan rempah asli & dibakar arang untuk rasa 'smoky'.",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&q=80&w=800",
    category: "Snek"
  }
];

const PROMOTIONS: Promotion[] = [
  {
    id: 1,
    title: "Happy Hour Lunch",
    discount: "20% OFF",
    code: "LUNCH20",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Combo Jimat Keluarga",
    discount: "Free Drinks",
    code: "COMBOFAM",
    image: "https://images.unsplash.com/photo-1547573854-74d2a71d0826?auto=format&fit=crop&q=80&w=800"
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppOrder = (itemName: string) => {
    const message = encodeURIComponent(`Hai Selera Kampung, saya ingin memesan: ${itemName}.`);
    window.open(`https://wa.me/60123456789?text=${message}`, '_blank');
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-yellow-400 selection:text-zinc-950 overflow-x-hidden">
      {/* Navigation */}
      <nav 
        id="navbar"
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-zinc-950/90 backdrop-blur-md py-4 shadow-xl border-b border-white/10' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-red-600/20">
              <UtensilsCrossed className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic">
              Selera<span className="text-yellow-400">Kampung</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-bold uppercase text-xs tracking-widest">
            <a href="#hero" className="hover:text-yellow-400 transition-colors">Utama</a>
            <a href="#menu" className="hover:text-yellow-100 transition-colors">Menu</a>
            <a href="#promo" className="hover:text-yellow-100 transition-colors">Promosi</a>
            <a href="#about" className="hover:text-yellow-100 transition-colors">Tentang Kami</a>
            <a href="#contact" className="hover:text-yellow-100 transition-colors">Hubungi</a>
            <button 
              onClick={() => handleWhatsAppOrder('Umum')}
              className="bg-yellow-400 text-zinc-950 px-6 py-2.5 rounded-full hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-yellow-400/20"
            >
              Order Sekarang
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-red-600 z-50 flex flex-col items-center justify-center gap-8 md:hidden"
            >
              <button className="absolute top-6 right-6" onClick={() => setIsMenuOpen(false)}>
                <X size={32} />
              </button>
              <a href="#hero" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black italic uppercase">Utama</a>
              <a href="#menu" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black italic uppercase text-yellow-400">Menu</a>
              <a href="#promo" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black italic uppercase">Promosi</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black italic uppercase">Tentang</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black italic uppercase">Hubungi</a>
              <button 
                onClick={() => { handleWhatsAppOrder('Umum'); setIsMenuOpen(false); }}
                className="mt-4 bg-zinc-950 text-white px-8 py-4 rounded-full text-xl font-bold"
              >
                Order WhatsApp
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero Background" 
            className="w-full h-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
        </div>

        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-6 shadow-xl">
              Authentic Local Taste
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase italic leading-[0.8] mb-8">
              Rasa<br />
              <span className="text-yellow-400 drop-shadow-[0_5px_15px_rgba(250,204,21,0.3)]">Setanding</span><br />
              Nama
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 mb-10 font-medium">
              Hidangan tradisional dengan sentuhan moden. Kami hanya menggunakan bahan segar pilihan untuk memastikan setiap suapan membangkitkan memori kampung halaman anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#menu" 
                className="bg-yellow-400 text-zinc-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-white transition-all transform hover:-translate-y-1 shadow-2xl shadow-yellow-400/20"
              >
                Lihat Menu <ChevronRight className="w-5 h-5" />
              </a>
              <button 
                onClick={() => handleWhatsAppOrder('General Enquiry')}
                className="bg-zinc-900 border border-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all transform hover:-translate-y-1"
              >
                Talk to Us <Phone className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Feature Icons */}
        <div className="absolute bottom-10 left-0 w-full hidden lg:block">
          <div className="container mx-auto px-6 flex justify-between text-zinc-500 font-bold uppercase text-[10px] tracking-[0.2em]">
            <div className="flex items-center gap-2 italic"><Award className="w-4 h-4 text-red-600" /> Top Rated Malaysian Food</div>
            <div className="flex items-center gap-2 italic"><Clock className="w-4 h-4 text-yellow-400" /> Buka Jam 10AM - 10PM</div>
            <div className="flex items-center gap-2 italic"><Zap className="w-4 h-4 text-red-600" /> Delivery Cepat & Pantas</div>
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section id="promo" className="py-24 bg-zinc-900">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-3">Tawaran Istimewa</h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase italic">Promosi Bulan Ini</h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {PROMOTIONS.map((promo) => (
              <motion.div 
                key={promo.id}
                {...fadeInUp}
                className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer"
              >
                <img 
                  src={promo.image} 
                  alt={promo.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <div className="bg-yellow-400 text-zinc-950 text-xs font-black py-1 px-3 w-fit rounded-lg mb-4">
                    KOD: {promo.code}
                  </div>
                  <h4 className="text-3xl font-black uppercase italic mb-2">{promo.title}</h4>
                  <p className="text-5xl font-black text-white italic">{promo.discount}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div>
              <h2 className="text-xs font-black text-yellow-400 uppercase tracking-[0.4em] mb-3">Air Tangan Kami</h2>
              <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">Menu Utama</h3>
            </div>
            <div className="flex gap-4">
              {['Semua', 'Nasi', 'Burger', 'Ayam'].map((cat) => (
                <button key={cat} className="text-xs font-black uppercase tracking-widest px-4 py-2 border border-white/10 rounded-full hover:bg-white hover:text-zinc-950 transition-all">
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {MENU_ITEMS.map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.id * 0.1 }}
                className="group bg-zinc-900 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-red-600/50 transition-all"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-zinc-950/80 backdrop-blur-md px-4 py-2 rounded-2xl font-black text-yellow-400 border border-white/10">
                    {item.price}
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-2 block">{item.category}</span>
                  <h4 className="text-xl font-bold uppercase mb-3 leading-tight tracking-tight group-hover:text-yellow-400 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-zinc-400 text-sm mb-8 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                  <button 
                    onClick={() => handleWhatsAppOrder(item.name)}
                    className="w-full bg-zinc-950 border border-white/10 text-white font-black uppercase text-xs py-4 rounded-2xl flex items-center justify-center gap-2 group-hover:bg-red-600 group-hover:border-red-600 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" /> Order WhatsApp
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <button className="bg-white/5 border border-white/10 hover:bg-white/10 px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all">
              Tengok Menu Penuh (+24 item)
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeInUp} className="relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden border-8 border-zinc-900">
               <img 
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1000" 
                alt="Chef" 
                className="w-full h-[600px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400 rounded-full flex flex-col items-center justify-center text-zinc-950 font-black italic p-4 text-center z-20 shadow-2xl">
              <span className="text-3xl">15+</span>
              <span className="text-[10px] uppercase leading-tight">Tahun Resipi Warisan</span>
            </div>
          </motion.div>

          <motion.div {...fadeInUp}>
            <h2 className="text-xs font-black text-red-600 uppercase tracking-[0.4em] mb-6">Warisan Kami</h2>
            <h3 className="text-5xl md:text-6xl font-black uppercase italic mb-8 leading-[0.9]">Lebih Dari Sekadar Makanan.</h3>
            <div className="space-y-6 text-zinc-400 text-lg">
              <p>
                Bermula dari gerai kecil di pinggir jalan pada tahun 2010, <span className="text-white font-bold italic">Selera Kampung</span> lahir daripada keinginan untuk berkongsi rahsia masakan nenek moyang kami.
              </p>
              <p>
                Setiap rempah ratus yang kami gunakan dikisar segar setiap pagi, dan setiap daging diperap dengan kasih sayang. Kami percaya masakan yang baik memerlukan kesabaran dan kejujuran dalam pemilihan bahan.
              </p>
              <div className="pt-6 grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-black text-yellow-400 italic">100%</div>
                  <div className="text-xs uppercase font-bold tracking-widest">Bahan Halal</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-yellow-400 italic">250+</div>
                  <div className="text-xs uppercase font-bold tracking-widest">Client Harian</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials (Added touch) */}
      <section className="py-24 bg-red-600 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <UtensilsCrossed size={300} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="flex gap-1 mb-8">
              {[1,2,3,4,5].map(i => <Star key={i} size={24} fill="currentColor" className="text-yellow-400" />)}
            </div>
            <h4 className="text-3xl md:text-5xl font-black uppercase italic mb-10 text-white max-w-4xl">
              "Kualiti makanan yang tak pernah berubah sejak dulu. Nasi ayam dia memang padu, sambal pedas ngam-ngam!"
            </h4>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-950 flex items-center justify-center font-bold">AZ</div>
              <div className="text-left">
                <div className="font-bold uppercase tracking-widest text-sm">Ahmad Zulkifli</div>
                <div className="text-xs font-medium text-white/70 italic">Pelanggan Setia sejak 2018</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-zinc-900 rounded-[3rem] p-10 md:p-20 border border-white/5 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-xs font-black text-yellow-400 uppercase tracking-[0.4em] mb-6">Lokasi Kami</h2>
              <h3 className="text-5xl font-black uppercase italic mb-10">Bila Lagi Nak Singgah?</h3>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="bg-zinc-950 p-4 rounded-xl text-red-600"><MapPin size={24} /></div>
                  <div>
                    <div className="font-black uppercase tracking-widest text-xs mb-1">Alamat</div>
                    <div className="text-zinc-400">Lot 123, Jalan Makanan Sedap, 50480 Kuala Lumpur.</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-zinc-950 p-4 rounded-xl text-yellow-400"><Clock size={24} /></div>
                  <div>
                    <div className="font-black uppercase tracking-widest text-xs mb-1">Waktu Operasi</div>
                    <div className="text-zinc-400">Selasa - Ahad: 10:00 AM - 10:00 PM <br />(Isnin Cuti)</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-zinc-950 p-4 rounded-xl text-white"><Phone size={24} /></div>
                  <div>
                    <div className="font-black uppercase tracking-widest text-xs mb-1">Telefon</div>
                    <div className="text-zinc-400">+6012-345 6789</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center hover:bg-white hover:text-zinc-950 transition-all border border-white/10"><Instagram size={20} /></a>
                <a href="#" className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center hover:bg-white hover:text-zinc-950 transition-all border border-white/10"><Facebook size={20} /></a>
              </div>
            </div>

            <div className="h-full min-h-[400px] rounded-3xl overflow-hidden grayscale brightness-75 border border-white/5 relative group">
              <img 
                src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1000" 
                alt="Map Style" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-red-600/20 group-hover:bg-transparent transition-all pointer-events-none"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-zinc-950 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-tighter text-sm shadow-2xl">Buka Google Maps</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <UtensilsCrossed className="text-white w-4 h-4" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">
              Selera<span className="text-yellow-400">Kampung</span>
            </span>
          </div>
          
          <div className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em]">
            © 2026 SELERA KAMPUNG SDN BHD. HAK CIPTA TERPELIHARA.
          </div>

          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Careers</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
