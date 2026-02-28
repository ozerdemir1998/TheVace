import React, { useState } from 'react';
import { ArgentLoopInfiniteSlider, PROJECT_DATA } from '@/components/ui/argent-loop-infinite-slider';
import { ProductModal } from '@/components/ui/product-modal';
import { motion } from 'framer-motion';

const NewArrivals = () => {
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleItemClick = (index: number) => {
        const data = PROJECT_DATA[index];
        setSelectedProduct({
            id: index + 1,
            name: data.title,
            price: 1990,
            description: data.description,
            category: data.category,
            imageUrl: data.image,
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
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
            <ArgentLoopInfiniteSlider onItemClick={handleItemClick} />

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
            />
        </motion.div>
    );
};

export default NewArrivals;
