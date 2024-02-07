import './SelectInput.scss';
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
    setValue: (value: string, id: number) => void
    label: string
}

export default function SelectInput({
                                        optionSelected, setOptionSelected, contents, setValue, label
                                    }: InputProps) {
    const [showOptionTrue, setShowOptionTrue] = useState(false)

    const showOptions = () => {
        setShowOptionTrue(!showOptionTrue)
    }

    const selctOption = (value: string, id: number) => {
        setShowOptionTrue(false)
        setOptionSelected(id)
        setValue(value, id)
    }


    return (
        <>
            <label className={showOptionTrue ? "group__select group__select--visible" : "group__select"}>
                <label>{label}</label>
                <div onClick={showOptions} className="input input__select">
                    <span>{contents[optionSelected].value}</span>
                    <span>
                        <Chevron Rotate={showOptionTrue ? "270" : "180"}/>
                    </span>
                </div>
                <span className="bar"></span>
                {showOptionTrue ? <span className={"overlay"} onClick={showOptions}/> : <></>}
                <ul className={showOptionTrue ? "options options--visible" : "options"}>
                    {contents.map((content, i) => {
                        return (
                            <li onClick={() => selctOption(content.value, i)}
                                className={showOptionTrue ? "option option-visible" : "option"}>
                                {content.value}
                            </li>
                        )
                    })}
                </ul>
            </label>
        </>
    )
}