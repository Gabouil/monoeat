import "./Backoffice.scss"
import BackofficeSection from "../../organismes/Backoffice/BackofficeSection.tsx";


export default function BackofficeRecipes() {

    return (
        <>
            <main className={"backoffice"}>
                <BackofficeSection content={""} link={"/backoffice"} title={"Gestion des recettes"}/>
            </main>
        </>
    )
}