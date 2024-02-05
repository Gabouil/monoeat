import "./AuthenticationSection.scss"
import Button from "../../atomes/buttons/Button/Button.tsx";
import Link from "../../atomes/buttons/Link/Link.tsx";
import {useState} from "react";
import Chevron from "../../../assets/pictos/chevron.tsx";
import {NavLink} from "react-router-dom";
import LoginForm from "../../molecules/form/Authentication/LoginForm.tsx";
import useLogin from "../../../../services/hooks/useLogin";
import XClose from "../../../assets/pictos/x-close.tsx";
import Cookies from 'js-cookie';

export default function LoginSection() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const login = useLogin();
    const handleLogin = async () => {

        const result = await login(email, password);
        if (typeof result === 'string') {
            console.error('Login error:', result);
            setError(result);
        } else {
            console.log(result);
            Cookies.set('token', result.token, { expires: 14 });
            return window.location.href = '/';
        }
    }
    return (
        <section className="authentication">
            <div className={"authentication__header"}>
                <NavLink to={"/"}><Chevron/></NavLink>
                <h1>Se connecter</h1>
            </div>
            {error &&
                <div className={"alert"}>
                    <p>{error}</p>
                    <button onClick={() => setError("")}>
                        <XClose/>
                    </button>
                </div>
            }
            <div className={"authentication__content"}>
                <LoginForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                />
                <Button label={"Se connecter"} onclick={handleLogin}/>
                <Link link={"/inscription"} label={"Je n’ai pas de compte"}/>
            </div>
        </section>
    )
}