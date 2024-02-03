import "./AuthenticationForm.scss"
import React from "react";
import Input from "../../../atomes/inputs/Input/Input.tsx";

type defaultProps = {
    email: string,
    setEmail:  React.Dispatch<React.SetStateAction<string>>
    password: string,
    setPassword:  React.Dispatch<React.SetStateAction<string>>
}

export default function LoginForm({
                                         email,
                                         setEmail,
                                         password,
                                         setPassword,
                                     }: defaultProps) {
    return (
        <>
            <form name={"loginForm"} className="authentication__form">
                <div className="authentication__form__ligne">
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
                    type={"password"}
                    placeholder={"Mot de passe"}
                    name={"password"}
                    value={password}
                    setValue={setPassword}
                    color
                />
            </form>
        </>
    )
}