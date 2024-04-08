import "./CartMenu.scss";
import React, {useEffect, useState} from "react";
import {useCart} from "../../../../context/CartContext.tsx";
import Button from "../../../atomes/buttons/Button/Button.tsx";
import {useUser} from "../../../../context/UserContext.tsx";

import {useNavigate} from 'react-router-dom';
import EmptyCart from "../../../../assets/empty_cart.tsx";
import CartMenuProduct from "../../../atomes/CartMenuProduct/CartMenuProduct.tsx";

type Cart = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    date:string;
}
export default function CartMenu({setIsOpen}: { setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const navigate = useNavigate();
    const userContext = useUser();
    if (!userContext) {
        throw new Error("UserContext is not initialized");
    }

    const CartContext = useCart()
    const [cart, setCart] = useState<Cart[]>([]);
    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, []);

    useEffect(() => {
        if (CartContext) {
            let cart = CartContext.cart;
            if (cart.length > 0) {
                if (cart[0].date < new Date().toISOString().split('T')[0]) {
                    cart = [];
                    CartContext.setCart(cart);
                } else {
                    setCart(CartContext.cart);
                }
            }
        }
    }, [CartContext])

    const deleteProduct = (product: Cart) => {
        if (CartContext) {
            const newCart = [...CartContext.cart];
            const existingProductIndex = newCart.findIndex(item => item.id === product.id);
            if (existingProductIndex >= 0) {
                newCart.splice(existingProductIndex, 1);
            }
            CartContext.setCart(newCart);
            setCart(newCart);
        }
    }

    const validateCart = () => {
        if (userContext.user) {
            navigate("/information");
        } else {
            navigate("/connexion?redirect=menu");
        }
    }
    return (
        <div
            className="cart_menu"
            onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
            }}
        >
            <div className={"cart_menu__container"}
                 onClick={e => e.stopPropagation()}
            >
                <header className="cart_menu__container__header">
                    <div>
                        <h2>Votre panier</h2>
                        <button onClick={() => setIsOpen(false)}>
                            X
                        </button>
                    </div>
                </header>
                <div className="cart_menu__container__content">
                    {cart.length === 0 && (
                        <p className={"cart_menu__container__content__empty"}>
                            <EmptyCart/>
                            Votre panier est vide
                        </p>
                    )}
                    {cart.map((product:Cart) => {
                        return (
                            <CartMenuProduct
                                product={product}
                                deleteProduct={deleteProduct}
                            />
                        )
                    })}
                </div>
                {window.location.pathname == "/menu" && (
                    <footer className="cart_menu__container__footer">
                        <div>
                            <Button
                                label={"Valider le panier"}
                                onclick={validateCart}
                                disabled={cart.length === 0}
                            />
                        </div>
                    </footer>
                )}
            </div>
        </div>
    )
}
