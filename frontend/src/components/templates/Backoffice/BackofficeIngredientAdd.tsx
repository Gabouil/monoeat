import "./Backoffice.scss"
import BackofficeSection from "../../organismes/Backoffice/BackofficeSection.tsx";
import React, {useState} from "react";
import Input from "../../atomes/inputs/Input/Input.tsx";
import Button from "../../atomes/buttons/Button/Button.tsx";
import SelectInput from "../../atomes/inputs/Input/SelectInput.tsx";
import useCreateIngredient from "../../../services/hooks/useCreateIngredient.tsx";
import SwitchButton from "../../atomes/buttons/SwitchButton/SwitchButton.tsx";

export default function BackofficeIngredientAdd() {
    const createIngredient = useCreateIngredient();

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

    const changeValue = (value: string, id: number, type?:string) => {
        if (type === "category") {
            setCategory(value);
            setCategorySelected(id);
        } else if (type === "unit") {
            setUnit(value);
            setUnitSelected(id);
        } else if (type === "optionalUnit") {
            setOptionalUnit(value);
            setOptionalUnitSelected(id);
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
        <>
            <main className={"backoffice"}>
                <BackofficeSection
                    content={
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
                            <Button label={"Créer le nouvel ingrédient"}
                                    onclick={(e: React.FormEvent) => handleCreateIngredient(e)}/>
                        </form>
                    }
                    link={"/backoffice/ingredients"}
                    title={"Nouvel ingrédient"}
                />
            </main>
        </>
    )
}