import "./Backoffice.scss"
import BackofficeSection from "../../organismes/Backoffice/BackofficeSection.tsx";


export default function BackofficeOrders() {

    return (
        <>
            <main className={"backoffice"}>
                <BackofficeSection content={""} link={"/backoffice"} title={"Gestion des commandes"}/>
            </main>
        </>
    )
}