import "./AuthenticationSection.scss"
import Button from "../../atomes/buttons/Button/Button.tsx";
import Link from "../../atomes/buttons/Link/Link.tsx";
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
                <NavLink to={"/"} ><Chevron/></NavLink>
                <h1>Se connecter</h1>
            </div>
            <div className={"authentication__content"}>
                <LoginForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                />
                <Button label={"Se connecter"} type={"NavLink"} link={""}/>
                <Link link={"/inscription"} label={"Je n’ai pas de compte"}/>
            </div>
        </section>
    )
}