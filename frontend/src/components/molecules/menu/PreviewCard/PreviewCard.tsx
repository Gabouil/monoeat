import "./PreviewCard.scss";
import {NavLink} from "react-router-dom";
import React from "react";

type defaultProps = {
    "image": string,
    "title": string,
    "text": string,
    "link": string
}

export default function PreviewCard({image, title, text, link}: defaultProps) {
    const preventDrag = (event: React.DragEvent) => {
        event.preventDefault();
    };

    return (
        <NavLink className="preview_card" to={link} onDragStart={preventDrag} >
            <img src={image} alt={title}/>
            <div className="preview_card__content">
                <h3 className="preview_card__content__title">{title}</h3>
                <p className="preview_card__content__text">{text}</p>
            </div>
        </NavLink>
    )
}