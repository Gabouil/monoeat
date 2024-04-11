import "./Tunnel.scss"
import Footer from "../../molecules/global/Footer/Footer.tsx";
import useGetOrderByUserId from "../../../services/hooks/useGetOrderByUserId.tsx";
import {useUser} from "../../../context/UserContext.tsx";
import {useEffect, useState} from "react";
import Header from "../../molecules/global/Header/Header.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import Button from "../../atomes/buttons/Button/Button.tsx";
import OrderDetails from "../../organismes/OrderDetails/OrderDetails.tsx";

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


type User = {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    isAdmin: boolean;
}

type Order = {
    _id: string;
    orderNumber: number;
    user: User;
    updatedAt: string;
    createdAt: string;
    totalPrice: number;
    status: "pending" | "paid" | "delivered" | "cancelled";
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
                            <OrderDetails order={order}/>
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