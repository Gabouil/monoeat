import { useState } from "react";
import "./FAQSection.scss"
import Accordion from "../../atomes/Accordion/Accordion.tsx";

export default function FAQSection() {
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    const handleAccordionClick = (title: string) => {
        setOpenAccordion(prevTitle => prevTitle === title ? null : title);
    };

    return (
        <section className="faq">
            <div className="faq__header">
                <h2 className="faq__title">Les questions les plus fréquentes</h2>
                <p className="faq__text">Trouvez les réponses aux questions les plus courantes sur nos kits repas, lesabonnements, la livraison et la préparation.</p>
            </div>
            <div className="faq__accordion">
                <Accordion
                    Title={"Comment commander ?"}
                    Content={"Pour commander nos kits de repas, il vous suffit de choisir les repas souhaités dans notre menu, de sélectionner le nombre de portions et de passer à la caisse. C'est aussi simple que cela !"}
                    isOpen={openAccordion === "Comment commander ?"}
                    onHeaderClick={handleAccordionClick}
                />
                <Accordion
                    Title={"Qu'est-ce qui est inclus ?"}
                    Content={"Chaque kit repas comprend tous les ingrédients frais dont vous avez besoin pour préparer la recette, ainsi qu'une fiche de recette détaillée avec des instructions étape par étape."}
                    isOpen={openAccordion === "Qu'est-ce qui est inclus ?"}
                    onHeaderClick={handleAccordionClick}
                />
                <Accordion
                    Title={"Comment fonctionne la livraison ?"}
                    Content={"Nous livrons nos kits repas directement à votre porte le jour de livraison prévu. Notre emballage garantit la fraîcheur des ingrédients pendant le transport."}
                    isOpen={openAccordion === "Comment fonctionne la livraison ?"}
                    onHeaderClick={handleAccordionClick}
                />
                <Accordion
                    Title={"Puis-je personnaliser mes repas ?"}
                    Content={"Oui, vous pouvez personnaliser vos repas en choisissant parmi nos menus hebdomadaires. Nous proposons une variété de plats pour répondre aux différentes préférences alimentaires."}
                    isOpen={openAccordion === "Puis-je personnaliser mes repas ?"}
                    onHeaderClick={handleAccordionClick}
                />
                <Accordion
                    Title={"Combien de temps les repas restent frais ?"}
                    Content={"Nos ingrédients sont soigneusement sélectionnés et emballés pour garantir leur fraîcheur. Chaque kit repas comporte une date de consommation recommandée, généralement dans les 3 à 7 jours suivant la livraison."}
                    isOpen={openAccordion === "Combien de temps les repas restent frais ?"}
                    onHeaderClick={handleAccordionClick}
                />
            </div>
        </section>
    )
}