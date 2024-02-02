import "./FeatureSection.scss";
import Banner from "../../../assets/images/FeatureBanner2.png"
import Button from "../../atomes/buttons/Button/Button.tsx";

export default function Feature2Section() {
    return (
        <>
            <section className="feature_section feature_section--reverse">
                <h2 className="feature_section__title">
                    Découvrez la fraîcheur de nos ingrédients
                </h2>
                <div className="feature_section__banner">
                    <img src={Banner} alt="Banner"/>
                </div>
                <div className="feature_section__content--list">
                    <div className="feature_section__content__item">
                        <h3 className="feature_section__content__item__title">
                            Ingrédients frais
                        </h3>
                        <p className="feature_section__content__item__text">
                            On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est
                            source de distractions, et empêche de se concentrer sur la mise en page elle-même.
                        </p>
                    </div>
                    <div className="feature_section__content__item">
                        <h3 className="feature_section__content__item__title">
                            Repas délicieux et sains
                        </h3>
                        <p className="feature_section__content__item__text">
                            Contrairement à une opinion répandue, le Lorem Ipsum n'est pas simplement du texte
                            aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique datant
                            de 45 av. J.-C., le rendant vieux de 2000 ans.
                        </p>
                    </div>
                </div>
                <div className="feature_section__button">
                    <Button
                        label="Voir les recettes"
                        type="NavLink"
                        link="/menu"
                    />
                </div>
            </section>
        </>
    )
}