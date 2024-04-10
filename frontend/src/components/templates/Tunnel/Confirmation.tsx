import "./Tunnel.scss"
import HeaderMenu from "../../molecules/menu/HeaderMenu/HeaderMenu.tsx";
import Footer from "../../molecules/global/Footer/Footer.tsx";
import useGetLastOrderByUserId from "../../../services/hooks/useGetLastOrderByUserId.tsx";
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
    deliveryInfo: Delivery[],
    billingInfo: Delivery[],
}
export default function Confirmation() {
    const LastOrderByUser = useGetLastOrderByUserId();
    const UserContext = useUser();
    const [order, setOrder] = useState<Order>(null);


    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fromPath = location.state?.from
        console.log("fromPath : ", fromPath);
        if (fromPath !== "/paiement" && fromPath !== "/confirmation") {
            navigate("/menu");
        }
    }, []);

    useEffect(() => {
        (async () => {
            const user = UserContext ? UserContext.user : null;
            if (user) {
                const lastOrder = await LastOrderByUser(user.userId);
                console.log("lastOrder : ", lastOrder);
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
                                {order.recipes.map((recipe, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "table__color--2" : "table__color--1"}>
                                        <td>{recipe.id.name}</td>
                                        <td>{recipe.quantity}</td>
                                        <td>{recipe.id.price} €</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
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