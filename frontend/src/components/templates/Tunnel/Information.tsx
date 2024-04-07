import "./Tunnel.scss"
import Footer from "../../molecules/global/Footer/Footer.tsx";
import HeaderMenu from "../../molecules/menu/HeaderMenu/HeaderMenu.tsx";

export default function Information() {

    return (
        <>
            <HeaderMenu section={"information"}/>
            <main className={"menu__page"}>
            </main>
            <Footer newsLetter/>
        </>
    )
}