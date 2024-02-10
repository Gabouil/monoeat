import './Input.scss';
import {useState} from "react";
import Chevron from "../../../../assets/pictos/chevron.tsx";

interface ContentProps {
    value: string
    option: string
}

interface InputProps {
    optionSelected: number
    setOptionSelected: (id: number) => void
    contents: ContentProps[]
    setValue: (value: string, id: number, typeSetValue?: string) => void
    typeSetValue?: string
    label: string
}

export default function SelectInput({
                                        optionSelected, setOptionSelected, contents, setValue, typeSetValue, label
                                    }: InputProps) {
    const [showOptionTrue, setShowOptionTrue] = useState(false)

    const showOptions = () => {
        setShowOptionTrue(!showOptionTrue)
    }

    const selctOption = (value: string, id: number) => {
        setShowOptionTrue(false)
        setOptionSelected(id)
        if (typeSetValue !== undefined) {
            setValue(value, id, typeSetValue)
        } else {
            setValue(value, id)
        }
    }


    return (
        <>
            <div className="input">
                {label && <label className={"input__label"}>{label}</label>}
                <div className="input__container">
                    <div onClick={showOptions} className="input__container__content input__container__content__select">
                        <p>{contents[optionSelected].value}</p>
                        <span className={"input__container__content__select__button"}>
                            <Chevron Rotate={showOptionTrue ? "270" : "180"}/>
                        </span>
                    </div>
                </div>
                {showOptionTrue ? <span className={"overlay"} onClick={showOptions}/> : <></>}
                <ul className={showOptionTrue ? "input__options input__options--visible" : "input__options"}>
                    {contents.map((content, i) => {
                        return (
                            <li key={i} onClick={() => selctOption(content.value, i)}>
                                {content.value}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}