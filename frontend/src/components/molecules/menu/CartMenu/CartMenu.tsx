import "./CartMenu.scss";
import React, {useEffect, useState} from "react";
import {useCart} from "../../../../context/CartContext.tsx";
import Button from "../../../atomes/buttons/Button/Button.tsx";
import {useUser} from "../../../../context/UserContext.tsx";

import {useNavigate} from 'react-router-dom';
import EmptyCart from "../../../../assets/empty_cart.tsx";
import CartMenuProduct from "../../../atomes/CartMenuProduct/CartMenuProduct.tsx";
import useGetMenuByDate from "../../../../services/hooks/useGetMenuByDate.tsx";
import Notification from "../../../atomes/Notification/Notification.tsx";

type Cart = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    date: string;
    category?: string;
}

type Props = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    date?: string
}
export default function CartMenu({setIsOpen, date}: Props) {
    const navigate = useNavigate();
    const userContext = useUser();
    if (!userContext) {
        throw new Error("UserContext is not initialized");
    }
    const getMenu = useGetMenuByDate();

    const [notification, setNotification] = useState<string[]>([]);
    const [notificationTitle, setNotificationTitle] = useState<string>("");


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

    const verifyCart = async () => {
        if (date && CartContext && cart.length > 0) {
            let menu = await getMenu(date, 'all');
            menu = menu.recipes;
            const newCart: Cart[] = [];
            const newCartDeleted: Cart[] = [];

            cart.forEach(item => {
                const menuItem = menu.find((recipe: { _id: string }) => recipe._id === item.id);
                if (menuItem) {
                    newCart.push({
                        id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        image: menuItem.image,
                        quantity: item.quantity,
                        date: item.date,
                        category: menuItem.category
                    });
                } else if (menuItem === undefined) {
                    newCartDeleted.push(item);
                }
            });

            const categoryOrder = ["plats", "entrées", "desserts", "autres"];
            const sortedCart: Cart[] = newCart.sort((a: Cart, b: Cart) => {
                const categoryComparison = categoryOrder.indexOf(a.category || "") - categoryOrder.indexOf(b.category || "");
                if (categoryComparison !== 0) return categoryComparison;
                return a.name.localeCompare(b.name);
            });


            CartContext.setCart(sortedCart);
            setCart(sortedCart);

            if (newCartDeleted.length > 0) {
                setNotificationTitle("Les plats suivants ne sont plus disponibles à la carte et ont étaient retirés de votre panier : ");
                setNotification(newCartDeleted.map(item => item.name));
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    const deleteProduct = (product: Cart) => {
        if (CartContext) {
            const newCart = [...CartContext.cart];
            const existingProductIndex = newCart.findIndex(item => item.id === product.id);
            if (existingProductIndex >= 0) {
                newCart.splice(existingProductIndex, 1);
            }
            console.log("newCart : ", newCart);
            CartContext.setCart(newCart);
            setCart(newCart);
        }
    }

    const validateCart = async () => {
        const isValidated: boolean = await verifyCart();
        if (isValidated) {
            if (userContext.user) {
                navigate("/information", { state: { from: "/menu" } });

            } else {
                navigate("/connexion?redirect=menu");
            }
        }
    }
    return (
        <>
            <div
                className="cart_menu"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                }}
            >
                <Notification
                    title={notificationTitle ? notificationTitle : "Notification"}
                    contents={notification}
                    setContent={setNotification}
                    type={'info'}
                />
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
                        {cart.map((product: Cart) => {
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
        </>
    )
}
