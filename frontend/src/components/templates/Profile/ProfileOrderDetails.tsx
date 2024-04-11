import "./Profile.scss"
import Footer from "../../molecules/global/Footer/Footer.tsx";
import Header from "../../molecules/global/Header/Header.tsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useGetOrderById from "../../../services/hooks/useGetOrderById.tsx";
import OrderDetails from "../../organismes/OrderDetails/OrderDetails.tsx";
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
export default function ProfileOrderDetails() {
    const GetOrderById = useGetOrderById();
    const id = useParams().id || ""
    const [order, setOrder] = useState<Order>();

    useEffect(() => {
        (async () => {
            if (GetOrderById) {
                const res = await GetOrderById(id);
                setOrder(res);
            }
        })()
    }, [])


    return (
        <>
            <Header/>
            <main className="profile__page">
                <Button label={"Retour"} type={"NavLink"} link={"/profil"}/>
                {order && <OrderDetails order={order}/>}
            </main>
            <Footer newsLetter/>
        </>
    )
}