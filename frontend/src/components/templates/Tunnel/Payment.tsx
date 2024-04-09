import "./Tunnel.scss"
import Footer from "../../molecules/global/Footer/Footer.tsx";
import HeaderMenu from "../../molecules/menu/HeaderMenu/HeaderMenu.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useCart} from "../../../context/CartContext.tsx";
import {useEffect, useState} from "react";
import Accordion from "../../atomes/Accordion/Accordion.tsx";
import CartMenuProduct from "../../atomes/CartMenuProduct/CartMenuProduct.tsx";
import Button from "../../atomes/buttons/Button/Button.tsx";

type Cart = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    date: string;
    category?: string;
}

export default function Payment() {
    const CartContext = useCart()
    const [cart, setCart] = useState<Cart[]>(CartContext ? CartContext.cart : []);
    const newDate = new Date();
    const day = newDate.getDay();
    const diff = newDate.getDate() - day + (day == 0 ? -6 : 1);
    newDate.setDate(diff)

    const [openAccordionCart, setOpenAccordionCart] = useState<boolean>(false);
    const handleAccordionCartClick = () => {
        setOpenAccordionCart(!openAccordionCart);
    };

    const [openAccordionPayment, setOpenAccordionPayment] = useState<string | null>("Paiement par carte bancaire");
    const handleAccordionPaymentClick = (title: string) => {
        setOpenAccordionPayment(title);
    };

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fromPath = location.state?.from
        console.log("fromPath : ", fromPath);
        if (fromPath !== "/information" && fromPath !== "/paiement") {
            navigate("/menu");
        }
    }, []);

    useEffect(() => {
        if (CartContext && CartContext.cart && CartContext.cart.length > 0) {
            setCart(CartContext.cart);
        }
    }, [CartContext])


    const handleSubmit = async () => {
        // setCart([]);
        // CartContext?.setCart([]);
        navigate("/confirmation")
    }
    return (
        <>
            <HeaderMenu section={"paiement"}/>

            <main className={"tunnel_page"}>
                <div className={"tunnel_page__content"}>
                    <div className={"tunnel_page__content__item"}>
                        <h1>Résumé de la commande</h1>
                        <Accordion
                            Title={"Détail de la commande"}
                            Content={cart.map(item => {
                                return (
                                    <CartMenuProduct
                                        product={item}
                                    />
                                )
                            })}
                            isOpen={openAccordionCart}
                            onHeaderClick={handleAccordionCartClick}
                        />
                        <div className={"tunnel_page__content__item__total"}>
                            <div>
                                <p>Prix total :</p>
                                <p>{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)} €</p>
                            </div>
                            <div>
                                <p>Prix de livraison :</p>
                                <p>5 €</p>
                            </div>
                            <div>
                                <p>Prix total :</p>
                                <p>{cart.reduce((acc, item) => acc + item.price * item.quantity, 0) + 5} €</p>
                            </div>
                        </div>
                    </div>
                    <div className={"tunnel_page__content__item"}>
                        <h1>Mode de paiement</h1>
                        <Accordion
                            Title={"Paiement par carte bancaire"}
                            Content={"Paiement sécurisé par carte bancaire"}
                            isOpen={openAccordionPayment === "Paiement par carte bancaire"}
                            onHeaderClick={handleAccordionPaymentClick}
                            type={"radio"}
                        />
                        <Accordion
                            Title={"Paiement par Stripe"}
                            Content={"Paiement sécurisé par Stripe"}
                            isOpen={openAccordionPayment === "Paiement par Stripe"}
                            onHeaderClick={handleAccordionPaymentClick}
                            type={"radio"}
                        />
                    </div>
                    <Button
                        label={"Valider la commande"}
                        onclick={handleSubmit}
                    />
                </div>
            </main>
            <Footer newsLetter/>
        </>
    )
}