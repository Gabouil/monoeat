import "./Backoffice.scss"
import Button from "../../atomes/buttons/Button/Button.tsx";
import BackofficeSection from "../../organismes/Backoffice/BackofficeSection.tsx";


export default function Backoffice() {

    return (
        <>
            <main className={"backoffice"}>
                <BackofficeSection
                    content={
                        <>
                            <Button label={"Gestion des utilisateurs"} link={"/backoffice/users"} type={"NavLink"}/>
                            <Button label={"Gestion des commandes"} link={"/backoffice/orders"} type={"NavLink"}/>
                            <Button label={"Gestion des recettes"} link={"/backoffice/recipes"} type={"NavLink"}/>
                            <Button label={"Gestion des ingrédients"} link={"/backoffice/ingredients"} type={"NavLink"}/>
                        </>
                    }
                    link={"/"}
                    title={"Backoffice"}
                />
            </main>
        </>
    )
}