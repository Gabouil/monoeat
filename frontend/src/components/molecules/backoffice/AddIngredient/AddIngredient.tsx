import "./AddIngredient.scss"
import Input from "../../../atomes/inputs/Input/Input.tsx";
import Button from "../../../atomes/buttons/Button/Button.tsx";
import React, {useEffect, useState} from "react";
import useGetAllIngredient from "../../../../services/hooks/useGetAllIngredient.tsx";
import SelectInput from "../../../atomes/inputs/Input/SelectInput.tsx";
import SwitchButton from "../../../atomes/buttons/SwitchButton/SwitchButton.tsx";

type props = {
    setValues: (values: { ingredient: string, quantity: number }[]) => void;
    ingredientsDefault?: { ingredient: string, quantity: number }[];
}

type Ingredients = {
    _id: string;
    name: string;
    category: string;
    allergens: boolean;
    optional: boolean;
    unit: string;
};

export default function AddIngredient({setValues, ingredientsDefault}: props) {
    const getIngredients = useGetAllIngredient();

    const [ingredients, setIngredients] = useState<{ ingredient: Ingredients, quantity: number }[]>([]);

    const [category, setCategory] = useState("Selectionner une catégorie");
    const [categoryData] = useState([
        {value: "Selectionner une catégorie", option: "filtre"},
        {value: "légumes", option: "vegetables"},
        {value: "viandes", option: "meat"},
        {value: "poissons", option: "fish"},
        {value: "produits laitiers", option: "dairy"},
        {value: "fruits", option: "fruits"},
        {value: "épices", option: "spices"},
        {value: "autres", option: "other"},
    ])
    const [categorySelected, setCategorySelected] = useState(0)

    const changeValue = (value: string, id: number) => {
        setCategory(value)
        setCategorySelected(id)
    }


    const [filteredIngredients, setFilteredIngredients] = useState<{ ingredient: Ingredients, quantity: number }[]>([]);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [limitItems, setLimitItems] = useState(3);
    const [ingredientSelectedOnly, setIngredientSelectedOnly] = useState(false);

    useEffect(() => {
        (async () => {
            const data = await getIngredients();
            let dataNew: { ingredient: Ingredients, quantity: number }[] = [];
            data.map((ingredient: Ingredients) => {
                dataNew = [...dataNew, {ingredient: ingredient, quantity: 0}]
            });
            setIngredients(dataNew);
            setFilteredIngredients(dataNew);
        })();
    }, []);

    useEffect(() => {
            if (ingredientsDefault) {
                (async () => {
                    let dataNew: { ingredient: Ingredients, quantity: number }[] = ingredients;
                    ingredientsDefault.map((ingredient: { ingredient: string, quantity: number }) => {
                        dataNew = dataNew.map(ingredientData => {
                            if (ingredientData.ingredient._id === ingredient.ingredient) {
                                return {...ingredientData, quantity: ingredient.quantity};
                            }
                            return ingredientData;
                        });
                    });
                    console.log(dataNew);
                    setIngredients(dataNew);
                    setFilteredIngredients(dataNew);
                })();
            }
        }, [ingredientsDefault]
    );

    useEffect(() => {
        let limitItemsNew = limitItems;
        const filtered = ingredients.filter(ingredient =>
            ingredient.ingredient.name.toLowerCase().includes(search.toLowerCase()) &&
            (category === "Selectionner une catégorie" || ingredient.ingredient.category === category)
        );
        const pageFiltered = [];

        if (ingredientSelectedOnly) {
            const filteredSelected = filtered.filter(ingredient => ingredient.quantity > 0);
            if (filteredSelected.length !== 0) {
                if (filteredSelected.length <= limitItemsNew) {
                    limitItemsNew = filteredSelected.length
                }
                if (limitItems < 1) {
                    setLimitItems(1);
                }
                if (totalPages !== Math.ceil(filteredSelected.length / limitItemsNew)) {
                    setCurrentPage(1);
                }
                setTotalPages(Math.ceil(filteredSelected.length / limitItemsNew));
                for (let i = (currentPage * limitItemsNew) - limitItemsNew; i < (limitItemsNew * currentPage); i++) {
                    if (filteredSelected[i] !== undefined) {
                        pageFiltered.push(filteredSelected[i]);
                    }
                }
            }

        } else {
            if (filtered.length !== 0) {
                if (filtered.length <= limitItemsNew) {
                    limitItemsNew = filtered.length
                }
                if (limitItems < 1) {
                    setLimitItems(1);
                }
                if (totalPages !== Math.ceil(filtered.length / limitItemsNew)) {
                    setCurrentPage(1);
                }
                setTotalPages(Math.ceil(filtered.length / limitItemsNew));
                for (let i = (currentPage * limitItemsNew) - limitItemsNew; i < (limitItemsNew * currentPage); i++) {
                    if (filtered[i] !== undefined) {
                        pageFiltered.push(filtered[i]);
                    }
                }
            }
        }
        if (pageFiltered[0] === undefined) {
            setFilteredIngredients(filtered);
        } else {
            setFilteredIngredients(pageFiltered);
        }

    }, [search, ingredients, category, limitItems, currentPage, ingredientSelectedOnly]);

    const changeQuantity = (value: number, id: string) => {
        const updatedIngredients = ingredients.map(ingredient => {
            if (ingredient.ingredient._id === id) {
                return {...ingredient, quantity: value};
            }
            return ingredient;
        });

        const updatedFilteredIngredients = filteredIngredients.map(ingredient => {
            if (ingredient.ingredient._id === id) {
                return {...ingredient, quantity: value};
            }
            return ingredient;
        });

        const updatedValues: { ingredient: string, quantity: number }[] = updatedIngredients
            .filter(ingredient => ingredient.quantity > 0)
            .map(ingredient => ({ingredient: ingredient.ingredient._id, quantity: ingredient.quantity}));

        setValues(updatedValues)
        setIngredients(updatedIngredients);
        setFilteredIngredients(updatedFilteredIngredients);
    }

    return (
        <>
            <div className="add_ingrdient">
                <p>Ajouter des ingrédients</p>
                <div className={"add_ingrdient__container"}>
                    <div className={"add_ingrdient__container__preview"}>
                        <div className={"add_ingrdient__container__preview__header"}>
                            <div className={"add_ingrdient__container__preview__header__filter"}>
                                <Input
                                    type={"text"}
                                    value={search}
                                    placeholder={"Rechercher"}
                                    setValue={setSearch}
                                    name={"search"}
                                    label={"Rechercher"}
                                />
                                <SelectInput
                                    optionSelected={categorySelected}
                                    setOptionSelected={setCategorySelected}
                                    contents={categoryData}
                                    setValue={changeValue}
                                    label={"Catégorie"}
                                />
                                <Input
                                    type={"number"}
                                    value={limitItems}
                                    placeholder={"Nombre d'ingrédients par page"}
                                    setValue={setLimitItems}
                                    name={"limitItems"}
                                    label={"Nombre d'ingrédients par page"}
                                />
                                <SwitchButton
                                    name={"ingredientSelectedOnly"}
                                    value={ingredientSelectedOnly}
                                    setValue={setIngredientSelectedOnly}
                                />
                            </div>
                        </div>
                        <table>
                            <thead>
                            <tr className={"table__color--1"}>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Unit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredIngredients && filteredIngredients.map((ingredient, id) => {
                                return (
                                    <tr key={ingredient.ingredient._id}
                                        className={id % 2 === 0 ? "table__color--2" : "table__color--1"}>
                                        <td>{id + 1}</td>
                                        <td className={ingredient.ingredient.allergens ? "strong" : ""}>{ingredient.ingredient.name}</td>
                                        <td>{ingredient.ingredient.category}</td>
                                        <td>
                                            <Input
                                                type={"number"}
                                                value={ingredient.quantity}
                                                placeholder={"Quantité"}
                                                setValue={changeQuantity}
                                                name={"quantity"}
                                                idInput={ingredient.ingredient._id}
                                            />
                                        </td>
                                        <td>{ingredient.ingredient.unit}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        <div className={"add_ingrdient__container__preview__header__pagination"}>
                            <Button
                                size={"small"}
                                label={"Précédent"}
                                onclick={(e: React.FormEvent) => {
                                    e.preventDefault();
                                    if (currentPage > 1) {
                                        setCurrentPage(currentPage - 1);
                                    }
                                }}
                            />
                            <p>{currentPage}/{totalPages}</p>
                            <Button
                                size={"small"}
                                label={"Suivant"}
                                onclick={(e: React.FormEvent) => {
                                    e.preventDefault();
                                    if (currentPage < totalPages) {
                                        setCurrentPage(currentPage + 1);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}