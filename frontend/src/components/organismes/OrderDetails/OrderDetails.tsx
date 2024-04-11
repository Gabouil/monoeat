import "./OrderDetails.scss";



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

export default function OrderDetails({order}: { order: Order }) {

    return (
        <section className={"orders_details"}>
            <h2>Détails de la commande</h2>
            <div className={"orders_details__row"}>
                <div>
                    <p>Numéro de commande : {order.orderNumber}</p>
                    <p>Créé le
                        : {new Date(order.createdAt).toLocaleDateString()} à {new Date(order.createdAt).toLocaleTimeString()}</p>
                    <p>Prix total : {order.totalPrice} €</p>
                </div>
                <div>
                    <p>Statut : {order.status}</p>
                    <p>Utilisateur : {order.user.firstname} {order.user.lastname}</p>
                    <p>Email : {order.user.email}</p>
                </div>
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
                    <tr key={index}
                        className={index % 2 === 0 ? "table__color--2" : "table__color--1"}>
                        <td>{recipe.id.name}</td>
                        <td>{recipe.quantity}</td>
                        <td>{recipe.id.price} €</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className={"orders_details__row"}>
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
        </section>
    );
}