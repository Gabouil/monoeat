import "./SwitchButton.scss"

type SwitchButtonProps = {
    name: string;
    value: boolean;
    setValue?: (value: boolean) => void;
    setValueFonction?: () => void;
}

export default function SwitchButton({name, value, setValue, setValueFonction}: SwitchButtonProps) {
    return (
        <span className="switch">
            <input
                id={"checkbox" + name}
                className={"checkboxInput"}
                type="checkbox"
                name={name}
                checked={value}
                onChange={() => {
                    if (setValueFonction) {
                        setValueFonction();
                    } else if (setValue) {
                        setValue(!value);
                    }
                }}
            />
            <label htmlFor={"checkbox" + name} className="toggleSwitch"></label>
        </span>
    )
}