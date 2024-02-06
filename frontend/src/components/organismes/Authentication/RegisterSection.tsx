import "./AuthenticationSection.scss"
import RegisterForm from "../../molecules/form/Authentication/RegisterForm";
import {useState} from "react";
import Chevron from "../../../assets/pictos/chevron";
import {NavLink} from "react-router-dom";

export default function RegisterSection() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    return (
        <section className="authentication">
            <div className={"authentication__header"}>
                <NavLink to={"/"}><Chevron/></NavLink>
                <h1>Créer son compte</h1>

            </div>
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
            </div>
        </section>
    )
}