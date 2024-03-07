import "./Backoffice.scss"
import BackofficeIngredientsForm from "../../organismes/Backoffice/BackofficeIngredientsForm.tsx";

export default function BackofficeIngredientAdd() {

    return (
        <>
            <main className={"backoffice"}>
                <BackofficeIngredientsForm formType={"create"} />
            </main>
        </>
    )
}