import "./Profile.scss"
import Footer from "../../molecules/global/Footer/Footer.tsx";
import Header from "../../molecules/global/Header/Header.tsx";
import {useUser} from "../../../context/UserContext.tsx";
import React, {useEffect, useState} from "react";
import useGetOrderByUserId from "../../../services/hooks/useGetOrderByUserId.tsx";
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

export default function Profile() {
    const userContext = useUser();
    if (!userContext) {
        throw new Error("UserContext is not initialized");
    }
    const [section, setSection] = useState("commands");

    const GetOrders = useGetOrderByUserId();
    const [orders, setOrders] = useState<Order[]>([]);
    useEffect(() => {
        if (userContext.user) {
            GetOrders(userContext.user.userId, "all").then((res) => {
                setOrders(res);
            });
        }
    }, [userContext.user]);

    return (
        <>
            <Header/>
            {userContext.user && (
                <main className={"profile__page"}>
                    <header className={"profile__page__header"}>
                        <div className={"profile__page__header__top"}>
                            <h1 className={"profile__page__header__top__title"}>
                                {userContext.user.firstname} {userContext.user.lastname}
                            </h1>
                            <button>

                            </button>
                        </div>
                        <div className={"profile__page__header__bottom"}>
                            <ul className={"profile__page__header__bottom__list"}>
                                <li className={"profile__page__header__bottom__list__item"}>
                                    <button onClick={() => setSection("commands")}>
                                        Comamndes
                                    </button>
                                </li>
                                <li className={"profile__page__header__bottom__list__item"}>
                                    <button onClick={() => setSection("informations")}>
                                        Informations
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </header>
                    {section === "commands" && orders.length > 0 && (
                        <section className={"profile__page__content"}>
                            <table>
                                <thead>
                                <tr className={"table__color--1"}>
                                    <th scope="col">Numéro de commande</th>
                                    <th scope="col" className={"table--noMobile768"}>Prix total</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map((order: Order, id: number) => {
                                    return (
                                        <tr key={order._id}
                                            className={id % 2 === 0 ? "table__color--2" : "table__color--1"}>
                                            <td>MONO{order.orderNumber}</td>
                                            <td className={"table--noMobile768"}>{order.totalPrice} €</td>
                                            <td>{order.status}</td>
                                            <td>
                                                <Button
                                                    type={"NavLink"}
                                                    link={"/backoffice/orders/" + order._id}
                                                    label={"Details"}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </section>
                    )}
                    {section === "informations" && (
                        <section className={"profile__page__content"}>

                        </section>
                    )}
                </main>
            )}
            <Footer newsLetter/>
        </>
    )
}