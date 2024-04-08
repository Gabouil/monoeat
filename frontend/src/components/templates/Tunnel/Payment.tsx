import "./Tunnel.scss"
import Footer from "../../molecules/global/Footer/Footer.tsx";
import HeaderMenu from "../../molecules/menu/HeaderMenu/HeaderMenu.tsx";
import Notification from "../../atomes/Notification/Notification.tsx";
import {useNavigate} from "react-router-dom";
import {useCart} from "../../../context/CartContext.tsx";
import {useEffect, useState} from "react";
import useGetMenuByDate from "../../../services/hooks/useGetMenuByDate.tsx";
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
    const getMenu = useGetMenuByDate();
    const newDate = new Date();
    const day = newDate.getDay();
    const diff = newDate.getDate() - day + (day == 0 ? -6 : 1);
    newDate.setDate(diff)
    const date = newDate.toISOString().split('T')[0];

    const navigate = useNavigate();

    const [notification, setNotification] = useState<string[]>([]);
    const [notificationTitle, setNotificationTitle] = useState<string>("");

    const [openAccordionCart, setOpenAccordionCart] = useState<boolean>(false);
    const handleAccordionCartClick = () => {
        setOpenAccordionCart(!openAccordionCart);
    };

    const [openAccordionPayment, setOpenAccordionPayment] = useState<string | null>("Paiement par carte bancaire");
    const handleAccordionPaymentClick = (title: string) => {
        setOpenAccordionPayment(prevTitle => prevTitle === title ? null : title);
    };

    useEffect(() => {
        if (CartContext) {
            setCart(CartContext.cart);
        }
    }, [])

    useEffect(() => {
        if (cart.length > 0) {
            (async () => {
                let menu = await getMenu(date, 'all');
                menu= menu.recipes

                console.log("menu : ", menu);
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
                CartContext?.setCart(sortedCart);
                setCart(sortedCart);

                setNotificationTitle("Les plats suivants ne sont plus disponibles à la carte et ont étaient retirés de votre panier : ");
                setNotification(newCartDeleted.map(item => item.name));
            })()
        } else {
            navigate("/menu");
        }
    }, [])


    const handleSubmit = async () => {
        navigate("/confirmation")
    }
    return (
        <>
            <HeaderMenu section={"paiement"}/>

            <main className={"tunnel_page"}>
                <Notification
                    title={notificationTitle ? notificationTitle : "Notification"}
                    contents={notification}
                    setContent={setNotification}
                    type={'info'}
                />
                <div className={"tunnel_page__content"}>
                    <div className={"tunnel_page__content__item"}>
                        <h1>Résumé de la commande</h1>
                        <Accordion
                            Title={"Récapitulatif de la commande"}
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