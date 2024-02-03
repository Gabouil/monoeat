import "./404.scss"
import Header from "../../molecules/global/Header/Header.tsx";
import Footer from "../../molecules/global/Footer/Footer.tsx";
import Button from "../../atomes/buttons/Button/Button.tsx";
import notFoundSVG from "../../../assets/images/404.svg"
export default function NotFound() {
    return (
        <>
            <Header/>
            <main className="not_found">
                <div className={"not_found__content"}>
                    <img src={notFoundSVG} alt="404"/>
                    <h1>404</h1>
                    <p>Je crois que la page que vous cherchez n'est pas là</p>
                </div>
                <Button link="/" label="Retour à l'accueil" type="NavLink"/>
            </main>
            <Footer/>
        </>
    )
}