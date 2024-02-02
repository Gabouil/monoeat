// Accordion.tsx
import "./Accordion.scss";
import Chevron from "../../../assets/pictos/chevron.tsx";

type defaultProps = {
    Title: string,
    Content: string,
    isOpen: boolean,
    onHeaderClick: (title: string) => void
}
export default function Accordion({Title, Content, isOpen, onHeaderClick}: defaultProps) {
    return (
        <div className="accordion">
            <div className="accordion__header" onClick={() => onHeaderClick(Title)}>
                <h3>{Title}</h3>
                <span>
                    <Chevron Rotate={isOpen ? "270" : "180"} />
                </span>
            </div>
            <div className={isOpen ? "accordion__text__container accordion__text__container--open" : "accordion__text__container"}>
                <div className="accordion__text__content">
                    <p>{Content}</p>
                </div>
            </div>
        </div>
    )
}