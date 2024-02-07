import "./Backoffice.scss"
import {useParams} from 'react-router-dom';
import BackofficeSection from "../../organismes/Backoffice/BackofficeSection.tsx";
import React, {useEffect, useState} from "react";
import useGetUserById from "../../../services/hooks/useGetUserById.tsx";
import Input from "../../atomes/inputs/Input/Input.tsx";
import Button from "../../atomes/buttons/Button/Button.tsx";
import useUpdateUserById from "../../../services/hooks/useUpdateUserById.tsx";
import useDeleteUserById from "../../../services/hooks/useDeleteUserById.tsx";
import SelectInput from "../../atomes/inputs/SelectInput/SelectInput.tsx";

type defaultUserProps = {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    role: string
}
export default function BackofficeUserId() {
    const getUser = useGetUserById();
    const updateUser = useUpdateUserById();
    const deleteUser = useDeleteUserById();
    // const deleteUser = useDeleteUserById();
    const id = useParams().id || ""

    const [user, setUser] = useState<defaultUserProps | undefined>();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [role, setRole] = useState("");
    const [roleData] = useState([
        {value: "user", option: "User"},
        {value: "admin", option: "Admin"},
    ])
    const [roleSelected, setRoleSelected] = useState(0)

    const changeValue = (value: string, id: number) => {
        setRole(value)
        setRoleSelected(id)
    }

    useEffect(() => {
        (async () => {
            if (id) {
                const data = await getUser(id);
                setUser(data);
            }
        })();
    }, []);

    useEffect(() => {
        if (firstname === "" && user) {
            console.log(user);
            setFirstname(user.firstname);
            setLastname(user.lastname);
            setEmail(user.email);
            setPhone(user.phone);
            if (user.role === "user") {
                changeValue("user", 0);
            } else {
                changeValue("admin", 1);
            }
        }
    }, [user]);

    const handleDeleteUser = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("delete user");
        const result = await deleteUser(id);
        if (result.status === 401 || result.status === 400) {
            console.error('Delete user error:', result.data.error);
        } else {
            console.log('User deleted:', result);
            return window.location.href = "/backoffice/users";
        }
    }

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("update user");
        const result = await updateUser({
            id: id,
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            role: role
        });
        if (result.status === 401 || result.status === 400) {
            console.error('Update user error:', result.data.error);
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
                                type={"text"}
                                value={phone}
                                placeholder={"Téléphone"}
                                name={"phone"}
                                setValue={setPhone}
                                color
                            />
                            <SelectInput
                                optionSelected={roleSelected}
                                setOptionSelected={setRoleSelected}
                                contents={roleData}
                                setValue={changeValue}
                                label={"Rôle"}
                            />
                            <Button label={"Supprimer"} color={"danger"}
                                    onclick={(e: React.FormEvent) => handleDeleteUser(e)}/>
                            <Button label={"Modifier"} onclick={(e: React.FormEvent) => handleUpdateUser(e)}/>
                        </form>
                    }
                    link={"/backoffice/users"}
                    title={user ? user.firstname + " " + user.lastname : " "}
                />
            </main>
        </>
    )
}