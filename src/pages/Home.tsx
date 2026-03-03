import { useState, useEffect, useRef } from "react";
import ProductPage from "./Products";
interface Slide {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  accent: string;
  fallbackBg: string;
  bubbleColor: string;
  image: string | null;
  fallbackEmoji: string;
}

interface Category {
  id: number;
  label: string;
  initial: string;
  bgActive: string;
  textActive: string;
  image: string | null;
}

interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  emoji: string;
  bg: string;
  category: string;
}

const slides: Slide[] = [
  {
    id: 1,
    tag: "NEW SEASON",
    title: "Spring\nCollection",
    subtitle: "Fresh styles, bold looks",
    accent: "#FF6B6B",
    fallbackBg: "linear-gradient(135deg, #fff5f5 0%, #ffe0e0 100%)",
    bubbleColor: "rgba(255,107,107,0.18)",
    image: "https://images.pexels.com/photos/1778412/pexels-photo-1778412.jpeg",
    fallbackEmoji: "👗",
  },
  {
    id: 2,
    tag: "LIMITED OFFER",
    title: "24% off\nShipping",
    subtitle: "On all bag purchases today",
    accent: "#6C63FF",
    fallbackBg: "linear-gradient(135deg, #f0eeff 0%, #dcd8ff 100%)",
    bubbleColor: "rgba(108,99,255,0.18)",
    image: "https://images.pexels.com/photos/2247181/pexels-photo-2247181.jpeg",
    fallbackEmoji: "👜",
  },
  {
    id: 3,
    tag: "EXCLUSIVE",
    title: "Summer\nEssentials",
    subtitle: "Curated for the season",
    accent: "#00B894",
    fallbackBg: "linear-gradient(135deg, #e8faf5 0%, #c8f0e4 100%)",
    bubbleColor: "rgba(0,184,148,0.18)",
    image: "https://images.pexels.com/photos/35188/child-childrens-baby-children-s.jpg",
    fallbackEmoji: "🕶️",
  },
];

const categories: Category[] = [
  { id: 1, label: "Men",   initial: "M", bgActive: "bg-blue-50",  textActive: "text-blue-500",  image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg" },
  { id: 2, label: "Women", initial: "W", bgActive: "bg-pink-50",  textActive: "text-pink-500",  image: "https://images.pexels.com/photos/458718/pexels-photo-458718.jpeg" },
  { id: 3, label: "Kids",  initial: "K", bgActive: "bg-amber-50", textActive: "text-amber-500", image: "https://images.pexels.com/photos/6182381/pexels-photo-6182381.jpeg" },
  { id: 4, label: "Sale",  initial: "S", bgActive: "bg-green-50", textActive: "text-green-500", image: "https://images.pexels.com/photos/1769859/pexels-photo-1769859.jpeg"},
];



export default function ShoppingApp(): JSX.Element {
  const [slide, setSlide]                   = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [wishlist, setWishlist]             = useState<number[]>([]);
  const [cartCount, setCartCount]           = useState<number>(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = (): void => {
    autoRef.current = setInterval(() => setSlide((s) => (s + 1) % slides.length), 3200);
  };

  useEffect(() => {
    startAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, []);

  const goTo = (i: number): void => {
    if (autoRef.current) clearInterval(autoRef.current);
    setSlide(i);
    startAuto();
  };

  const toggleWishlist = (id: number): void =>
    setWishlist((p) => (p.includes(id) ? p.filter((i) => i !== id) : [...p, id]));

  const cur: Slide = slides[slide];

  return (
    <div className="flex flex-col h-full overflow-hidden font-serif">

      {/* ── HEADER ── */}
      <div className="bg-white px-4 pt-4 pb-3 flex-shrink-0 border-b border-stone-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-blue-200 flex items-center justify-center font-black text-sm text-purple-700 font-sans">
            J
          </div>
          <div>
            <p className="m-0 text-sm font-bold text-gray-900 font-sans">Hi, Jonathan</p>
            <p className="m-0 text-xs text-gray-400 tracking-wide font-sans">Let's go shopping</p>
          </div>
        </div>

        <div className="flex gap-2">
          {/* Search */}
          <button className="w-9 h-9 rounded-full border-none cursor-pointer flex items-center justify-center">
            <svg width="16" height="16" fill="none" stroke="#555" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" strokeWidth={2}/>
              <path d="m21 21-4.35-4.35" strokeWidth={2} strokeLinecap="round"/>
            </svg>
          </button>
          {/* Cart */}
          <button
            onClick={() => setCartCount((c) => c + 1)}
            className="w-9 h-9 rounded-full border-none cursor-pointer flex items-center justify-center relative"
          >
            <svg width="16" height="16" fill="none" stroke="#555" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full text-white text-xs font-black flex items-center justify-center font-sans">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── SCROLL AREA ── */}
      <div className="flex-1 overflow-y-auto pb-6">

        {/* ══ CAROUSEL ══ */}
        <div className="pt-2">
          <div
            className="relative overflow-hidden h-52 shadow-lg"
            style={{ background: cur.fallbackBg }}
          >

            {/* Full-bg image OR gradient fallback */}
            {cur.image ? (
              <img
                src={cur.image}
                alt="banner"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0" style={{ background: cur.fallbackBg }} />
            )}

            {/* Dark overlay so text is always readable */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Text */}
            <div className="relative z-10 flex flex-col justify-center h-full px-6">
             

              {/* FIX: always white text */}
              <p
                className="m-0 text-2xl font-bold leading-tight whitespace-pre-line"
                style={{ color: "#fff", textShadow: "0 1px 6px rgba(0,0,0,0.25)" }}
              >
                {cur.title}
              </p>

              {/* FIX: always white subtitle */}
              <p
                className="mt-1.5 text-xs font-sans"
                style={{ color: "rgba(255,255,255,0.82)" }}
              >
                {cur.subtitle}
              </p>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="h-1.5 rounded-full border-none cursor-pointer p-0 transition-all duration-300"
                style={{
                  width: i === slide ? 20 : 6,
                  background: i === slide ? cur.accent : "#ddd",
                }}
              />
            ))}
          </div>
        </div>

        <ProductPage />
      </div>
    </div>
  );
}