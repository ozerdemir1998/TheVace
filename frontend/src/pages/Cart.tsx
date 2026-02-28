import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShinyButton } from '@/components/ui/shiny-button';
import { Trash2, Minus, Plus, ShoppingBag, Check, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { InteractiveStarfield } from '@/components/ui/starfield';
import NumberFlow from '@number-flow/react';
import { motion } from 'framer-motion';
import HighlightCard from '@/components/ui/highlight-card';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cartItems.length === 0) return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center text-center px-4">
      <InteractiveStarfield />

      <div className="relative z-10 flex flex-col items-center gap-12">
        <HighlightCard
          title="SEPETİNİZ BOŞ"
          className="max-w-4xl"
          description={[
            "Performansınızı zirveye taşıyacak",
            "parçaları hemen keşfedin.",
            "Stilinizi Vace ile tamamlayın."
          ]}
          icon={<ShoppingBag size={32} className="text-white" />}
        />

        <Link to="/">
          <ShinyButton className="rounded-full px-16 py-5 font-black uppercase tracking-widest">
            ALIŞVERİŞE BAŞLA
          </ShinyButton>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="relative w-full min-h-screen bg-black flex justify-center pb-40">
      <InteractiveStarfield />

      <div className="relative z-10 container max-w-7xl mx-auto px-4 animate-fade pt-40">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-[10rem] font-black tracking-tighter mb-24 text-center italic uppercase outline-text leading-none"
        >
          SEPETİM
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Cart Items Stack - LEFT SIDE (lg:8) */}
          <div className="flex flex-col gap-6 lg:col-span-8">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id + item.size}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer transform transition-all duration-500 hover:scale-[1.03] hover:-rotate-1 relative overflow-hidden rounded-none border border-white/10 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-2xl backdrop-blur-xl hover:border-white/25 hover:shadow-white/5 sm:h-[320px] w-full"
              >
                {/* Highlight Background Effects */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-3xl opacity-20 group-hover:opacity-40 transform group-hover:scale-110 transition-all duration-700 animate-bounce"></div>
                  <div className="absolute top-5 left-1/4 w-12 h-12 rounded-full bg-white/5 blur-xl animate-ping opacity-20"></div>
                  <div className="absolute bottom-10 right-1/4 w-8 h-8 rounded-full bg-white/5 blur-lg animate-ping opacity-20"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                  {/* Corners - Sharp Style */}
                  <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Standardized Layout - Bleeding Image Layout (Sharp Edges) */}
                <div className="relative z-10 flex flex-col sm:flex-row items-stretch h-full overflow-hidden">
                  {/* Fixed Aspect Image - Sharp */}
                  <div className="relative w-full sm:w-64 lg:w-72 h-64 sm:h-full shrink-0 overflow-hidden border-b sm:border-b-0 sm:border-r border-white/5 shadow-2xl">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 pointer-events-none" />
                  </div>

                  {/* Compact Info Section */}
                  <div className="flex-1 flex flex-col justify-center p-8 sm:p-10 sm:pl-10 h-full relative">
                    {/* Floating Delete Button */}
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="absolute top-6 right-6 z-[60] p-2 text-white/10 hover:text-red-500 hover:bg-red-500/10 transition-all border border-white/5 hover:border-red-500/20"
                    >
                      <Trash2 size={16} />
                    </button>

                    <span className="text-white/20 font-black uppercase tracking-[0.4em] text-[10px] mb-2">{item.category}</span>
                    <h3 className="text-lg sm:text-xl font-black tracking-tighter uppercase italic leading-tight max-w-[320px] truncate">{item.name}</h3>
                    <p className="text-white/40 font-black uppercase text-[9px] tracking-[0.2em] mt-3 bg-white/5 px-3 py-1 border border-white/5 w-fit">Beden: {item.size}</p>

                    <div className="mt-6 flex flex-col gap-4">
                      <div className="text-2xl sm:text-3xl font-black flex items-baseline gap-2">
                        <NumberFlow
                          value={item.price}
                          format={{ style: 'currency', currency: 'TRY', minimumFractionDigits: 0 }}
                          className="text-white font-mono"
                        />
                        <span className="text-[10px] text-white/20 font-black tracking-widest uppercase">/ ADET</span>
                      </div>

                      {/* Quantity Controls - Moved Under Price */}
                      <div className="flex items-center gap-3 bg-black/40 p-1 border border-white/5 w-fit">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, -1)}
                          className="p-1.5 hover:bg-white hover:text-black transition-all duration-300"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="font-black text-sm w-4 text-center tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, 1)}
                          className="p-1.5 hover:bg-white hover:text-black transition-all duration-300"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* New Pricing-Style Summary Card - RIGHT SIDE (lg:4) STICKY */}
          <div className="lg:col-span-4 sticky top-40">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full p-8 sm:p-10 rounded-[2.5rem] relative group border-2 border-white/10 shadow-2xl min-h-[480px] flex flex-col justify-center bg-black/40 backdrop-blur-3xl overflow-visible"
            >
              {/* Background Effects */}
              <div className="absolute inset-0 bg-white/[0.02] z-0 pointer-events-none rounded-[2.5rem]" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent z-0 opacity-50 pointer-events-none rounded-[2.5rem]" />

              {/* Most Popular style badge for "Premium Experience" */}
              <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20">
                <div className="bg-white py-2 px-6 rounded-full flex items-center gap-2 shadow-2xl border border-white/20">
                  <ShieldCheck className="text-black h-4 w-4" />
                  <span className="text-black text-[10px] font-black uppercase tracking-widest">
                    GÜVENLİ ÖDEME
                  </span>
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-center py-4">
                <h2 className="text-xl md:text-2xl font-black tracking-tighter mb-8 italic uppercase text-center outline-text">SİPARİŞ ÖZETİ</h2>

                {/* Digital Receipt / Fiş Details */}
                <div className="w-full max-w-[280px] mb-8 px-4 space-y-2">
                  <div className="flex items-center gap-2 mb-4 opacity-50">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-[9px] font-black uppercase tracking-[0.4em]">DIGITAL RECEIPT</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  {cartItems.map((item) => (
                    <div key={item.id + item.size} className="flex justify-between items-start gap-4 text-[10px] font-mono uppercase tracking-wider leading-relaxed">
                      <span className="text-white/40 flex-1 truncate">{item.name} [{item.size}]</span>
                      <span className="text-white/60 shrink-0">x{item.quantity}</span>
                    </div>
                  ))}
                  <div className="h-px w-full bg-white/10 mt-4 border-dashed border-t" />
                </div>

                <div className="w-full max-w-[280px] space-y-3 mb-10 text-center">
                  <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-[0.3em] opacity-30 px-4">
                    <span>ARA TOPLAM</span>
                    <span>{totalPrice.toLocaleString('tr-TR')} TL</span>
                  </div>
                  <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-[0.3em] px-4">
                    <span className="opacity-30">KARGO</span>
                    <span className="text-blue-400">ÜCRETSİZ</span>
                  </div>

                  <div className="h-px bg-white/10 my-6 mx-auto w-1/3" />

                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] opacity-30">TOPLAM</span>
                    <div className="text-4xl md:text-5xl font-black tracking-tighter italic flex items-baseline leading-none">
                      <NumberFlow
                        value={totalPrice}
                        format={{ style: 'currency', currency: 'TRY', minimumFractionDigits: 0 }}
                      />
                    </div>
                  </div>
                </div>

                <ShinyButton className="w-full max-w-[240px] py-4 text-sm font-black rounded-[1.2rem] uppercase tracking-widest">
                  ALİŞVERİŞİ TAMAMLA
                  <Check className="ml-2 h-4 w-4 inline-block" />
                </ShinyButton>

                <div className="mt-10 flex flex-wrap justify-center items-center gap-x-8 gap-y-3 opacity-30 scale-90">
                  <div className="flex items-center gap-3">
                    <Truck size={12} />
                    <span className="text-[8px] font-black uppercase tracking-widest">Ücretsiz Kargo</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={12} />
                    <span className="text-[8px] font-black uppercase tracking-widest">14 Gün İade</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard size={12} />
                    <span className="text-[8px] font-black uppercase tracking-widest">Güvenli Kart</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;