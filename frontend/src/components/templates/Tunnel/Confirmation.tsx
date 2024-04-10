import "./Tunnel.scss"
import Footer from "../../molecules/global/Footer/Footer.tsx";
import useGetOrderByUserId from "../../../services/hooks/useGetOrderByUserId.tsx";
import {useUser} from "../../../context/UserContext.tsx";
import {useEffect, useState} from "react";
import Header from "../../molecules/global/Header/Header.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import Button from "../../atomes/buttons/Button/Button.tsx";

type Recipe = {
    _id: string;
    name: string;
    description: string;
    category: string;
    images: string;
    ingredients: [
        {
            ingredient: string;
            quantity: string;
        }
    ];
    difficulty: string;
    comments: [
        {
            user: string;
            comment: string;
        }
    ];
    score: [
        {
            user: string;
            score: number;
        }
    ];
    recipeSteps: [string];
    cookTime: {
        time: number;
        unit: string;
    };
    utensils: [string];
    price: number;
    nutritionalValues: {
        calories: number
        lipids: number,
        carbohydrates: number,
        proteins: number,
        sels: number,
    }
}

type Delivery = {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    company: string;
    country: string;
    address: string;
    address2: string;
    postalCode: string;
    city: string;
}

type Order = {
    _id: string;
    orderNumber: number;
    user: string;
    updatedAt: string;
    createdAt: string;
    totalPrice: number;
    status: string;
    recipes: { id: Recipe, quantity: number }[],
    deliveryInfo: Delivery,
    billingInfo: Delivery,
}
export default function Confirmation() {
    const LastOrderByUser = useGetOrderByUserId();
    const UserContext = useUser();
    const [order, setOrder] = useState<Order>();


    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fromPath = location.state?.from
        if (fromPath !== "/paiement" && fromPath !== "/confirmation") {
            navigate("/menu");
        }
    },[]);

    useEffect(() => {
        (async () => {
            const user = UserContext ? UserContext.user : null;
            if (user) {
                const lastOrder = await LastOrderByUser(user.userId);
                setOrder(lastOrder);
            }
        })()
    }, [UserContext]);

    return (
        <>
            <Header/>
            <main className={"tunnel_page"}>
                <div className={"tunnel_page__content"}>
                    {order && (
                        <div className={"tunnel_page__content__item"}>
                            <div>
                                <h1 className={"confirmation__title"}>Merci pour votre commande !</h1>
                                <p className={"confirmation__text"}>Votre commande a bien été prise en compte.</p>
                            </div>
                            <div>
                                <Button
                                    label={"Retour à l'accueil"}
                                    onclick={() => navigate("/")}
                                />
                            </div>
                            <div>
                                <p>Numéro de commande : {order.orderNumber}</p>
                                <p>Créé le
                                    : {new Date(order.createdAt).toLocaleDateString()} à {new Date(order.createdAt).toLocaleTimeString()}</p>
                                <p>Prix total : {order.totalPrice} €</p>
                            </div>
                            <table>
                                <thead>
                                <tr className={"table__color--1"}>
                                    <th>Recettes</th>
                                    <th>Quantité</th>
                                    <th>Prix</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className={"table__color--2"}>
                                    <td colSpan={2}>Prix de livraison</td>
                                    <td>5 €</td>
                                </tr>
                                {order.recipes.map((recipe, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "table__color--1" : "table__color--2"}>
                                        <td>{recipe.id.name}</td>
                                        <td>{recipe.quantity}</td>
                                        <td>{recipe.id.price} €</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className={"tunnel_page__content__item__delivery"}>
                                <table>
                                    <thead>
                                    <tr className={"table__color--1"}>
                                        <th colSpan={2}>Informations de facturation</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className={"table__color--2"}>
                                        <td>Prénom</td>
                                        <td>{order.billingInfo.firstname}</td>
                                    </tr>
                                    <tr className={"table__color--1"}>
                                        <td>Nom</td>
                                        <td>{order.billingInfo.lastname}</td>
                                    </tr>
                                    <tr className={"table__color--2"}>
                                        <td>Email</td>
                                        <td>{order.billingInfo.email}</td>
                                    </tr>
                                    <tr className={"table__color--1"}>
                                        <td>Téléphone</td>
                                        <td>{order.billingInfo.phone}</td>
                                    </tr>
                                    <tr className={"table__color--2"}>
                                        <td>Entreprise</td>
                                        <td>{order.billingInfo.company}</td>
                                    </tr>
                                    <tr className={"table__color--1"}>
                                        <td>Pays</td>
                                        <td>{order.billingInfo.country}</td>
                                    </tr>
                                    <tr className={"table__color--2"}>
                                        <td>Adresse</td>
                                        <td>{order.billingInfo.address}</td>
                                    </tr>
                                    <tr className={"table__color--1"}>
                                        <td>Adresse 2</td>
                                        <td>{order.billingInfo.address2}</td>
                                    </tr>
                                    <tr className={"table__color--2"}>
                                        <td>Code postal</td>
                                        <td>{order.billingInfo.postalCode}</td>
                                    </tr>
                                    <tr className={"table__color--1"}>
                                        <td>Ville</td>
                                        <td>{order.billingInfo.city}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <table>
                                    <thead>
                                    <tr className={"table__color--1"}>
                                        <th colSpan={2}>Informations de livraison</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className={"table__color--2"}>
                                        <td>Prénom</td>
                                        <td>{order.deliveryInfo.firstname}</td>
                                    </tr>
                                    <tr className={"table__color--1"}>
                                        <td>Nom</td>
                                        <td>{order.deliveryInfo.lastname}</td>
                                    </tr>
                                    <tr className={"table__color--2"}>
                                        <td>Email</td>
                                        <td>{order.deliveryInfo.email}</td>
                                    </tr>
                                    <tr className={"table__color--1"}>
                                        <td>Téléphone</td>
                                        <td>{order.deliveryInfo.phone}</td>
                                    </tr>
                                    <tr className={"table__color--2"}>
                                        <td>Entreprise</td>
                                        <td>{order.deliveryInfo.company}</td>
                                    </tr>
                                    <tr className={"table__color--1"}>
                                        <td>Pays</td>
                                        <td>{order.deliveryInfo.country}</td>
                                    </tr>
                                    <tr className={"table__color--2"}>
                                        <td>Adresse</td>
                                        <td>{order.deliveryInfo.address}</td>
                                    </tr>
                                    <tr className={"table__color--1"}>
                                        <td>Adresse 2</td>
                                        <td>{order.deliveryInfo.address2}</td>
                                    </tr>
                                    <tr className={"table__color--2"}>
                                        <td>Code postal</td>
                                        <td>{order.deliveryInfo.postalCode}</td>
                                    </tr>
                                    <tr className={"table__color--1"}>
                                        <td>Ville</td>
                                        <td>{order.deliveryInfo.city}</td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <Button
                                    label={"Retour à l'accueil"}
                                    onclick={() => navigate("/")}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer newsLetter/>
        </>
    )
}