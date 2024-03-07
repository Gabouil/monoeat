import "./Backoffice.scss";
import BackofficeRecipesForm from "../../organismes/Backoffice/BackofficeRecipesForm.tsx";

export default function BackofficeRecipeAdd() {
    return (
        <main className={"backoffice"}>
            <BackofficeRecipesForm formType={"create"}/>
        </main>
    )
}