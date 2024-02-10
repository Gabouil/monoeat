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

    const changeValue = (value: string, id: number) => {
        setCategory(value)
        setCategorySelected(id)
    }

    const handleCreateIngredient = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("update Ingredient");
        const result = await createIngredient({
            name: name,
            category: category,
            allergens: allergens,
            optional: optional
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