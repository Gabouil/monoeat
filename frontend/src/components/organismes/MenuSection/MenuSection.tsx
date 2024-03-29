import "./MenuSection.scss";
import useGetMenuByDate from "../../../services/hooks/useGetMenuByDate.tsx";
import {useEffect, useState} from "react";
import FavoriteOn from "../../../assets/pictos/Menu/favoriteOn.tsx";
import FavoriteOff from "../../../assets/pictos/Menu/favoriteOff.tsx";
import Alergene from "../../../assets/pictos/Menu/alergene.tsx";
import Beef from "../../../assets/pictos/Menu/beef.tsx";
import Fish from "../../../assets/pictos/Menu/fish.tsx";
import Milk from "../../../assets/pictos/Menu/milk.tsx";

interface MenuSectionProps {
    type: string;
    date: string;
}

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

export default function MenuSection({type, date}: MenuSectionProps) {
    const getMenu = useGetMenuByDate();
    const [menuData, setMenuData] = useState<any>([]);

    useEffect(() => {
        (async () => {
            if (date) {
                const menu = await getMenu(date, type);
                setMenuData(menu);
                console.log("menu : ", type, menu);
            }
        })();
    }, [date]);


    const ingredientPicto = (ingredients: [{ ingredient: ingredient; quantity: string; }]) => {
        const pictos = [""];
        ingredients.map((ingredient) => {
            if (ingredient.ingredient.allergens) {
                if (pictos.indexOf("allergens") === -1) {
                    pictos.push("allergens");
                }
            }
            switch (ingredient.ingredient.category) {
                case "viandes":
                    if (pictos.indexOf("meat") === -1) {
                        pictos.push("meat");
                    }
                    break;
                case "poissons":
                    if (pictos.indexOf("fish") === -1) {
                        pictos.push("fish");
                    }
                    break;
                case "produits laitiers":
                    if (pictos.indexOf("milk") === -1) {
                        pictos.push("milk");
                    }
                    break;
                default:
                    break;
            }
        })

        const orderedPictos = ['allergens', 'meat', 'fish', 'milk'];

        return orderedPictos.map((picto) => {
            if (pictos.includes(picto)) {
                switch (picto) {
                    case "allergens":
                        return <span className={"tooltip tooltip--danger"} aria-label={"Contient des allergènes"}><Alergene/></span>
                    case "meat":
                        return <Beef/>
                    case "fish":
                        return <Fish/>
                    case "milk":
                        return <Milk/>
                    default:
                        return <></>
                }
            }
        }).filter(Boolean);
    }
    return (
        <section className="menu__section" id={type} key={type}>
            <h1>{type.charAt(0).toUpperCase() + type.slice(1)}</h1>
            <div className="menu__section__content">
                {menuData && menuData.length > 0 ?
                    menuData.map((recipe: Recipe) => {
                        return (
                            <article key={recipe._id} className="menu__section__content__card">
                                <div className={"menu__section__content__card__image"}>
                                    <div className={"menu__section__content__card__image__favorite"}>
                                        <FavoriteOff/>
                                    </div>
                                    <div className={"menu__section__content__card__image__content "}>
                                        <img src={recipe.image} alt={recipe.name}/>
                                    </div>
                                    <div className={"menu__section__content__card__image__ingredients"}>
                                        {ingredientPicto(recipe.ingredients)}
                                    </div>
                                </div>
                                <div className={"menu__section__content__card__infos"}>
                                    <h4>{recipe.name}</h4>
                                    <p>{recipe.price}€/pers</p>
                                    <p>Temps de préparation : {recipe.cookTime.time} {recipe.cookTime.unit}</p>
                                    <p>Difficulté : {recipe.difficulty}</p>
                                </div>
                            </article>
                        )
                    }) : <p className={"menu__section__content__card--noitem"}>Pas de {type} cette semaine</p>}
            </div>

        </section>
    );
}