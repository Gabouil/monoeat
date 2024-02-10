import './Input.scss';
import React, {useState} from "react";
import EyeOpen from "../../../../assets/pictos/input/eye-open.tsx";
import EyeClose from "../../../../assets/pictos/input/eye-close.tsx";

interface InputProps {
    type: string;
    placeholder: string;
    label?: string;
    name: string;
    value: string | number;
    setValue: any;
    required?: boolean;
    color?: boolean;
    specialCharOFF?: boolean;
    cfPasswordValue?: string;
    idInput?: string ;
}

export default function Input({
                                  type,
                                  label,
                                  placeholder,
                                  name,
                                  value,
                                  setValue,
                                  required = false,
                                  color = false,
                                  specialCharOFF = false,
                                  cfPasswordValue,
                                  idInput
                              }: InputProps) {
    const [showPassword, setShowPassword] = useState(false)

    const changeValue = (event: { target: { value: string | number; }; }) => {
        if (idInput !== undefined) {
            setValue(event.target.value, idInput);
        } else {
            if (typeof event.target.value === 'string') {
                (setValue as React.Dispatch<React.SetStateAction<string>>)(event.target.value);
            } else {
                (setValue as React.Dispatch<React.SetStateAction<number>>)(event.target.value);
            }
        }
    }

    return (
        <>
            {type === 'password' && (
                <div className="input">
                    {label && <label htmlFor={name} className={"input__label"}>{label}</label>}
                    <div className="input__container">
                        <input
                            className={color ?
                                "input__container__color input__container__content input__container__content__password"
                                : "input__container__content input__container__content__password"
                            }
                            type={showPassword ? "text" : "password"}
                            required={required}
                            name={name}
                            value={value}
                            onChange={changeValue}
                            placeholder={placeholder}
                            autoComplete={"password"}
                            minLength={8}
                            maxLength={30}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[=_.!@#$%^&\\+]).{8,30}"
                        />
                        <span className="input__container__content__password__button"
                              onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeClose/> : <EyeOpen/>}
                    </span>
                    </div>
                </div>
            )}
            {type === 'cfPassword' && (
                <div className="input">
                    {label && <label htmlFor={name} className={"input__label"}>{label}</label>}
                    <div className="input__container">
                        <input
                            className={color ?
                                "input__container__color input__container__content input__container__content__password"
                                : "input__container__content input__container__content__password"
                            }
                            type={showPassword ? "text" : "password"}
                            required={required}
                            name={name}
                            value={value}
                            onChange={changeValue}
                            placeholder={placeholder}
                            pattern={cfPasswordValue === value ? ".*" : "a^"}
                        />
                        <span className="input__container__content__password__button"
                              onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeClose/> : <EyeOpen/>}
                    </span>
                    </div>
                </div>
            )}
            {type === 'tel' && (
                <div className="input">
                    {label && <label htmlFor={name} className={"input__label"}>{label}</label>}
                    <div className="input__container">
                        <input
                            className={color ? "input__container__color input__container__content" : "input__container__content"}
                            pattern={"^0[1-9][0-9]{8}$"}
                            type={type}
                            required={required}
                            name={name}
                            value={value}
                            onChange={changeValue}
                            placeholder={placeholder}
                        />
                    </div>
                </div>
            )}

            {type !== 'password' && type !== 'tel' && type !== 'cfPassword' && (
                <div className="input">
                    {label && <label htmlFor={name} className={"input__label"}>{label}</label>}
                    <div className="input__container">
                        <input
                            className={color ? "input__container__color input__container__content" : "input__container__content"}
                            type={type}
                            required={required}
                            name={name}
                            value={value}
                            onChange={changeValue}
                            placeholder={placeholder}
                            pattern={specialCharOFF ? "^[a-zA-Z\\-']*$" : ".*"}
                        />
                    </div>
                </div>
            )}
        </>
    )
}