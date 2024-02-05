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
    specialCharOFF?: boolean;
    cfPassordValue?: string;
}

export default function Input({
                                  type,
                                  placeholder,
                                  name,
                                  value,
                                  setValue,
                                  required = false,
                                  color = false,
                                  specialCharOFF = false,
                                  cfPassordValue
                              }: InputProps) {
    const [showPassword, setShowPassword] = useState(false)
    const changeValue = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setValue(event.target.value)
    }

    return (
        <>
            {type === 'password' && (
                <label className="group group__password">
                    <input
                        className={color ? "input color" : "input"}
                        type={showPassword ? "text" : "password"}
                        required={required}
                        name={name}
                        value={value}
                        onChange={changeValue}
                        placeholder="  "
                        autoComplete={"password"}
                        minLength={8}
                        maxLength={30}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[=_.!@#$%^&\\+]).{8,30}"
                    />
                    <span className="group__password__show" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeClose/> : <EyeOpen/>}
                        </span>
                    <span className="bar"></span>
                    <label>{placeholder}</label>
                </label>
            )}
            {type === 'cfPassword' && (
                <label className="group group__password">
                    <input
                        className={color ? "input color" : "input"}
                        type={showPassword ? "text" : "password"}
                        required={required}
                        name={name}
                        value={value}
                        onChange={changeValue}
                        placeholder="  "
                        pattern={cfPassordValue === value ? ".*" : "a^"}
                    />
                    <span className="group__password__show" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeClose/> : <EyeOpen/>}
                        </span>
                    <span className="bar"></span>
                    <label>{placeholder}</label>
                </label>
            )}
            {type === 'tel' && (
                <label className="group">
                    <input
                        className={color ? "input color" : "input"}
                        pattern={"^0[1-9][0-9]{8}$"}
                        type={type}
                        required={required}
                        name={name}
                        value={value}
                        onChange={changeValue}
                        placeholder="  "
                    />
                    <span className="bar"></span>
                    <label>{placeholder}</label>
                </label>
            )}

            {type !== 'password' && type !== 'tel' && type !== 'cfPassword' && (
                <label className="group">
                    <input
                        className={color ? "input color" : "input"}
                        type={type}
                        required={required}
                        name={name}
                        value={value}
                        onChange={changeValue}
                        placeholder="  "
                        pattern={specialCharOFF ? "^[a-zA-Z\\-']*$" : ".*"}
                    />
                    <span className="bar"></span>
                    <label>{placeholder}</label>
                </label>
            )}
        </>
    )
}