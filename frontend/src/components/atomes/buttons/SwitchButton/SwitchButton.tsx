import "./SwitchButton.scss"

type SwitchButtonProps = {
    name: string;
    value: boolean;
    setValue: (value: boolean) => void;
}
export default function SwitchButton({name, value, setValue}: SwitchButtonProps) {
    return (
        <span className="switch">
            <input id={"checkbox" + name} className={"checkboxInput"} type="checkbox" name={name} checked={value} onClick={() => setValue(!value)}/>
            <label htmlFor={"checkbox" + name} className="toggleSwitch"></label>
        </span>
    )
}