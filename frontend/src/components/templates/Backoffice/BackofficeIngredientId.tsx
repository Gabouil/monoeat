import "./Backoffice.scss"
import BackofficeIngredientsForm from "../../organismes/Backoffice/BackofficeIngredientsForm.tsx";


export default function BackofficeIngredientId() {
    return (
        <>
            <main className={"backoffice"}>
                <BackofficeIngredientsForm formType={"update"}/>
            </main>
        </>
    )
}