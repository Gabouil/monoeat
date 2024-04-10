import "./Backoffice.scss"
import BackofficeSection from "../../organismes/Backoffice/BackofficeSection.tsx";
import Button from "../../atomes/buttons/Button/Button.tsx";
import React from "react";
import useGetAllOrder from "../../../services/hooks/useGetAllOrder.tsx";

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
    status: string;
    recipes: { id: string, quantity: number }[],
    deliveryInfo: Delivery[],
    billingInfo: Delivery[],
}
export default function BackofficeOrders() {
    const GetAllOrders = useGetAllOrder();
    const [orders, setOrders] = React.useState<Order[]>([]);

    React.useEffect(() => {
        GetAllOrders().then((res: Order[]) => {
            setOrders(res);
            console.log(res);
        })
    }, [])

    return (
        <>
            <main className={"backoffice"}>
                <BackofficeSection
                    content={
                        <table>
                            <thead>
                            <tr className={"table__color--1"}>
                                <th scope="col">Order number</th>
                                <th scope="col">User</th>
                                <th scope="col" className={"table--noMobile768"}>Total price</th>
                                <th scope="col" className={"table--noMobile450"}>Status</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order: Order, id: number) => {
                                return (
                                    <tr key={order._id}
                                        className={id % 2 === 0 ? "table__color--2" : "table__color--1"}>
                                        <td>{order.orderNumber}</td>
                                        <td>{order.user.firstname} {order.user.lastname}</td>
                                        <td className={"table--noMobile768"}>{order.totalPrice} €</td>
                                        <td className={"table--noMobile450"}>{order.status}</td>
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
                    }
                    link={"/backoffice"}
                    title={"Gestion des commandes"}
                />
            </main>
        </>
    )
}