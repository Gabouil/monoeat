import "./MenuPeviewSection.scss";
import Button from "../../atomes/buttons/Button/Button.tsx";
import Rapido from "../../../assets/images/menu_category/rapido.png";
import Entree from "../../../assets/images/menu_category/entree.png";
import Dessert from "../../../assets/images/menu_category/dessert.png";
import exotique from "../../../assets/images/menu_category/exotique.png";
import prenium from "../../../assets/images/menu_category/prenium.png";
import poissonLegumes from "../../../assets/images/menu_category/poisson_legumes.png";
import PreviewCard from "../../molecules/menu/PreviewCard/PreviewCard.tsx";
import Carousel from "../../atomes/Carousel/Carousel.js";

export default function MenuPeviewSection() {
    return (
        <>
            <section className="menu_preview">
                <div className="menu_preview__content">
                    <h2 className="menu_preview__title">Des recettes pour tous les gouts !</h2>
                    <p className="menu_preview__text">Chaque semaine, nous vous proposons de nouvelles recettes pour
                        vous régaler !</p>
                </div>
                <Carousel
                    carouselItems={
                        <>
                            <PreviewCard
                                image={Rapido}
                                title={"Rapido"}
                                text={"Des recettes rapides à réaliser"}
                                link={"/menu?rapido"}
                            />
                            <PreviewCard
                                image={exotique}
                                title={"Exotique"}
                                text={"Des recettes venues d'ailleurs"}
                                link={"/menu?exotique"}
                            />
                            <PreviewCard
                                image={prenium}
                                title={"Prenium"}
                                text={"Des recettes pour les grandes occasions"}
                                link={"/menu?prenium"}
                            />
                            <PreviewCard
                                image={poissonLegumes}
                                title={"Poisson et Légumes"}
                                text={"Des recettes pour des repas sains"}
                                link={"/menu?poisson_legumes"}
                            />
                            <PreviewCard
                                image={Entree}
                                title={"Entrée"}
                                text={"Des recettes pour bien commencer le repas"}
                                link={"/menu?entree"}
                            />
                            <PreviewCard
                                image={Dessert}
                                title={"Dessert"}
                                text={"Des recettes pour finir le repas en beauté"}
                                link={"/menu?dessert"}
                            />
                        </>
                    }
                    carouselItemClassName={"preview_card"}
                />
                <Button link={"/menu"} label={"Voir le menu"} type={"NavLink"}/>
            </section>
        </>
    )
}