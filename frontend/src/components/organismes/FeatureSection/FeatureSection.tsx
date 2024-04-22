import "./FeatureSection.scss";
import Banner from "../../../assets/images/FeatureBanner1.png"
import Button from "../../atomes/buttons/Button/Button.tsx";

export default function FeatureSection() {
    return (
        <>
            <section className="feature_section">
                <h2 className="feature_section__title">
                    Des recettes faciles à suivre pour des repas savoureux à la maison
                </h2>
                <div className="feature_section__banner">
                    <a href={"https://www.famileat.fr/"}>
                        <img src={Banner} alt="Banner"/>
                    </a>
                </div>
                <div className="feature_section__content">
                    <div className="feature_section__content__item">
                        <h3 className="feature_section__content__item__title">
                            Préparation rapide
                        </h3>
                        <p className="feature_section__content__item__text">
                            Gagnez du temps en cuisine grâce à nos kits de repas rapides et pratiques.
                        </p>
                    </div>
                    <div className="feature_section__content__item">
                        <h3 className="feature_section__content__item__title">
                            Variété d'options
                        </h3>
                        <p className="feature_section__content__item__text">
                            Choisissez parmi un large éventail de recettes pour répondre à vos goûts et à vos
                            préférences alimentaires.
                        </p>
                    </div>
                    <div className="feature_section__content__item">
                        <h3 className="feature_section__content__item__title">
                            Qualité
                        </h3>
                        <p className="feature_section__content__item__text">
                            Nous sélectionnons soigneusement chaque ingrédient pour nous assurer qu'il répond à nos
                            normes de qualité strictes.
                        </p>
                    </div>
                    <div className="feature_section__content__item">
                        <h3 className="feature_section__content__item__title">
                            Commodité
                        </h3>
                        <p className="feature_section__content__item__text">
                            Avec MonoEat, vous pouvez profiter de la commodité d'avoir des ingrédients frais livrés
                            à
                            votre porte.
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