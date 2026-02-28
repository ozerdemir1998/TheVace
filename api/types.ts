export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    sizes: string[];
}

export interface Category {
    id: number;
    name: string;
}
