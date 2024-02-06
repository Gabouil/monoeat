import "./Backoffice.scss"
import BackofficeSection from "../../organismes/Backoffice/BackofficeSection.tsx";


export default function BackofficeIngredients() {

    return (
        <>
            <main className={"backoffice"}>
                <BackofficeSection content={""} link={"/backoffice"} title={"Gestion des ingrédients"}/>
            </main>
        </>
    )
}