// Accordion.tsx
import "./Accordion.scss";
import Chevron from "../../../assets/pictos/chevron.tsx";
import React from "react";

type defaultProps = {
    Title: string,
    Content: React.ReactNode | string,
    isOpen: boolean,
    onHeaderClick: (title: string) => void
    type?: "radio"
}
export default function Accordion({Title, Content, isOpen, onHeaderClick, type}: defaultProps) {
    if (type === "radio") {
        return (
            <div className="accordion">
                <div className="accordion__header accordion__header--left" onClick={() => onHeaderClick(Title)}>
                    <span className={isOpen ? "accordion__header--left__radio accordion__header--left__radio--open" : "accordion__header--left__radio"}>

                    </span>
                    <h3>{Title}</h3>
                </div>
                <div
                    className={isOpen ? "accordion__text__container accordion__text__container--open" : "accordion__text__container"}>
                    <div className="accordion__text__content">
                        {Content}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="accordion">
                <div className="accordion__header" onClick={() => onHeaderClick(Title)}>
                    <h3>{Title}</h3>
                    <span>
                        <Chevron Rotate={isOpen ? "270" : "180"}/>
                    </span>
                </div>
                <div
                    className={isOpen ? "accordion__text__container accordion__text__container--open" : "accordion__text__container"}>
                    <div className="accordion__text__content">
                        {Content}
                    </div>
                </div>
            </div>
        )
    }
}