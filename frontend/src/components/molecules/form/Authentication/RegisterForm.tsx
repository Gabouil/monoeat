import "./AuthenticationForm.scss"
import React from "react";
import Input from "../../../atomes/inputs/Input/Input.tsx";

type defaultProps = {
    firstname: string,
    setFirstname:  React.Dispatch<React.SetStateAction<string>>
    lastname: string,
    setLastname: React.Dispatch<React.SetStateAction<string>>
    email: string,
    setEmail:  React.Dispatch<React.SetStateAction<string>>
    phone: string,
    setPhone:  React.Dispatch<React.SetStateAction<string>>
    password: string,
    setPassword:  React.Dispatch<React.SetStateAction<string>>
    confirmPassword: string,
    setConfirmPassword:  React.Dispatch<React.SetStateAction<string>>
}

export default function RegisterForm({
                                         firstname,
                                         setFirstname,
                                         lastname,
                                         setLastname,
                                         email,
                                         setEmail,
                                         phone,
                                         setPhone,
                                         password,
                                         setPassword,
                                         confirmPassword,
                                         setConfirmPassword,
                                     }: defaultProps) {
    return (
        <>
            <form name={"registerForm"} className="authentication__form">
                <div className="authentication__form__ligne">
                    <Input
                        type={"text"}
                        placeholder={"Prénom"}
                        name={"firstname"}
                        value={firstname}
                        setValue={setFirstname}
                        color
                        specialCharOFF={true}
                    />
                    <Input
                        type={"text"}
                        placeholder={"Nom"}
                        name={"lastname"}
                        value={lastname}
                        setValue={setLastname}
                        color
                        specialCharOFF={true}
                    />
                </div>
                <Input
                    type={"email"}
                    placeholder={"Email"}
                    name={"email"}
                    value={email}
                    setValue={setEmail}
                    color
                />
                <Input
                    type={"tel"}
                    placeholder={"Téléphone"}
                    name={"phone"}
                    value={phone}
                    setValue={setPhone}
                    color
                />
                <Input
                    type={"password"}
                    placeholder={"Mot de passe"}
                    name={"password"}
                    value={password}
                    setValue={setPassword}
                    color
                />
                <Input
                    type={"cfPassword"}
                    placeholder={"Confirmer le mot de passe"}
                    name={"confirmPassword"}
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    color
                    cfPassordValue={password}
                />
            </form>
        </>
    )
}