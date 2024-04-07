import "./CartMenu.scss";
import React, {useEffect, useState} from "react";
import {useCart} from "../../../../context/CartContext.tsx";
import Button from "../../../atomes/buttons/Button/Button.tsx";
import {useUser} from "../../../../context/UserContext.tsx";

import {useNavigate} from 'react-router-dom';

type Cart = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
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
            setCart(CartContext.cart);
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
                    {cart.map((product) => {
                        return (
                            <div key={product.id} className="cart_menu__container__content__product">
                                <img src={product.image} alt={product.name}/>
                                <div className="cart_menu__container__content__product__info">
                                    <p className="cart_menu__container__content__product__info__name">{product.name}</p>
                                    <div>
                                        <div>
                                            <p className="cart_menu__container__content__product__info__price">{product.price}€</p>
                                            <p className="cart_menu__container__content__product__info__quantity">Quantité: {product.quantity}</p>
                                        </div>
                                        <Button
                                            label={"Supprimer"}
                                            onclick={() => deleteProduct(product)}
                                            color={"danger"}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {window.location.pathname == "/menu" && (
                    <footer className="cart_menu__container__footer">
                        <div>
                            <Button
                                label={"Valider le panier"}
                                onclick={validateCart}
                            />
                        </div>
                    </footer>
                )}
            </div>
        </div>
    )
}