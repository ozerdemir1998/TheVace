import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  sizes: string[];
}

interface CartItem extends Product {
  size: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (id: number, size: string) => void;
  updateQuantity: (id: number, size: string, delta: number) => void;
  totalPrice: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCart = async () => {
    const token = localStorage.getItem('vace_token');
    if (!token) return;

    try {
      const res = await fetch('http://localhost:3000/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const mappedCart = data.map((item: any) => ({
          ...item.product,
          cartItemId: item.id,
          size: item.size,
          quantity: item.quantity
        }));
        setCartItems(mappedCart);
      }
    } catch (e) {
      console.error('Failed to fetch cart', e);
    }
  };

  React.useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product: Product, size: string) => {
    const token = localStorage.getItem('vace_token');
    if (!token) {
      alert("Sepete ürün eklemek için lütfen giriş yapın.");
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId: product.id, quantity: 1, size })
      });
      if (res.ok) {
        fetchCart(); // Refresh cart from DB
      }
    } catch (e) {
      console.error('Add to cart failed', e);
    }
  };

  const removeFromCart = async (id: number, size: string) => {
    const token = localStorage.getItem('vace_token');
    const itemToRemove = cartItems.find(i => i.id === id && i.size === size);

    if (token && itemToRemove && (itemToRemove as any).cartItemId) {
      try {
        await fetch(`http://localhost:3000/api/cart/${(itemToRemove as any).cartItemId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchCart();
      } catch (e) {
        console.error('Remove from cart failed', e);
      }
    } else {
      // Fallback local remove
      setCartItems(prev => prev.filter(i => !(i.id === id && i.size === size)));
    }
  };

  const updateQuantity = async (id: number, size: string, delta: number) => {
    const token = localStorage.getItem('vace_token');
    if (!token) return;

    const item = cartItems.find(i => i.id === id && i.size === size);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);
    // Optimistic UI update
    setCartItems(prev => prev.map(i => i.id === id && i.size === size ? { ...i, quantity: newQuantity } : i));

    try {
      // The backend actually adds to the existing quantity on POST if it exists, but to set exact quantity we need a PUT/PATCH.
      // Since POST currently does `quantity + existing`, we send `delta` instead of `newQuantity`.
      await fetch('http://localhost:3000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId: id, quantity: delta, size })
      });
      fetchCart();
    } catch (e) {
      console.error('Update quantity failed', e);
    }
  };

  const totalPrice = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const totalItems = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalPrice, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};