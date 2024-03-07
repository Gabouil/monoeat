import "./Backoffice.scss"
import BackofficeRecipesForm from "../../organismes/Backoffice/BackofficeRecipesForm.tsx";

export default function BackofficeRecipeId() {
    return (
        <main className={"backoffice"}>
            <BackofficeRecipesForm formType={"update"}/>
        </main>
    )
}