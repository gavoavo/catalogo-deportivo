import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag, X, MessageCircle, Ruler } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    name: "FC Barcelona Local 24/25",
    category: "Futbol",
    prices: { fan: 30, player: 40, longSleeve: 40 },
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Real Madrid Local 24/25",
    category: "Futbol",
    prices: { fan: 30, player: 40, longSleeve: 40 },
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Red Bull Racing Polo 2024",
    category: "F1",
    prices: { standard: 40 },
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Mercedes-AMG Petronas Tee",
    category: "F1",
    prices: { standard: 40 },
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80",
  }
];

const SIZE_GUIDE = {
  Futbol: [
    { size: 'S', chest: '88-96 cm', length: '70 cm' },
    { size: 'M', chest: '96-104 cm', length: '72 cm' },
    { size: 'L', chest: '104-112 cm', length: '75 cm' },
    { size: 'XL', chest: '112-124 cm', length: '77 cm' },
  ],
  F1: [
    { size: 'S', chest: '94-102 cm', length: '72 cm (Holgado)' },
    { size: 'M', chest: '102-110 cm', length: '74 cm (Holgado)' },
    { size: 'L', chest: '110-118 cm', length: '77 cm (Holgado)' },
    { size: 'XL', chest: '118-128 cm', length: '79 cm (Holgado)' },
  ]
};

export default function App() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [version, setVersion] = useState('fan');
  const [size, setSize] = useState('M');
  const [customName, setCustomName] = useState('');
  const [customNumber, setCustomNumber] = useState('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // PON AQUÍ TU NÚMERO DE WHATSAPP CON CÓDIGO DE PAÍS (503):
  const WHATSAPP_PHONE = "50370000000"; 

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat = category === 'All' || p.category === category;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [category, search]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setVersion(product.category === 'F1' ? 'standard' : 'fan');
    setSize('M');
    setCustomName('');
    setCustomNumber('');
    setShowSizeGuide(false);
  };

  const getPrice = () => {
    if (!selectedProduct) return 0;
    if (selectedProduct.category === 'F1') return selectedProduct.prices.standard;
    return selectedProduct.prices[version] || 30;
  };

  const generateWhatsAppUrl = () => {
    const price = getPrice();
    const versionName = selectedProduct.category === 'F1' 
      ? 'F1 (Relaxed Fit)' 
      : version === 'fan' ? 'Fan Version' : version === 'player' ? 'Player Version' : 'Manga Larga';
    
    let text = `¡Hola! Quiero hacer un pedido:\n\n` +
      `*Producto:* ${selectedProduct.name}\n` +
      `*Versión:* ${versionName}\n` +
      `*Talla:* ${size}\n` +
      `*Total:* $${price}.00\n`;

    if (customName.trim() || customNumber.trim()) {
      text += `*Personalización:* ${customName.toUpperCase() || 'Sin nombre'} #${customNumber || 'S/N'}\n`;
    }
    
    text += `\n¿Tienen disponible para coordinar la entrega?`;
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-12">
      <header className="sticky top-0 z-40 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-emerald-400 w-5 h-5" />
            <h1 className="font-bold text-base tracking-wide uppercase">Catálogo SV</h1>
          </div>
          <span className="text-xs bg-zinc-800 px-2.5 py-1 rounded-full text-zinc-400">El Salvador</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-6">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 text-zinc-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Buscar camiseta..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            {['All', 'Futbol', 'F1'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg text-xs font-semibold ${
                  category === cat ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                }`}
              >
                {cat === 'All' ? 'Todos' : cat === 'Futbol' ? 'Fútbol' : 'Fórmula 1'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {filteredProducts.map((item) => (
            <div 
              key={item.id} 
              onClick={() => openModal(item)}
              className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:border-zinc-700 transition"
            >
              <img src={item.image} alt={item.name} className="w-full aspect-square object-cover" />
              <div className="p-3">
                <span className="text-[10px] font-bold text-emerald-400 uppercase">{item.category}</span>
                <h2 className="font-semibold text-xs truncate text-white">{item.name}</h2>
                <p className="text-zinc-400 text-xs mt-1">
                  Desde <span className="text-white font-bold">${item.category === 'F1' ? item.prices.standard : item.prices.fan}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-2xl p-5 relative">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-zinc-400">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-base font-bold pr-6">{selectedProduct.name}</h2>
            <p className="text-xs text-zinc-400 mb-4">{selectedProduct.category}</p>

            {selectedProduct.category === 'Futbol' && (
              <div className="mb-3">
                <label className="text-xs text-zinc-300 block mb-1.5 font-medium">Versión:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'fan', label: 'Fan ($30)' },
                    { id: 'player', label: 'Player ($40)' },
                    { id: 'longSleeve', label: 'Manga L. ($40)' }
                  ].map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setVersion(v.id)}
                      className={`text-xs py-1.5 rounded border font-medium ${
                        version === v.id ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-zinc-800 text-zinc-400'
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-3">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs text-zinc-300 font-medium">Talla:</label>
                <button 
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-xs text-emerald-400 flex items-center gap-1"
                >
                  <Ruler className="w-3 h-3" /> Medidas
                </button>
              </div>

              <div className="flex gap-2">
                {['S', 'M', 'L', 'XL'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded border ${
                      size === s ? 'border-emerald-500 bg-emerald-500 text-zinc-950' : 'border-zinc-800 text-zinc-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {showSizeGuide && (
                <div className="mt-2 bg-zinc-950 p-2.5 rounded border border-zinc-800 text-xs">
                  <p className="font-bold text-zinc-300 mb-1">Guía ({selectedProduct.category}):</p>
                  {SIZE_GUIDE[selectedProduct.category].map((g) => (
                    <div key={g.size} className="flex justify-between py-0.5 text-zinc-400 border-b border-zinc-900">
                      <span className="font-bold text-zinc-200">{g.size}</span>
                      <span>{g.chest}</span>
                      <span>{g.length}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-4 bg-zinc-950 p-2.5 rounded border border-zinc-800">
              <label className="text-xs text-zinc-400 block mb-1.5">Estampado (Opcional):</label>
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="text" 
                  placeholder="Nombre"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white"
                />
                <input 
                  type="number" 
                  placeholder="Número"
                  value={customNumber}
                  onChange={(e) => setCustomNumber(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-white"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block">Total</span>
                <span className="text-lg font-black text-white">${getPrice()}.00</span>
              </div>
              <a 
                href={generateWhatsAppUrl()} 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 text-xs transition"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> Pedir WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
