import "./AuthenticationSection.scss"
import RegisterForm from "../../molecules/form/Authentication/RegisterForm";
import Button from "../../atomes/buttons/Button/Button";
import Link from "../../atomes/buttons/Link/Link";
import {useState} from "react";
import Chevron from "../../../assets/pictos/chevron";
import {NavLink} from "react-router-dom";
import useRegister from "../../../../services/hooks/useRegister";
import XClose from "../../../assets/pictos/x-close.tsx";
import useLogin from "../../../../services/hooks/useLogin.tsx";
import Cookies from "js-cookie";

export default function RegisterSection() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const register = useRegister();
    const login = useLogin();
    const handleRegister = async () => {
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
        <section className="authentication">
            <div className={"authentication__header"}>
                <NavLink to={"/"}><Chevron/></NavLink>
                <h1>Créer son compte</h1>

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
                <RegisterForm
                    firstname={firstname}
                    setFirstname={setFirstname}
                    lastname={lastname}
                    setLastname={setLastname}
                    email={email}
                    setEmail={setEmail}
                    phone={phone}
                    setPhone={setPhone}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                />
                <Button label={"S'inscrire"} onclick={handleRegister}/>
                <Link link={"/connexion"} label={"J’ai déjà un compte"}/>
            </div>
        </section>
    )
}