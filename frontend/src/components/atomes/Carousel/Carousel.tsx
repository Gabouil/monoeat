import React, {useState, useRef, useEffect} from "react";
import "./Carousel.scss";
import ChevronsRight from "../../../assets/pictos/chevron-right.tsx";
import ChevronLeft from "../../../assets/pictos/chevron-left.tsx";

type PropsType = {
    carouselItems: React.ReactNode;
    carouselItemClassName: string;
};

export default function Carousel({carouselItems, carouselItemClassName}: PropsType) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [cardItemTranslateX, setCardItemTranslateX] = useState(0);
    const cardContentGap = 40;


    const scrollRightByOneCard = () => {
        const cardItemWidth = (document.getElementsByClassName(carouselItemClassName)[0] as HTMLElement).offsetWidth
        const cardContentMaxWidth = (document.getElementsByClassName("carousel__content")[0] as HTMLElement).offsetWidth
        const carouselContainerWidth = (document.getElementsByClassName("carousel__container")[0] as HTMLElement).offsetWidth
        const newTranslateX = cardItemTranslateX - cardItemWidth - cardContentGap;

        if (cardItemTranslateX == 0) {
            setCardItemTranslateX(cardItemTranslateX - cardItemWidth);
            return
        } else if (newTranslateX < -cardContentMaxWidth + carouselContainerWidth && cardItemTranslateX > -cardContentMaxWidth + carouselContainerWidth) {
            setCardItemTranslateX(-cardContentMaxWidth + carouselContainerWidth);
            return
        }
        setCardItemTranslateX(newTranslateX <= -cardContentMaxWidth + carouselContainerWidth ? 0 : newTranslateX);
    }

    const scrollLeftByOneCard = () => {
        const cardItemWidth = (document.getElementsByClassName(carouselItemClassName)[0] as HTMLElement).offsetWidth
        const cardContentMaxWidth = (document.getElementsByClassName("carousel__content")[0] as HTMLElement).offsetWidth
        const carouselContainerWidth = (document.getElementsByClassName("carousel__container")[0] as HTMLElement).offsetWidth
        const newTranslateX = cardItemTranslateX + cardItemWidth + cardContentGap;

        if (cardItemTranslateX >= 0) {
            setCardItemTranslateX(-cardContentMaxWidth + carouselContainerWidth);
            return
        } else if (newTranslateX > 0 && cardItemTranslateX < 0) {
            setCardItemTranslateX(0);
            return
        }
        setCardItemTranslateX(newTranslateX == 0 ? 0 : newTranslateX);
    };

    return (
        <div className="carousel">
            <button className="carousel__button carousel__button--left" onClick={scrollLeftByOneCard}><ChevronLeft/>
            </button>
            <div
                className="carousel__container"
                ref={carouselRef}
            >
                <div className="carousel__content unselectable"
                     style={{transform: `translateX(${cardItemTranslateX}px)`}}
                >
                    {carouselItems}
                </div>
            </div>
            <button className="carousel__button carousel__button--right" onClick={scrollRightByOneCard}><ChevronsRight/>
            </button>
        </div>
    );
}