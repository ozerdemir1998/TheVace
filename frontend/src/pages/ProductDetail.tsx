import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Check, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShinyButton } from '@/components/ui/shiny-button';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('http://localhost:3000/api/products/' + id)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  }, [id]);

  if (loading) return <div className="container min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  if (!product) return <div className="container min-h-screen flex items-center justify-center">Ürün bulunamadı.</div>;

  return (
    <div className="container animate-fade py-32">
      <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-12">
        <ArrowLeft size={16} /> Mağazaya Geri Dön
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="rounded-3xl overflow-hidden border border-white/5 bg-muted aspect-square">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4">{product.category}</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">{product.name}</h1>
          <div className="text-4xl font-bold mb-8">{product.price.toLocaleString('tr-TR')} TL</div>

          <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-12">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Beden Seçin</h3>
            <div className="flex flex-wrap gap-4">
              {product.sizes.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-16 h-16 rounded-2xl border-2 font-bold transition-all flex items-center justify-center ${selectedSize === size
                    ? "border-white bg-white text-black"
                    : "border-white/10 text-white/50 hover:border-white/30"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <ShinyButton
            className="w-full px-8 py-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] italic rounded-lg"
            disabled={!selectedSize}
            onClick={() => addToCart(product, selectedSize)}
          >
            {selectedSize ? 'SEPETE EKLE' : 'BEDEN SEÇİN'}
          </ShinyButton>

          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/5 pt-12">
            <div className="flex items-center gap-4 text-muted-foreground">
              <Truck className="text-blue-500" />
              <span className="text-xs font-bold uppercase tracking-tighter">Hızlı Gönderim</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <ShieldCheck className="text-blue-500" />
              <span className="text-xs font-bold uppercase tracking-tighter">Güvenli Ödeme</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;