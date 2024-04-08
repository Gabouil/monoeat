import {createContext, useContext, useState, useEffect, ReactNode} from "react";

interface IThemeContext {
    cart: {
        id: string;
        name: string;
        price: number;
        image: string;
        quantity: number;
        date: string;
    }[]
    setCart: (data: { id: string; name: string; price: number; image: string; quantity: number, date:string }[]) => void;
}

const CartContext = createContext<IThemeContext | undefined>(undefined);

export const CartProvider = ({children}: { children: ReactNode }) => {
    const [cart, setCart] = useState<IThemeContext['cart']>([]);

    useEffect(() => {
        const cartFromLocalStorage = localStorage.getItem('cart');
        if (cartFromLocalStorage) {
            setCart(JSON.parse(cartFromLocalStorage));
        }
    }, []);

    const updateCart = (newCart: IThemeContext['cart']) => {
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    }

    return (
        <CartContext.Provider value={{cart, setCart: updateCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): IThemeContext | undefined => useContext(CartContext);