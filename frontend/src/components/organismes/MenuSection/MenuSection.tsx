import "./MenuSection.scss";
import useGetMenuByDate from "../../../services/hooks/useGetMenuByDate.tsx";
import {useEffect, useState} from "react";

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
    return (
        <section className="menu__section" id={type} key={type}>
            <h1>{type.charAt(0).toUpperCase() + type.slice(1)}</h1>
            <div className="menu__section__content">
                {menuData && menuData.length > 0 ?
                    menuData.map((recipe: Recipe) => {
                        return (
                            <article key={recipe._id} className="menu__section__content__card">
                                <img src={recipe.image} alt={recipe.name}/>
                            </article>
                        )
                    }) : <p>Pas de {type} cette semaine</p>}
            </div>

        </section>
    );
}