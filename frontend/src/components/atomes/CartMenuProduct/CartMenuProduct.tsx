import "./CartMenuProduct.scss";
import Button from "../buttons/Button/Button.tsx";

type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    date:string;
}
type Props = {
    product: Product;
    deleteProduct?: (product: Product) => void;
}
export default function CartMenuProduct({product, deleteProduct}: Props) {
    return (
        <div key={product.id} className="cart_menu__product">
            <img src={product.image} alt={product.name}/>
            <div className="cart_menu__product__info">
                <p className="cart_menu__product__info__name">{product.name}</p>
                <div>
                    <div>
                        <p className="cart_menu__product__info__price">{product.price * product.quantity}€</p>
                        <p className="cart_menu__product__info__quantity">Quantité: {product.quantity}</p>
                    </div>
                    {deleteProduct &&
                        <Button
                            label={"Supprimer"}
                            onclick={() => deleteProduct(product)}
                            color={"danger"}
                        />
                    }
                </div>
            </div>
        </div>
    )
}