import "./Accordion.scss";
import {useState} from "react";
import Chevron from "../../../assets/pictos/chevron.tsx";

type defaultProps = {
    Title: string,
    Content: string
}
export default function Accordion({Title, Content}: defaultProps) {
    const [open, setOpen] = useState(false)
    return (
        <div className="accordion">
            <div className="accordion__header" onClick={() => setOpen(!open)}>
                <h3>{Title}</h3>
                <button>
                    <Chevron Rotate={open ? "270" : "180"} />
                </button>
            </div>
            <div className={open ? "accordion__text__container accordion__text__container--open" : "accordion__text__container"}>
                <div className="accordion__text__content">
                    <p>{Content}</p>
                </div>
            </div>
        </div>
    )
}