import './Input.scss';
import React, {useState} from "react";
import EyeOpen from "../../../../assets/pictos/input/eye-open.tsx";
import EyeClose from "../../../../assets/pictos/input/eye-close.tsx";

interface InputProps {
    type: string;
    placeholder: string;
    name: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    required?: boolean;
    color?: boolean;
}

export default function Input({type, placeholder, name, value, setValue, required = false, color = false}: InputProps) {
    const [showPassword, setShowPassword] = useState(false)
    const changeValue = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setValue(event.target.value)
    }

    return (
        <>
            {type === 'password' && (
                <div className="group group__password">
                    <input className={color ? "input color" : "input"} type={showPassword ? "text" : "password"} required={required} name={name}
                           value={value} onChange={changeValue} placeholder="  "/>
                    <span className="group__password__show" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeClose/> : <EyeOpen/>}
                        </span>
                    <span className="bar"></span>
                    <label>{placeholder}</label>
                </div>
            )}
            {type != 'password' && (
                <div className="group">
                    <input className={color ? "input color" : "input"} type={type} required={required} name={name}
                           value={value} onChange={changeValue} placeholder="  "/>
                    <span className="bar"></span>
                    <label>{placeholder}</label>
                </div>
            )}
        </>
    )
}