import "./PopupRecipe.scss";
import React, {useEffect, useState} from "react";
import Button from "../../../atomes/buttons/Button/Button.tsx";
import Input from "../../../atomes/inputs/Input/Input.tsx";
import Add from "../../../../assets/pictos/Menu/Add.tsx";
import Remove from "../../../../assets/pictos/Menu/Remove.tsx";
import {useCart} from "../../../../context/CartContext.tsx";

type ingredient = {
    id: string,
    name: string,
    category: string,
    unit: string,
    allergens: boolean,
    optional: boolean,
    optionalUnit?: string,
    optionalQuantity?: number,
    optionalPrice?: number,
}
type Recipe = {
    _id: string;
    name: string;
    description: string;
    category: string;
    image: string;
    ingredients: [
        {
            ingredient: ingredient;
            quantity: number;
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

export default function PopupRecipe({recipe, setPreviewIsOpen}: {
    recipe: Recipe,
    setPreviewIsOpen: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}) {
    const [nbPeople, setNbPeople] = useState(2);
    const CartContext = useCart()

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, []);

    const changePeople = (type: string) => {
        if (type === "add") {
            setNbPeople(nbPeople + 1);
        } else if (type === "remove") {
            if (nbPeople > 1) {
                setNbPeople(nbPeople - 1);
            }
        }
    }

    const addToCart = () => {
        if (CartContext) {
            const newCart = [...CartContext.cart];
            const existingProductIndex = newCart.findIndex(item => item.id === recipe._id);

            if (existingProductIndex >= 0) {
                console.log(recipe)
                newCart[existingProductIndex].quantity += nbPeople;
            } else {
                console.log(recipe)
                newCart.push({
                    id: recipe._id,
                    name: recipe.name,
                    price: recipe.price,
                    image: recipe.image,
                    quantity: nbPeople
                });
            }

            CartContext.setCart(newCart);
            setPreviewIsOpen(prevState => ({
                ...prevState,
                [recipe._id]: !prevState[recipe._id]
            }))
        }
    }

    useEffect(() => {
        if (nbPeople < 1) {
            setNbPeople(1);
        }
    }, [nbPeople])

    return (
        <div
            className="popup_recipe"
            onClick={(e) => {
                e.stopPropagation();
                setPreviewIsOpen(prevState => ({
                    ...prevState,
                    [recipe._id]: !prevState[recipe._id]
                }))
            }}
        >
            <div className={"popup_recipe__container "}
                 onClick={e => e.stopPropagation()}>
                <header className="popup_recipe__container__header">
                    <h2>{recipe.name}</h2>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setPreviewIsOpen(prevState => ({
                                ...prevState,
                                [recipe._id]: !prevState[recipe._id]
                            }))
                        }}>
                        X
                    </button>
                </header>
                <div className="popup_recipe__container__content">
                    <img src={recipe.image} alt={recipe.name}/>
                    <p>{recipe.description}</p>
                    <div className="popup_recipe__container__content__price">
                        <h3>Prix</h3>
                        <p>{recipe.price} € / personne</p>
                    </div>
                    <div className="popup_recipe__container__content--row">
                        <div className="popup_recipe__container__content__time">
                            <h3>Temps de préparation</h3>
                            <p>{recipe.cookTime.time} {recipe.cookTime.unit}</p>
                        </div>
                        <div className="popup_recipe__container__content__difficulty">
                            <h3>Difficulté</h3>
                            <p>{recipe.difficulty}</p>
                        </div>
                        <div className="popup_recipe__container__content__utensils">
                            <h3>Ustensiles</h3>
                            <ul>
                                {recipe.utensils.map((utensil) => {
                                    return (
                                        <li key={utensil}>
                                            {utensil}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div
                        className="popup_recipe__container__content__infos popup_recipe__container__content__ingredients">
                        <h3>Ingrédients</h3>
                        <span>Les ingredients <span className={"badges badges--danger"}>optionnel</span> ne sont pas inclus dans le prix et sont à ajouter si besoin après avoir valider le panier.</span>
                        <ul>
                            {recipe.ingredients.map((ingredient, id) => {
                                return (
                                    <li key={"ingredient_" + id}>
                                        {ingredient.quantity * nbPeople} {ingredient.ingredient.unit} {ingredient.ingredient.name} {ingredient.ingredient.optional &&
                                        <span className={"badges badges--danger"}>optionnel</span>}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="popup_recipe__container__content__infos popup_recipe__container__content__steps">
                        <h3>Etapes</h3>
                        <ol>
                            {recipe.recipeSteps.map((step, index) => {
                                return (
                                    <li key={index}>
                                        {index + 1} : {step}
                                    </li>
                                )
                            })}
                        </ol>
                    </div>
                    <div
                        className="popup_recipe__container__content__infos popup_recipe__container__content__nutritionalValues">
                        <h3>Valeurs nutritionnelles</h3>
                        <p>Calories : {recipe.nutritionalValues.calories} Kcal / 100g</p>
                        <table>
                            <thead>
                            <tr className={"table__color--1"}>
                                <th>Lipides</th>
                                <th>Glucides</th>
                                <th>Protéines</th>
                                <th>Sels</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className={"table__color--2"}>
                                <td>{recipe.nutritionalValues.lipids} g</td>
                                <td>{recipe.nutritionalValues.carbohydrates} g</td>
                                <td>{recipe.nutritionalValues.proteins} g</td>
                                <td>{recipe.nutritionalValues.sels} g</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <footer className="popup_recipe__container__footer">
                    <div className="popup_recipe__container__footer__people">
                        <button onClick={() => changePeople("remove")}>
                            <Remove/>
                        </button>
                        <Input
                            type={"number"}
                            placeholder={"Nombre de personnes"}
                            label={"Nombre de personnes"}
                            name={"nbPeople"}
                            value={nbPeople}
                            setValue={setNbPeople}
                        />
                        <button onClick={() => changePeople("add")}>
                            <Add/>
                        </button>
                    </div>
                    <div className="popup_recipe__container__footer__buttons">
                        <p>{recipe.price * nbPeople} €</p>
                        <Button
                            label={"Ajouter au panier"}
                            type={"button"}
                            onclick={() => addToCart()}
                        />
                    </div>
                </footer>
            </div>
        </div>
    )
}