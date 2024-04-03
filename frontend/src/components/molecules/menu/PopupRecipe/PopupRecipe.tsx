import "./PopupRecipe.scss";
import {NavLink} from "react-router-dom";
import React, {useEffect} from "react";

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

export default function PopupRecipe({recipe, setPreviewIsOpen}: {
    recipe: Recipe,
    setPreviewIsOpen: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}) {

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, []);

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
                <div className="popup_recipe__container__header">
                    <h2>{recipe.name}</h2>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setPreviewIsOpen(prevState => ({
                                ...prevState,
                                [recipe._id]: !prevState[recipe._id]
                            }))
                        }} >
                        X
                    </button>
                </div>
                <div className="popup_recipe__container__content">
                    <img src={recipe.image} alt={recipe.name}/>
                    <p>{recipe.description}</p>
                    <div className="popup_recipe__container__content__ingredients">
                        <h3>Ingrédients</h3>
                        <ul>
                            {recipe.ingredients.map((ingredient) => {
                                return (
                                    <li key={ingredient.ingredient.id}>
                                        {ingredient.quantity} {ingredient.ingredient.unit} {ingredient.ingredient.name}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="popup_recipe__container__content__steps">
                        <h3>Etapes</h3>
                        <ol>
                            {recipe.recipeSteps.map((step, index) => {
                                return (
                                    <li key={index}>
                                        {step}
                                    </li>
                                )
                            })}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}