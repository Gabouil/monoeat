import "./AuthenticationForm.scss"
import React, {useState} from "react";
import Input from "../../../atomes/inputs/Input/Input.tsx";
import Button from "../../../atomes/buttons/Button/Button.tsx";
import Link from "../../../atomes/buttons/Link/Link.tsx";
import XClose from "../../../../assets/pictos/x-close.tsx";
import Cookies from "js-cookie";
import useRegister from "../../../../../services/hooks/useRegister.tsx";
import useLogin from "../../../../../services/hooks/useLogin.tsx";

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

    const [error, setError] = useState("");
    const register = useRegister();
    const login = useLogin();

    const handleRegister = async (e:React.FormEvent) => {
        e.preventDefault();
        const formData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            password: password,
            confirmpassword: confirmPassword
        }
        const result = await register(formData);
        if (typeof result === 'string') {
            console.error('Registration error:', result);
            setError(result);
        } else {
            console.log(result);
            const loginResult = await login(email, password);
            if (typeof loginResult === 'string') {
                console.error('Login error:', loginResult);
                setError(loginResult);
            } else {
                console.log(loginResult);
                Cookies.set('token', loginResult.token, { expires: 14 });
                return window.location.href = '/';
            }
        }
    }

    return (
        <>
            <form name={"registerForm"} className="authentication__form">
                {error &&
                    <div className={"alert"}>
                        <p>{error}</p>
                        <button onClick={() => setError("")}>
                            <XClose/>
                        </button>
                    </div>
                }
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
                <Button label={"S'inscrire"} onclick={(e:React.FormEvent) => handleRegister(e)}/>
                <Link link={"/connexion"} label={"J’ai déjà un compte"}/>
            </form>
        </>
    )
}