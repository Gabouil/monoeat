import "./Menu.scss"
import Footer from "../../molecules/global/Footer/Footer.tsx";
import Header from "../../molecules/global/Header/Header.tsx";
import HeroHeaderMenuSection from "../../organismes/HeroHeaderSection/HeroHeaderMenuSection.tsx";

export default function Menu() {
    return (
        <>
            <Header/>
            <main className={"home__page"}>
                <HeroHeaderMenuSection/>
            </main>
            <Footer newsLetter/>
        </>
    )
}