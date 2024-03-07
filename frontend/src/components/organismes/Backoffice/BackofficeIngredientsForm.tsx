import Input from "../../atomes/inputs/Input/Input.tsx";
import SelectInput from "../../atomes/inputs/Input/SelectInput.tsx";
import SwitchButton from "../../atomes/buttons/SwitchButton/SwitchButton.tsx";
import Button from "../../atomes/buttons/Button/Button.tsx";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useGetIngredientById from "../../../services/hooks/useGetIngredientById.tsx";
import useDeleteIngredientById from "../../../services/hooks/useDeleteIngredientById.tsx";
import useUpdateIngredientById from "../../../services/hooks/useUpdateIngredientById.tsx";
import useCreateIngredient from "../../../services/hooks/useCreateIngredient.tsx";
import BackofficeSection from "./BackofficeSection.tsx";
import Notification from "../../atomes/Notification/Notification.tsx";


type defaultIngredientProps = {
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

export default function BackofficeIngredientsForm({formType = "create"}: { formType: "update" | "create" }) {
    const getIngredient = useGetIngredientById();
    const deleteIngredient = useDeleteIngredientById();
    const updateIngredient = useUpdateIngredientById();
    const createIngredient = useCreateIngredient();

    const id = useParams().id || ""
    const [ingredient, setIngredient] = useState<defaultIngredientProps | undefined>();

    const [name, setName] = useState("");
    const [allergens, setAllergens] = useState(false);
    const [optional, setOptional] = useState(false);

    const [category, setCategory] = useState("autres");
    const [categoryData] = useState([
        {value: "légumes", option: "vegetables"},
        {value: "viandes", option: "meat"},
        {value: "poissons", option: "fish"},
        {value: "produits laitiers", option: "dairy"},
        {value: "fruits", option: "fruits"},
        {value: "épices", option: "spices"},
        {value: "autres", option: "other"},
    ])
    const [categorySelected, setCategorySelected] = useState(6)

    const [unit, setUnit] = useState("unité")
    const [unitData] = useState([
        {value: "mg", option: "mg"},
        {value: "cg", option: "cg"},
        {value: "g", option: "g"},
        {value: "kg", option: "kg"},
        {value: "ml", option: "ml"},
        {value: "cl", option: "cl"},
        {value: "l", option: "l"},
        {value: "cuillère à café", option: "cuillère à café"},
        {value: "cuillère à soupe", option: "cuillère à soupe"},
        {value: "verre", option: "verre"},
        {value: "tasse", option: "tasse"},
        {value: "bol", option: "bol"},
        {value: "pincée", option: "pincée"},
        {value: "unité", option: "unité"},
    ])
    const [unitSelected, setUnitSelected] = useState(13)


    const [optionalUnit, setOptionalUnit] = useState("unité")
    const [optionalUnitSelected, setOptionalUnitSelected] = useState(13)
    const [optionalQuantity, setOptionalQuantity] = useState(0)
    const [optionalPrice, setOptionalPrice] = useState(0)


    const changeValue = (value: string, id: number, type?: string) => {
        if (type === "category") {
            console.log("category", value, id);
            setCategory(value);
            setCategorySelected(id);
        } else if (type === "unit") {
            console.log("category", value, id);
            setUnit(value);
            setUnitSelected(id);
        } else if (type === "optionalUnit") {
            setOptionalUnit(value);
            setOptionalUnitSelected(id);
        }
    }

    const [error, setError] = useState<string[]>([]);


    useEffect(() => {
        if (formType === "update") {
            (async () => {
                if (id) {
                    const data = await getIngredient(id);
                    setIngredient(data);
                }
            })();
        }
    }, []);

    useEffect(() => {
        if (formType === "update") {
            if (name === "" && ingredient) {
                console.log(ingredient);
                setName(ingredient.name);
                setAllergens(ingredient.allergens);
                setOptional(ingredient.optional);
                setCategory(ingredient.category)
                switch (ingredient.category) {
                    case "légumes":
                        setCategorySelected(0);
                        break;
                    case "viandes":
                        setCategorySelected(1);
                        break;
                    case "poissons":
                        setCategorySelected(2);
                        break;
                    case "produits laitiers":
                        setCategorySelected(3);
                        break;
                    case "fruits":
                        setCategorySelected(4);
                        break;
                    case "épices":
                        setCategorySelected(5);
                        break;
                    case "autres":
                        setCategorySelected(6);
                        break;
                    default:
                        setCategorySelected(6);
                        break;
                }
                setUnit(ingredient.unit);
                switch (ingredient.unit) {
                    case "mg":
                        setUnitSelected(0);
                        break;
                    case "cg":
                        setUnitSelected(1);
                        break;
                    case "g":
                        setUnitSelected(2);
                        break;
                    case "kg":
                        setUnitSelected(3);
                        break;
                    case "ml":
                        setUnitSelected(4);
                        break;
                    case "cl":
                        setUnitSelected(5);
                        break;
                    case "l":
                        setUnitSelected(6);
                        break;
                    case "cuillère à café":
                        setUnitSelected(7);
                        break;
                    case "cuillère à soupe":
                        setUnitSelected(8);
                        break;
                    case "verre":
                        setUnitSelected(9);
                        break;
                    case "tasse":
                        setUnitSelected(10);
                        break;
                    case "bol":
                        setUnitSelected(11);
                        break;
                    case "pincée":
                        setUnitSelected(12);
                        break;
                    case "unité":
                        setUnitSelected(13);
                        break;
                    default:
                        setUnitSelected(13);
                        break;
                }
                if (ingredient.optional) {
                    setOptionalQuantity(ingredient.optionalQuantity || 0);
                    setOptionalPrice(ingredient.optionalPrice || 0);
                    switch (ingredient.optionalUnit || "unité") {
                        case "mg":
                            setOptionalUnitSelected(0);
                            break;
                        case "cg":
                            setOptionalUnitSelected(1);
                            break;
                        case "g":
                            setOptionalUnitSelected(2);
                            break;
                        case "kg":
                            setOptionalUnitSelected(3);
                            break;
                        case "ml":
                            setOptionalUnitSelected(4);
                            break;
                        case "cl":
                            setOptionalUnitSelected(5);
                            break;
                        case "l":
                            setOptionalUnitSelected(6);
                            break;
                        case "cuillère à café":
                            setOptionalUnitSelected(7);
                            break;
                        case "cuillère à soupe":
                            setOptionalUnitSelected(8);
                            break;
                        case "verre":
                            setOptionalUnitSelected(9);
                            break;
                        case "tasse":
                            setOptionalUnitSelected(10);
                            break;
                        case "bol":
                            setOptionalUnitSelected(11);
                            break;
                        case "pincée":
                            setOptionalUnitSelected(12);
                            break;
                        case "unité":
                            setOptionalUnitSelected(13);
                            break;
                        default:
                            setOptionalUnitSelected(13);
                            break;
                    }
                    setOptionalUnit(ingredient.optionalUnit || "unité");
                }
            }
        }
    }, [ingredient]);


    const handleDeleteteIngredient = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("delete ingredient");
        const result = await deleteIngredient(id);
        if (result.status === 401 || result.status === 400) {
            console.error('Delete ingredient error:', result.data);
            setError(result.data);
        } else {
            console.log('Ingredient deleted:', result);
            return window.location.href = "/backoffice/ingredients";
        }
    }

    const handleUpdateIngredient = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await updateIngredient({
            id: id,
            name: name,
            category: category,
            unit: unit,
            allergens: allergens,
            optional: optional,
            optionalUnit: optionalUnit,
            optionalQuantity: optionalQuantity,
            optionalPrice: optionalPrice
        });
        if (result.status === 401 || result.status === 400) {
            console.error('Update Ingredient error:', result.data.error);
        } else {
            console.log('Ingredient updated:', result);
            return window.location.href = "/backoffice/ingredients";
        }
    }

    const handleCreateIngredient = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("update Ingredient");
        const result = await createIngredient({
            name: name,
            category: category,
            unit: unit,
            allergens: allergens,
            optional: optional,
            optionalUnit: optionalUnit,
            optionalQuantity: optionalQuantity,
            optionalPrice: optionalPrice
        });
        if (result.status === 401 || result.status === 400) {
            console.error('Update Ingredient error:', result.data.error);
        } else {
            console.log('Ingredient updated:', result);
            return window.location.href = "/backoffice/ingredients";
        }
    }

    return (

        <BackofficeSection
            content={
                <>
                    <Notification
                        title={"L'ingrédient est utilisé dans les recettes suivantes :"}
                        contents={error}
                        setContent={setError}
                        type={"alert"}
                    />
                    <form>
                        <Input
                            label={"Nom"}
                            type={"text"}
                            value={name}
                            placeholder={"Nom"}
                            name={"name"}
                            setValue={setName}
                            color
                        />
                        <SelectInput
                            optionSelected={categorySelected}
                            setOptionSelected={setCategorySelected}
                            contents={categoryData}
                            setValue={changeValue}
                            label={"Catégorie"}
                            typeSetValue={"category"}
                        />
                        <SelectInput
                            optionSelected={unitSelected}
                            setOptionSelected={setUnitSelected}
                            contents={unitData}
                            setValue={changeValue}
                            label={"Unité"}
                            typeSetValue={"unit"}
                        />
                        <div className={"group__column"}>
                            <p>allergens</p>
                            <SwitchButton
                                name={"allergens"}
                                value={allergens}
                                setValue={setAllergens}
                            />
                        </div>
                        <div className={"group__column"}>
                            <p>facutlatif</p>
                            <SwitchButton
                                name={"optional"}
                                value={optional}
                                setValue={setOptional}
                            />
                        </div>
                        {optional &&
                            <>
                                <Input
                                    label={"Quantité optionnelle"}
                                    type={"number"}
                                    value={optionalQuantity}
                                    placeholder={"Quantité optionnelle"}
                                    name={"optionalQuantity"}
                                    setValue={setOptionalQuantity}
                                    color
                                />
                                <SelectInput
                                    optionSelected={optionalUnitSelected}
                                    setOptionSelected={setOptionalUnitSelected}
                                    contents={unitData}
                                    setValue={changeValue}
                                    label={"Unité"}
                                    typeSetValue={"optionalUnit"}
                                />
                                <Input
                                    label={"Prix optionnel"}
                                    type={"number"}
                                    value={optionalPrice}
                                    placeholder={"Prix optionnel"}
                                    name={"optionalPrice"}
                                    setValue={setOptionalPrice}
                                    color
                                />
                            </>
                        }
                        {formType === "update" ?
                            <>
                                <Button label={"Supprimer l'ingrédient"} color={"danger"}
                                        onclick={(e: React.FormEvent) => handleDeleteteIngredient(e)}/>
                                <Button label={"Modifier l'ingrédient"} onclick={(e: React.FormEvent) => handleUpdateIngredient(e)}/>
                            </>
                            :
                            <Button label={"Créer le nouvel ingrédient"}
                                    onclick={(e: React.FormEvent) => handleCreateIngredient(e)}/>
                        }
                    </form>
                </>
            }
            link={"/backoffice/ingredients"}
            title={formType === "update" ? `modifier l'ingrédient ${ingredient?.name}`
                : "Nouvel ingrédient"}
        />
    )
}