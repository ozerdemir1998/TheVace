import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
    CardHoverReveal,
    CardHoverRevealMain,
    CardHoverRevealContent
} from '@/components/ui/reveal-on-hover';

interface CategoryItemProps {
    id: string;
    title: string;
    imageUrl: string;
    className?: string;
    imageClassName?: string;
}

const CategoryItem = ({ id, title, imageUrl, className, imageClassName }: CategoryItemProps) => {
    const navigate = useNavigate();

    return (
        <CardHoverReveal
            className={cn("group relative flex flex-col items-end cursor-pointer rounded-none border border-white/5", className)}
            onClick={() => navigate(`/category/${id}`)}
        >
            <CardHoverRevealMain hoverScale={1.1} className={cn("relative overflow-hidden w-full aspect-[2/3] bg-neutral-900", imageClassName)}>
                <img
                    src={imageUrl}
                    alt={title}
                    className="size-full object-cover transition-transform duration-700 grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />
            </CardHoverRevealMain>

            <CardHoverRevealContent className="rounded-none bg-black/60 border border-white/10 text-white p-8">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-3">Feature Area</h3>
                        <div className="flex flex-wrap gap-2">
                            <div className="bg-white/5 border border-white/10 px-3 py-1 scale-90 sm:scale-100">
                                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest leading-none">
                                    {id === 'tisort' ? 'Athletics' : id === 'hoodie' ? 'Industrial' : id === 'esofman-alti' ? 'Movement' : 'Technical'}
                                </p>
                            </div>
                            <div className="bg-white/5 border border-white/10 px-3 py-1 scale-90 sm:scale-100">
                                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest leading-none">
                                    {id === 'tisort' ? 'Performance' : id === 'hoodie' ? 'Thermal' : id === 'esofman-alti' ? 'Lifestyle' : 'Utility'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-3">Category</h3>
                        <p className="text-2xl sm:text-3xl font-black italic tracking-tighter uppercase leading-none">
                            {title}
                        </p>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-3">Profile</h3>
                        <p className="text-xs font-medium text-white/50 leading-relaxed max-w-[200px]">
                            {id === 'tisort' && 'Breathable panel structure for athletic peak performance.'}
                            {id === 'hoodie' && 'Oversized comfort meets industrial utility.'}
                            {id === 'esofman-alti' && 'Engineered for movement and superior street style.'}
                            {id === 'kapsonlu-sweat' && 'Adaptive performance for urban exploration.'}
                            {id === 'mont' && 'Heavyweight protection for extreme conditions.'}
                            {id === 'aksesuar' && 'High-grade technical additions for your kit.'}
                        </p>
                    </div>

                    <div className="pt-4 flex items-center justify-between text-white/20 group-hover:text-white transition-colors">
                        <span className="text-[10px] font-black uppercase tracking-widest">Explore Collection</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </CardHoverRevealContent>
        </CardHoverReveal>
    );
};

interface CategoryShowcaseProps {
    categories: {
        id: string;
        title: string;
        imageUrl: string;
    }[];
    className?: string;
}

export const CategoryShowcase = ({ categories, className }: CategoryShowcaseProps) => {
    if (!categories || categories.length === 0) return null;

    // Build rows dynamically based on 1-2nd pattern
    const rows: { type: 'single' | 'dual'; items: typeof categories }[] = [];
    let i = 0;
    let isSingle = true;

    while (i < categories.length) {
        if (isSingle) {
            rows.push({ type: 'single', items: [categories[i]] });
            i += 1;
        } else {
            const pair = categories.slice(i, i + 2);
            rows.push({ type: 'dual', items: pair });
            i += pair.length;
        }
        isSingle = !isSingle;
    }

    return (
        <div className={cn("w-full max-w-[1920px] mx-auto px-6 space-y-40 md:space-y-64", className)}>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="w-full">
                    {row.type === 'single' ? (
                        <div className="flex justify-center">
                            <CategoryItem
                                id={row.items[0].id}
                                title={row.items[0].title}
                                imageUrl={row.items[0].imageUrl}
                                // Restored massive cinematic width
                                className="w-full max-w-xl md:max-w-4xl"
                                imageClassName="aspect-[2/3]"
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-40 w-full mx-auto">
                            {row.items.map((cat) => (
                                <CategoryItem
                                    key={cat.id}
                                    id={cat.id}
                                    title={cat.title}
                                    imageUrl={cat.imageUrl}
                                    // NO COMPRESSION: items match the massive max-w of single-row items
                                    className="w-full max-w-xl md:max-w-4xl"
                                    imageClassName="aspect-[2/3]"
                                />
                            ))}
                        </div>
                    )
                    }
                </div>
            ))}
        </div>
    );
};
