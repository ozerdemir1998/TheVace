import { Product } from './types';

export const products: Product[] = [
    {
        id: 1,
        name: "Aero-Lite Performance Tee",
        description: "Son teknoloji nefes alan dokusuyla antrenmanlarında maksimum performans sağlar. Terletmeyen özel kumaş teknolojisi.",
        price: 449.90,
        category: "Tişört",
        imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 2,
        name: "Vace Midnight Tech Hoodie",
        description: "Gece antrenmanları ve günlük şıklık için tasarlandı. Su itici özelliği ve 360 derece esnek yapısı ile hareket özgürlüğü.",
        price: 899.90,
        category: "Kapşonlu Sweat",
        imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
        sizes: ["M", "L", "XL"]
    },
    {
        id: 3,
        name: "Nordic Winter Base Layer",
        description: "Soğuk havalarda vücut ısısını koruyan termal teknoloji. Dikişsiz yapısı sayesinde sürtünmeyi önler.",
        price: 529.90,
        category: "Uzun Kollu Tişört",
        imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
        sizes: ["S", "M", "L"]
    },
    {
        id: 4,
        name: "Elements Graphic Jersey",
        description: "Sınırlı sayıda üretilen Elements koleksiyonu. Şehir stilini sporla buluşturan ikonik tasarım.",
        price: 479.90,
        category: "Tişört",
        imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
        sizes: ["S", "M", "L", "XL"]
    }
];