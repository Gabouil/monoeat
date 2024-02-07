import "./Backoffice.scss"
import BackofficeSection from "../../organismes/Backoffice/BackofficeSection.tsx";
import React, {useState} from "react";
import Input from "../../atomes/inputs/Input/Input.tsx";
import Button from "../../atomes/buttons/Button/Button.tsx";
import useRegister from "../../../services/hooks/useRegister.tsx";

export default function BackofficeUserAdd() {
    const createUser = useRegister();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");




    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("update user");
        const result = await createUser({
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            password: password,
            confirmpassword: confirmPassword
        });
        if (result.status === 401 || result.status === 400) {
            console.error('Create user error:', result.data.error);
        } else {
            console.log('User updated:', result);
            return window.location.href = "/backoffice/users";
        }
    }

    return (
        <>
            <main className={"backoffice"}>
                <BackofficeSection
                    content={
                        <form>
                            <Input
                                type={"text"}
                                value={firstname}
                                placeholder={"Prénom"}
                                name={"firstname"}
                                setValue={setFirstname}
                                color
                            />
                            <Input
                                type={"text"}
                                value={lastname}
                                placeholder={"Nom"}
                                name={"lastname"}
                                setValue={setLastname}
                                color
                            />
                            <Input
                                type={"email"}
                                value={email}
                                placeholder={"Email"}
                                name={"email"}
                                setValue={setEmail}
                                color
                            />
                            <Input
                                type={"tel"}
                                value={phone}
                                placeholder={"Téléphone"}
                                name={"phone"}
                                setValue={setPhone}
                                color
                            />
                            <Input
                                type={"password"}
                                value={password}
                                placeholder={"Mot de passe"}
                                name={"password"}
                                setValue={setPassword}
                                color
                            />
                            <Input
                                type={"password"}
                                value={confirmPassword}
                                placeholder={"Confirmer le mot de passe"}
                                name={"confirmPassword"}
                                setValue={setConfirmPassword}
                                color
                            />
                            <Button label={"Créer le nouvelle utilisateur"} onclick={( e: React.FormEvent) => handleCreateUser(e)}/>
                        </form>
                    }
                    link={"/backoffice/users"}
                    title={"Ajouter un utilisateur"}
                />
            </main>
        </>
    )
}