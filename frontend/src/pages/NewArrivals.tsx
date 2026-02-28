import React, { useState, useEffect } from 'react';
import { ArgentLoopInfiniteSlider, ProjectData } from '@/components/ui/argent-loop-infinite-slider';
import { ProductModal } from '@/components/ui/product-modal';
import { motion } from 'framer-motion';

const NewArrivals = () => {
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [rawProducts, setRawProducts] = useState<any[]>([]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products');
                const data = await response.json();

                // Shuffle items for variety or just grab the latest
                const selectedList = data.slice(10, 20); // grab a portion to vary it from collection

                setRawProducts(selectedList);

                const formatted: ProjectData[] = selectedList.map((p: any) => ({
                    title: p.name,
                    image: p.imageUrl,
                    category: p.category || 'EXCLUSIVE',
                    year: '2026',
                    description: p.description
                }));
                setProjects(formatted);
            } catch (error) {
                console.error("Failed to fetch new arrivals", error);
            }
        };
        loadProducts();
    }, []);

    const handleItemClick = (index: number) => {
        if (!projects || projects.length === 0 || !rawProducts[index]) return;

        const data = rawProducts[index];
        setSelectedProduct({
            id: data.id,
            name: data.name,
            price: data.price,
            description: data.description,
            category: data.category,
            imageUrl: data.imageUrl,
            sizes: data.sizes || ['XS', 'S', 'M', 'L', 'XL'],
        });
        setIsModalOpen(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-screen bg-black overflow-hidden"
        >
            <ArgentLoopInfiniteSlider items={projects} onItemClick={handleItemClick} />

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
            />
        </motion.div>
    );
};

export default NewArrivals;
