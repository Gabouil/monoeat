import "./Backoffice.scss"
import BackofficeSection from "../../organismes/Backoffice/BackofficeSection.tsx";
import {useParams} from "react-router-dom";
import useGetAllRecipe from "../../../services/hooks/useGetAllRecipe.tsx";
import {useEffect, useState} from "react";
import SwitchButton from "../../atomes/buttons/SwitchButton/SwitchButton.tsx";
import useGetMenuByDate from "../../../services/hooks/useGetMenuByDate.tsx";
import useCreateMenu from "../../../services/hooks/useCreateMenu.tsx";
import Button from "../../atomes/buttons/Button/Button.tsx";
import useUpdateMenuByDate from "../../../services/hooks/useUpdateMenuByDate.tsx";

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
export default function BackofficeMenuEdit() {
    const getRecipes = useGetAllRecipe();

    const getMenu = useGetMenuByDate();
    const createMenu = useCreateMenu();
    const updateMenu = useUpdateMenuByDate()

    const { date: dateParam } = useParams<{ date?: string }>();
    const date = dateParam || "2000-01-01";
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<{ onLine: boolean, id: string }[]>([]);

    const [category, setCategory] = useState("Selectionner une catégorie");
    const [categoryData] = useState([
        {value: "Selectionner une catégorie", option: "filtre"},
        {value: "entrées", option: "entrées"},
        {value: "plats", option: "plats"},
        {value: "desserts", option: "desserts"},
        {value: "autres", option: "autres"}
    ])
    const [categorySelected, setCategorySelected] = useState(0)

    const changeValue = (value: string, id: number) => {
        setCategory(value)
        setCategorySelected(id)
    }

    const [menu, setMenu] = useState<string[]>([]);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [limitItems, setLimitItems] = useState(20);
    const [recipeSelectedOnly, setRecipeSelectedOnly] = useState(false);


    useEffect(() => {
        (async () => {
            const dataRecipe = await getRecipes();
            let dataNew: { onLine: boolean, id: string }[] = [];
            dataRecipe.map((recipe: Recipe) => {
                dataNew = [...dataNew, {onLine: false, id: recipe._id}]
            });

            if (date) {
                const data = await getMenu(date);
                if (data) {
                    setMenu(data.recipes);
                    dataNew.map((recipe) => {
                        if (data.recipes.includes(recipe.id)) {
                            recipe.onLine = true;
                        }
                    });
                } else {
                    const result = await createMenu({date, recipes: []});
                    if (result.status === 401 || result.status === 400) {
                        console.error('Create menu error:', result.data.error);
                    } else {
                        console.log('Menu create:', result);
                    }
                }
            }

            setRecipes(dataRecipe);
            setFilteredRecipes(dataNew);
        })();
    }, []);

    const handleAddRecipe = (id: string) => {
        const newMenu = [...menu];
        if (newMenu.includes(id)) {
            newMenu.splice(newMenu.indexOf(id), 1);
        }
        else {
            newMenu.push(id);
        }
        setMenu(newMenu);

        const newFilteredRecipes = filteredRecipes.map((recipe) => {
            if (newMenu.includes(recipe.id)) {
                return {...recipe, onLine: true};
            } else {
                return {...recipe, onLine: false};
            }
        });
        setFilteredRecipes(newFilteredRecipes);
    }

    const saveMenu = async () => {
        const data = {
            recipes: menu,
            date: date
        }
        const result = await updateMenu(data);
        if (result.status === 401 || result.status === 400) {
            console.error('Update menu error:', result.data.error);
        } else {
            console.log('Menu update:', result);
        }
    }

    return (
        <>
            <main className={"backoffice"}>
                <BackofficeSection content={
                    <>
                        <Button  label={"Enregistrer"} onclick={saveMenu}/>
                        <table>
                            <thead>
                            <tr className={"table__color--1"}>
                                <th scope="col">Name</th>
                                <th scope="col" className={"table--noMobile450"}>category</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredRecipes && filteredRecipes.map((recipe, id: number) => {
                                const recipeDetail = recipes.find((recipeDetail) => recipeDetail._id === recipe.id);
                                return (
                                    <tr key={recipe.id}
                                        className={id % 2 === 0 ? "table__color--2" : "table__color--1"}>
                                        <td>{recipeDetail && recipeDetail.name}</td>
                                        <td className={"table--noMobile450"}>{recipeDetail && recipeDetail.category}</td>
                                        <td>
                                            <SwitchButton
                                                name={recipe.id}
                                                setValueFonction={() => handleAddRecipe(recipe.id)}
                                                value={recipe.onLine}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </>
                } link={"/backoffice/menus"} title={"Gestion du menu du " + date}/>
            </main>
        </>
    )
}