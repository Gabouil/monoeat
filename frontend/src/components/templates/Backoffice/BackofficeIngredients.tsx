import "./Backoffice.scss"
import BackofficeSection from "../../organismes/Backoffice/BackofficeSection.tsx";
import React, {useEffect, useState} from "react";
import useGetAllIngredient from "../../../services/hooks/useGetAllIngredient.tsx";
import useDeleteIngredientById from "../../../services/hooks/useDeleteIngredientById.tsx";
import Button from "../../atomes/buttons/Button/Button.tsx";
import Notification from "../../atomes/Notification/Notification.tsx";

type Ingredients = {
    _id: string;
    name: string;
    category: string;
    allergens: boolean;
    optional: boolean;
};
export default function BackofficeIngredients() {
    const getIngredients = useGetAllIngredient();
    const deleteIngredient = useDeleteIngredientById();

    const [ingredients, setIngredients] = useState<Ingredients[]>([]);

    const [error, setError] = useState();
    useEffect(() => {
        (async () => {
            const data = await getIngredients();
            setIngredients(data);
        })();
    }, []);

    useEffect(() => {
        console.log(ingredients);
    }, [ingredients]);

    const handledeleteIngredient = async (e: React.FormEvent, id: string) => {
        e.preventDefault();
        const result = await deleteIngredient(id);
        if (result.status === 401 || result.status === 400) {
            console.error('Delete user error:', result.data);
            setError(result.data);
        } else {
            console.log('User deleted:', result);
            return window.location.href = "/backoffice/Ingredients";
        }
    }
    return (
        <>
            <main className={"backoffice"}>
                <BackofficeSection content={
                    <>
                        <Button
                            type={"NavLink"}
                            size={"small"}
                            label={"Créer un ingrédient"}
                            link={"/backoffice/Ingredients/add"}
                        />
                        {error &&
                            <Notification
                                title={"L'ingrédient est utilisé dans les recettes suivantes :"}
                                contents={error}
                                setContent={setError}
                                type={"alert"}
                            />
                        }
                        <table>
                            <thead>
                            <tr className={"table__color--1"}>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col" className={"table--noMobile450"}>Category</th>
                                <th scope="col">Action</th>
                                <th scope="col" className={"table--noMobile768"}></th>
                            </tr>
                            </thead>
                            <tbody>
                            {ingredients.map((ingredient: Ingredients, id: number) => {
                                return (
                                    <tr key={ingredient._id}
                                        className={id % 2 === 0 ? "table__color--2" : "table__color--1"}>
                                        <td>{id + 1}</td>
                                        <td className={ingredient.allergens ? "strong" : ""}>{ingredient.name}</td>
                                        <td className={"table--noMobile450"}>{ingredient.category}</td>
                                        <td>
                                            <Button
                                                type={"NavLink"}
                                                size={"small"}
                                                label={"Modifier"}
                                                link={"/backoffice/ingredients/" + ingredient._id}
                                            />
                                        </td>
                                        <td className={"table--noMobile768"}>
                                            <Button
                                                size={"small"}
                                                color={"danger"}
                                                label={"Supprimer"}
                                                onclick={(e: React.FormEvent) => {
                                                    handledeleteIngredient(e, ingredient._id)
                                                }}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </>
                } link={"/backoffice"} title={"Gestion des ingrédients"}/>
            </main>
        </>
    )
}