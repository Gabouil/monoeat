import "./Home.scss"
import HeroHeaderSection from "../../organismes/HeroHeaderSection/HeroHeaderSection.tsx";
import FeatureSection from "../../organismes/FeatureSection/FeatureSection.tsx";
import Feature2Section from "../../organismes/FeatureSection/Feature2Section.tsx";
import Footer from "../../molecules/global/Footer/Footer.tsx";
import Header from "../../molecules/global/Header/Header.tsx";

export default function Home() {
    return (
        <>
            <Header/>
            <main>
                <HeroHeaderSection/>
                <FeatureSection/>
                <Feature2Section/>
            </main>
            <Footer newsLetter/>
        </>
    )
}