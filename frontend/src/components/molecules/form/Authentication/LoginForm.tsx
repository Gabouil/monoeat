import "./AuthenticationForm.scss"
import React, {useState} from "react";
import Input from "../../../atomes/inputs/Input/Input.tsx";
import Button from "../../../atomes/buttons/Button/Button.tsx";
import Link from "../../../atomes/buttons/Link/Link.tsx";
import Cookies from 'js-cookie';
import useLogin from "../../../../services/hooks/useLogin.tsx";
import XClose from "../../../../assets/pictos/x-close.tsx";

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
    const login = useLogin();
    const [error, setError] = useState("");
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await login(email, password);
        if (result.status === 401 || result.status === 400) {
            console.error('Login error:', result.data.error);
            setError(result.data.error);
        } else {
            Cookies.set('token', result.token, { expires: 14 });
            return window.location.href = '/';
        }
    }

    return (
        <>
            <form name={"loginForm"} className="authentication__form">
                {error &&
                    <div className={"alert"}>
                        <p>{error}</p>
                        <button onClick={() => setError("")}>
                            <XClose/>
                        </button>
                    </div>
                }
                <div className="authentication__form__ligne">
                </div>
                <Input
                    type={"email"}
                    placeholder={"Email"}
                    name={"email"}
                    value={email}
                    setValue={setEmail}
                />
                <Input
                    type={"password"}
                    placeholder={"Mot de passe"}
                    name={"password"}
                    value={password}
                    setValue={setPassword}
                />
                <Button label={"Se connecter"} onclick={(e: React.FormEvent) => handleLogin(e)}/>
                <Link link={"/inscription"} label={"Je n’ai pas de compte"}/>            </form>
        </>
    )
}