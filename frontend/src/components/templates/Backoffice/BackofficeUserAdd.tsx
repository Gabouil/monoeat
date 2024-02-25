import "./Backoffice.scss"
import BackofficeSection from "../../organismes/Backoffice/BackofficeSection.tsx";
import {useState} from "react";
import RegisterForm from "../../molecules/form/Authentication/RegisterForm.tsx";

export default function BackofficeUserAdd() {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    return (
        <>
            <main className={"backoffice"}>
                <BackofficeSection
                    content={
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
                            backoffice
                        />
                    }
                    link={"/backoffice/users"}
                    title={"Ajouter un utilisateur"}
                />
            </main>
        </>
    )
}