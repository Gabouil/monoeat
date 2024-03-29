import {createContext, useContext, useState, useEffect, ReactNode} from "react";

interface IThemeContext {
    cart: {
        id: string;
        quantity: number;
    }[]
    setCart: (data: { id: string; quantity: number; }[]) => void;
}

const CartContext = createContext<IThemeContext | undefined>(undefined);

export const CartProvider = ({children}: { children: ReactNode }) => {
    const [cart, setCart] = useState<IThemeContext['cart']>(() => {
        const localData = localStorage.getItem('cart');
        return localData ? JSON.parse(localData) : [];
    });
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): IThemeContext | undefined => useContext(CartContext);