import "./Home.scss"
import HeroHeaderSection from "../../organismes/HeroHeaderSection/HeroHeaderSection.tsx";
import FeatureSection from "../../organismes/FeatureSection/FeatureSection.tsx";
import Feature2Section from "../../organismes/FeatureSection/Feature2Section.tsx";

export default function Home() {
    return (
        <>
            <HeroHeaderSection/>
            <FeatureSection/>
            <Feature2Section/>
        </>
    )
}