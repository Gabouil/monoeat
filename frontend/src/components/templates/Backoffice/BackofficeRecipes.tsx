import "./Backoffice.scss"
import BackofficeSection from "../../organismes/Backoffice/BackofficeSection.tsx";
import useGetAllRecipe from "../../../services/hooks/useGetAllRecipe.tsx";
import useDeleteRecipeById from "../../../services/hooks/useDeleteRecipeById.tsx";
import React, {useEffect, useState} from "react";
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
export default function BackofficeRecipes() {
    const getRecipes = useGetAllRecipe();
    const deleteRecipe = useDeleteRecipeById();

    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        (async () => {
            const data = await getRecipes();
            setRecipes(data);
        })();
    }, []);

    const handleDeleteRecipe = async (e: React.FormEvent, id:string) => {
        e.preventDefault();
        console.log("delete recipe");
        const result = await deleteRecipe(id);
        if (result.status === 401 || result.status === 400) {
            console.error('Delete recipe error:', result.data.error);
        } else {
            console.log('Recipe deleted:', result);
            return window.location.href = "/backoffice/recipes";
        }
    }

    return (
        <>
            <main className={"backoffice"}>
                <BackofficeSection
                    content={
                        <>
                            <Button
                                type={"NavLink"}
                                size={"small"}
                                label={"Ajouter une recette"}
                                link={"/backoffice/recipes/add"}
                            />
                            <table>
                                <thead>
                                <tr className={"table__color--1"}>
                                    <th scope="col">Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col" className={"table--noMobile450"}>category</th>
                                    <th scope="col">Action</th>
                                    <th scope="col"  className={"table--noMobile768"}></th>
                                </tr>
                                </thead>
                                <tbody>
                                {recipes.map((recipe: Recipe, id: number) => {
                                    return (
                                        <tr key={recipe._id}
                                            className={id % 2 === 0 ? "table__color--2" : "table__color--1"}>
                                            <td>{id + 1}</td>
                                            <td>{recipe.name}</td>
                                            <td className={"table--noMobile450"}>{recipe.category}</td>
                                            <td>
                                                <Button
                                                    type={"NavLink"}
                                                    size={"small"}
                                                    label={"Modifier"}
                                                    link={"/backoffice/recipes/" + recipe._id}
                                                />
                                            </td>
                                            <td  className={"table--noMobile768"}>
                                                <Button
                                                    size={"small"}
                                                    color={"danger"}
                                                    label={"Supprimer"}
                                                    onclick={(e: React.FormEvent) => {handleDeleteRecipe(e, recipe._id)}}
                                                />
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </>
                    }
                    link={"/backoffice"}
                    title={"Gestion des recettes"}
                />
            </main>
        </>
    )
}