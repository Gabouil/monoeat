import "./AuthenticationSection.scss"
import {useState} from "react";
import Chevron from "../../../assets/pictos/chevron.tsx";
import {NavLink} from "react-router-dom";
import LoginForm from "../../molecules/form/Authentication/LoginForm.tsx";

export default function LoginSection() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    return (
        <section className="authentication">
            <div className={"authentication__header"}>
                <NavLink to={"/"}><Chevron/></NavLink>
                <h1>Se connecter</h1>
            </div>

            <div className={"authentication__content"}>
                <LoginForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                />
            </div>
        </section>
    )
}