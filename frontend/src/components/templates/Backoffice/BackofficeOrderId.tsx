import "./Backoffice.scss"
import {useNavigate, useParams} from "react-router-dom";
import useGetOrderById from "../../../services/hooks/useGetOrderById.tsx";
import {useEffect, useState} from "react";
import BackofficeSection from "../../organismes/Backoffice/BackofficeSection.tsx";
import SelectInput from "../../atomes/inputs/Input/SelectInput.tsx";
import Button from "../../atomes/buttons/Button/Button.tsx";
import useUpdateOrderById from "../../../services/hooks/useUpdateOrderById.tsx";
import Notification from "../../atomes/Notification/Notification.tsx";
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

export default function BackofficeOrderId() {
    const GetOrderById = useGetOrderById();
    const UpdateOrder = useUpdateOrderById();
    const id = useParams().id || ""
    const [order, setOrder] = useState<Order | null>(null);

    const [statut, setStatut] = useState<"pending" | "paid" | "delivered" | "cancelled">("pending")
    const [statutData] = useState([
        {value: "pending", option: "En attente"},
        {value: "paid", option: "Confirmée"},
        {value: "delivered", option: "Livrée"},
        {value: "cancelled", option: "Annulée"},
    ])
    const [statutSelected, setStatutSelected] = useState(0)

    const [error, setError] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if (GetOrderById) {
                const res = await GetOrderById(id);
                setOrder(res);
                setStatut(res.status)
                switch (res.status) {
                    case "pending":
                        setStatutSelected(0)
                        break;
                    case "paid":
                        setStatutSelected(1)
                        break;
                    case "delivered":
                        setStatutSelected(2)
                        break;
                    case "cancelled":
                        setStatutSelected(3)
                        break;
                }
            }
        })()
    }, [])

    const changeStatut = async () => {
        const res = await UpdateOrder({
            id: id,
            status: statut
        })
        if (res.status === 404) {
            setError(res.error)
        } else {
            navigate("/backoffice/orders")
        }
    }
    return (
        <main className={"backoffice"}>

            <Notification
                title={"Problème lors de la mise à jour du statut de la commande"}
                contents={error}
                setContent={setError}
                type={"alert"}
            />

            <BackofficeSection
                content={
                    <>
                        {order && (
                            <section className={"backoffice__orders"}>
                                <h2>Changer le statut de la commande</h2>
                                <div className={"backoffice__orders__row"}>
                                    <SelectInput
                                        optionSelected={statutSelected}
                                        setOptionSelected={setStatutSelected}
                                        contents={statutData}
                                        setValue={(value: string) => setStatut(value as "pending" | "paid" | "delivered" | "cancelled")}
                                        label={"Statut"}
                                    />
                                    <Button
                                        label={"Changer le statut"}
                                        onclick={changeStatut}
                                    />
                                </div>
                                <OrderDetails order={order}/>
                            </section>
                        )}
                    </>
                }
                link={"/backoffice/orders"}
                title={order ? `Order n°${order.orderNumber}` : "Order not found"}
            />
        </main>
    )
}