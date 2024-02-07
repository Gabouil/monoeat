import "./Backoffice.scss"
import BackofficeSection from "../../organismes/Backoffice/BackofficeSection.tsx";
import useGetAllUser from "../../../services/hooks/useGetAllUser.tsx";
import React, {useEffect, useState} from "react";
import Button from "../../atomes/buttons/Button/Button.tsx";
import useDeleteUserById from "../../../services/hooks/useDeleteUserById.tsx";

type User = {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
};

export default function BackofficeUsers() {
    const getUsers = useGetAllUser();
    const deleteUser = useDeleteUserById();

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        (async () => {
            const data = await getUsers();
            setUsers(data);
        })();
    }, []);

    useEffect(() => {
        console.log(users);
    }, [users]);

    const handleDeleteUser = async (e: React.FormEvent, id:string) => {
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

    return (
        <>
            <main className={"backoffice"}>
                <BackofficeSection
                    content={
                        <>
                            <Button
                                type={"NavLink"}
                                size={"small"}
                                label={"Ajouter un utilisateur"}
                                link={"/backoffice/users/add"}
                            />
                            <table>
                                <thead>
                                <tr className={"table__color--1"}>
                                    <th scope="col">Id</th>
                                    <th scope="col">User</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Action</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map((user: User, id: number) => {
                                    return (
                                        <tr key={user._id}
                                            className={id % 2 === 0 ? "table__color--2" : "table__color--1"}>
                                            <td>{id + 1}</td>
                                            <td>{user.firstname + " " + user.lastname}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <Button
                                                    type={"NavLink"}
                                                    size={"small"}
                                                    label={"Modifier"}
                                                    link={"/backoffice/users/" + user._id}
                                                />
                                            </td>
                                            <td>
                                                <Button
                                                    size={"small"}
                                                    color={"danger"}
                                                    label={"Supprimer"}
                                                    onclick={(e: React.FormEvent) => {handleDeleteUser(e, user._id)}}
                                                />
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>

                        </>
                    }
                    link={"/backoffice"}
                    title={"Gestion des utilisateurs"}/>
            </main>
        </>
    )
}