import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ZoomParallax } from '@/components/ui/zoom-parallax';
import { CardsParallax } from '@/components/ui/scroll-cards';
import { SocialIcons } from '@/components/ui/social-icons';
import { AnimatedFooterText } from '@/components/ui/animated-footer-text';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { ProductModal } from '@/components/ui/product-modal';
import { InteractiveStarfield } from '@/components/ui/starfield';
import { GooeyText } from '@/components/ui/gooey-text-morphing';
import NumberFlow from '@number-flow/react';
import { Button } from '@/components/ui/button';



const ProductList = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 10]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  const [parallaxImages, setParallaxImages] = useState<any[]>([]);
  const [categoryCards, setCategoryCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();

        // Map backend products to ZoomParallax format
        const mappedData = data.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          description: p.description,
          category: p.category?.toUpperCase() || 'CORE',
          src: p.imageUrl,
          alt: p.name,
          sizes: p.sizes || ['S', 'M', 'L', 'XL'] // Defaulting sizes if missing in DB
        }));

        setParallaxImages(mappedData);

        const getHeroImage = (cat: string, fallbackId: number) => {
          const match = data.find((p: any) => p.category?.toLowerCase() === cat.toLowerCase());
          return match ? match.imageUrl : `https://raw.githubusercontent.com/ozerdemir1998/TheVace/main/imagesToPushGithub/${fallbackId}.png`;
        };

        setCategoryCards([
          {
            title: "TİŞÖRT",
            description: "CORE PERFORMANCE COLLECTION",
            tag: "tisort",
            src: getHeroImage('Tişört', 1),
            link: "/category/tisort",
            color: "black",
            textColor: "white",
          },
          {
            title: "HOODIE",
            description: "INDUSTRIAL HEAVYWEIGHT SERIES",
            src: getHeroImage('Hoodie', 7),
            tag: "hoodie",
            link: "/category/hoodie",
            color: "black",
            textColor: "white",
          },
          {
            title: "BOTTOMS",
            description: "KINETIC RANGE OF OPS",
            src: getHeroImage('Eşofman Altı', 15),
            tag: "esofman-alti",
            link: "/category/esofman-alti",
            color: "black",
            textColor: "white",
          },
          {
            title: "SWEAT",
            description: "URBAN EVOLUTION WEAR",
            src: getHeroImage('Kapşonlu Sweat', 21),
            tag: "kapsonlu-sweat",
            link: "/category/kapsonlu-sweat",
            color: "black",
            textColor: "white",
          },
        ]);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleImageClick = (index: number) => {
    if (!parallaxImages[index]) return;
    const productData = parallaxImages[index];
    setSelectedProduct({
      id: productData.id,
      name: productData.name,
      price: productData.price,
      description: productData.description,
      category: productData.category,
      imageUrl: productData.src,
      sizes: productData.sizes
    });
    setIsModalOpen(true);
  };

  return (
    <div className="w-full bg-black">
      {/* 1. Hero Landing with Pinned Zoom */}
      <section ref={heroRef} className="relative h-[200vh] w-full bg-black">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black"
        >
          <div className="relative z-10 w-full flex items-center justify-center">
            <GooeyText
              texts={["THE VACE", "PERFORMANCE", "EVOLUTION", "STYLE"]}
              className="font-black"
            />
          </div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
            <p className="text-white/40 text-[10px] uppercase tracking-[1em] font-black animate-bounce whitespace-nowrap">
              Scroll to Explore
            </p>
          </div>
        </motion.div>
      </section>

      {/* 2. Headline Section */}
      <section className="relative bg-black pt-40 pb-20">
        <div className="text-center px-4">
          <h2 className="text-4xl md:text-[8rem] font-black tracking-tighter italic uppercase outline-text leading-none">POTENTIAL</h2>
        </div>
      </section>

      {/* 3. Zoom Parallax Integration - PURE STICKY */}
      <section className="relative bg-black">
        <InteractiveStarfield />
        <ZoomParallax images={parallaxImages} onImageClick={handleImageClick} />
      </section>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />

      {/* 4. Animated Categories - SCROLL CARDS PARALLAX */}
      <section className="relative w-full pt-20 pb-0 bg-black" id="shop">
        <InteractiveStarfield />

        {/* Section Headline - Static Flow */}
        <div className="relative w-full text-center z-10 px-4 mt-20 mb-8 pointer-events-none">
          <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase drop-shadow-xl">
            KATEGORİLER
          </h2>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.5em] font-black mt-2 drop-shadow-lg">
            The Vace Equipment
          </p>
        </div>

        {/* Keeping a smaller negative margin to pull card from h-screen dead center, creating a visible gap below title */}
        <div className="relative w-full -mt-[5vh] md:-mt-[10vh]">

          {categoryCards.length > 0 && <CardsParallax items={categoryCards} />}
        </div>
      </section>

      <footer className="w-full py-40 px-6 flex flex-col items-center gap-20 bg-black relative z-10 border-t border-white/[0.02]">
        {/* 1. Logo & Title (Top) */}
        <div className="flex flex-col items-center gap-6">
          <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center mb-[-1rem]">
            <img
              src="/assets/images/gorilla-logo.png"
              alt="The Vace Logo"
              className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] animate-holo-wobble"
            />
          </div>
          <div className="text-center">
            <h2 className="text-6xl font-black italic tracking-tighter mb-4">THE VACE</h2>
            <p className="text-white/10 text-[10px] font-black uppercase tracking-[0.6em] italic mt-6">Evolutionary Industrial Performance</p>
          </div>
        </div>

        {/* 2. Animated Footer Text (Vertical Stack) */}
        <div className="w-full max-w-4xl mt-16">
          <AnimatedFooterText />
        </div>

        {/* 3. Social Section (Stacked Circular style) */}
        <div className="flex flex-col items-center mt-8">
          <div className="flex gap-6">
            <SocialIcons />
          </div>
        </div>


        {/* 5. Copyright */}
        <div className="text-center space-y-2 opacity-20">
          <p className="text-[10px] font-black uppercase tracking-[0.4em]">
            © 2026 THE VACE PERFORMANCE INC.
          </p>
          <p className="text-[8px] font-black uppercase tracking-[0.8em]">All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductList;