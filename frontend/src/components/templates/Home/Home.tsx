import "./Home.scss"
import HeroHeaderSection from "../../organismes/HeroHeaderSection/HeroHeaderSection.tsx";
import FeatureSection from "../../organismes/FeatureSection/FeatureSection.tsx";
import Feature2Section from "../../organismes/FeatureSection/Feature2Section.tsx";
import Footer from "../../molecules/global/Footer/Footer.tsx";
import Header from "../../molecules/global/Header/Header.tsx";
import MenuPeviewSection from "../../organismes/MenuPreviewSection/MenuPeviewSection.tsx";
import FAQSection from "../../organismes/FAQSection/FAQSection.tsx";

export default function Home() {
    return (
        <>
            <Header/>
            <main className={"home__page"}>
                <HeroHeaderSection/>
                <FeatureSection/>
                <Feature2Section/>
                <MenuPeviewSection/>
                <FAQSection/>
            </main>
            <Footer newsLetter/>
        </>
    )
}