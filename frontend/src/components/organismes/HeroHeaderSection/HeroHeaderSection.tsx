import "./HeroHeaderSection.scss";
import Banner from "../../../assets/images/banniere_monoeat.png"
import Button from "../../atomes/buttons/Button/Button.tsx";
import ArrowDown from "../../../assets/pictos/arrow-down.tsx";

export default function HeroHeaderSection() {
    return (
        <>
            <section className="hero_header">
                <div className="hero_header__background">
                    <img src={Banner} alt="Bannière de Monoeat"/>
                    <span className="hero_header__background__border"/>
                </div>
                <div className="hero_header__content">
                    <h1 className="hero_header__content__title">
                        <span>De délicieux</span> repas à préparés à la maison et livrés à domicile
                    </h1>
                    <p className={"hero_header__content__text"}>
                        Découvrez la commodité des kits de repas à domicile de MonoEat. Grâce à nos boîtes d'ingrédients
                        frais et à nos recettes faciles à suivre, vous pouvez prendre plaisir à cuisiner des repas
                        équilibrés et savoureux sans avoir à vous soucier de la planification ou des achats.
                    </p>
                    <div className="hero_header__content__buttons">
                        <Button label={"Commander"} type={"NavLink"} />
                        <Button label={<ArrowDown />} type={"NavLink"}/>
                    </div>
                </div>
            </section>
        </>
    )
}