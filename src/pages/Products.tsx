import { useState } from "react";

const products = [
  { id:1,  name:"Urban Slim Tee",     brand:"StreetEdge",   price:39.0,  category:"Men",    badge:"New",     badgeColor:"bg-gray-900",    image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",  rating:4.7, reviews:210 },
  { id:2,  name:"Classic Chino",      brand:"StreetEdge",   price:89.0,  category:"Men",    badge:"Hot",     badgeColor:"bg-orange-500",  image:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop",  rating:4.6, reviews:145 },
  { id:3,  name:"Denim Jacket",       brand:"RawCraft",     price:129.0, category:"Men",    badge:"Limited", badgeColor:"bg-purple-600",  image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",  rating:4.9, reviews:88  },
  { id:4,  name:"Linen Shirt",        brand:"CasualCo",     price:59.5,  category:"Men",    badge:"Sale",    badgeColor:"bg-red-500",     image:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop",  rating:4.5, reviews:67  },
  { id:5,  name:"Floral Midi Dress",  brand:"Bloom & Co",   price:112.0, category:"Women",  badge:"New",     badgeColor:"bg-gray-900",    image:"https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop",  rating:4.9, reviews:302 },
  { id:6,  name:"Tailored Blazer",    brand:"Maison Dufour",price:189.0, category:"Women",  badge:"Premium", badgeColor:"bg-amber-500",   image:"https://images.unsplash.com/photo-1594938298603-c8148c4b4a3b?w=400&h=400&fit=crop",  rating:5.0, reviews:178 },
  { id:7,  name:"Boho Wrap Skirt",    brand:"Vera Lux",     price:67.5,  category:"Women",  badge:"Hot",     badgeColor:"bg-orange-500",  image:"https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=400&fit=crop",  rating:4.7, reviews:94  },
  { id:8,  name:"Ribbed Knit Top",    brand:"Bloom & Co",   price:49.0,  category:"Women",  badge:"Sale",    badgeColor:"bg-red-500",     image:"https://images.unsplash.com/photo-1548549557-dbe9155c4d29?w=400&h=400&fit=crop",  rating:4.6, reviews:130 },
  { id:9,  name:"Rainbow Hoodie",     brand:"TinyThreads",  price:44.0,  category:"Kids",   badge:"New",     badgeColor:"bg-gray-900",    image:"https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop",  rating:4.8, reviews:55  },
  { id:10, name:"Dino Print Tee",     brand:"KidKraft",     price:28.0,  category:"Kids",   badge:"Hot",     badgeColor:"bg-orange-500",  image:"https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=400&h=400&fit=crop",  rating:4.7, reviews:43  },
  { id:11, name:"Fleecy Joggers",     brand:"TinyThreads",  price:36.5,  category:"Kids",   badge:"Sale",    badgeColor:"bg-red-500",     image:"https://images.unsplash.com/photo-1543060622-34cd2afb7140?w=400&h=400&fit=crop",  rating:4.5, reviews:29  },
  { id:12, name:"Fairy Dress",        brand:"LittleDream",  price:54.0,  category:"Kids",   badge:"New",     badgeColor:"bg-gray-900",    image:"https://images.unsplash.com/photo-1476234251651-f353703a034d?w=400&h=400&fit=crop",  rating:4.9, reviews:71  },
  { id:13, name:"Oversized Co-ord",   brand:"HypeHaus",     price:154.0, category:"Trendy", badge:"Hot",     badgeColor:"bg-orange-500",  image:"https://images.unsplash.com/photo-1536766768598-e09213fdcf22?w=400&h=400&fit=crop",  rating:4.8, reviews:220 },
  { id:14, name:"Y2K Cargo Pants",    brand:"RetroWave",    price:98.0,  category:"Trendy", badge:"New",     badgeColor:"bg-gray-900",    image:"https://images.unsplash.com/photo-1594938374182-a57369b4b57e?w=400&h=400&fit=crop",  rating:4.6, reviews:163 },
];

const categories = [
  { label:"All",    emoji:"✨" },
  { label:"Men",    emoji:"👔" },
  { label:"Women",  emoji:"👗" },
  { label:"Kids",   emoji:"🧸" },
  { label:"Trendy", emoji:"🔥" },
];

export default function ProductPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState(new Set());
  const [cartItems, setCartItems] = useState(new Set());

  const filtered = activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);

  const toggleFav  = (id) => setFavorites((prev)  => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleCart = (id) => setCartItems((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">

      {/* ── Header ── */}
      <div className="sticky top-0 z-50 bg-white border-b border-stone-100 px-5 pt-5 pb-4">
        {/* Title row */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-stone-400">Shop Collection</p>
            <h1 className="text-2xl font-extrabold text-stone-900 leading-tight">New Arrivals 🔥</h1>
          </div>
          <div className="flex items-center gap-2">
            {/* Search */}
            <button className="w-10 h-10 bg-stone-100 rounded-2xl flex items-center justify-center border-0 cursor-pointer hover:bg-stone-200 transition-colors">
              <svg width="16" height="16" fill="none" stroke="#666" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            {/* Cart */}
            <div className="relative">
              <button className="w-10 h-10 bg-stone-900 rounded-2xl flex items-center justify-center border-0 cursor-pointer hover:bg-stone-700 transition-colors">
                <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </button>
              {cartItems.size > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white font-bold rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.size}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide" style={{ scrollbarWidth:"none" }}>
          {categories.map(({ label, emoji }) => {
            const active = activeCategory === label;
            return (
              <button
                key={label}
                onClick={() => setActiveCategory(label)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold border-0 cursor-pointer transition-all duration-200
                  ${active ? "bg-stone-900 text-white shadow-md scale-105" : "bg-stone-100 text-stone-500 hover:bg-stone-200"}`}
              >
                <span>{emoji}</span>{label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Count bar ── */}
      <div className="px-5 pt-4 pb-1 flex items-center justify-between">
        <p className="text-sm font-medium text-stone-400">{filtered.length} items</p>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-stone-400 bg-transparent border-0 cursor-pointer hover:text-stone-700 transition-colors">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="8" y2="18"/>
          </svg>
          Filter
        </button>
      </div>

      {/* ── Product Grid ── */}
      <div className="flex-1 overflow-y-auto px-4 pt-2 pb-28">
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden bg-stone-200 group">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => (e.target.style.display = "none")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />

                {/* Badge */}
                <span className={`absolute top-2.5 left-2.5 ${p.badgeColor} text-white text-xs font-bold rounded-lg px-2 py-0.5 tracking-wide`} style={{ fontSize: 9 }}>
                  {p.badge.toUpperCase()}
                </span>

                {/* Favourite */}
                <button
                  onClick={() => toggleFav(p.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-xl flex items-center justify-center border-0 cursor-pointer shadow-sm hover:scale-110 active:scale-90 transition-transform duration-150"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24"
                    fill={favorites.has(p.id) ? "#FF4D6D" : "none"}
                    stroke={favorites.has(p.id) ? "#FF4D6D" : "#ccc"}
                    strokeWidth="2.5">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                  </svg>
                </button>
              </div>

              {/* Info */}
              <div className="px-3 pt-3 pb-3">
                <p className="text-stone-400 font-semibold uppercase tracking-widest truncate" style={{ fontSize: 9 }}>
                  {p.brand}
                </p>
                <h3 className="text-stone-900 font-bold text-sm leading-snug mt-0.5 truncate">
                  {p.name}
                </h3>

                {/* Stars */}
                <div className="flex items-center gap-1 mt-1.5">
                  <div className="flex gap-px">
                    {[1,2,3,4,5].map((s) => (
                      <svg key={s} width="9" height="9" viewBox="0 0 24 24"
                        fill={s <= Math.round(p.rating) ? "#F59E0B" : "#E5E7EB"}>
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-stone-400 font-medium" style={{ fontSize: 9 }}>{p.rating} ({p.reviews})</span>
                </div>

                {/* Price + Add to cart */}
                <div className="flex items-center justify-between mt-2.5">
                  <span className="text-stone-900 font-extrabold text-base">
                    ${p.price % 1 === 0 ? p.price.toFixed(0) : p.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => toggleCart(p.id)}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center border-0 cursor-pointer transition-all duration-200 active:scale-90
                      ${cartItems.has(p.id)
                        ? "bg-green-500 shadow-lg shadow-green-200"
                        : "bg-stone-900 hover:bg-stone-700 shadow-md shadow-stone-300"
                      }`}
                  >
                    {cartItems.has(p.id) ? (
                      <svg width="13" height="13" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : (
                      <svg width="13" height="13" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-5xl mb-4">👕</span>
            <p className="text-stone-400 font-semibold text-sm">No items in this category yet</p>
          </div>
        )}
      </div>

     
    </div>
  );
}