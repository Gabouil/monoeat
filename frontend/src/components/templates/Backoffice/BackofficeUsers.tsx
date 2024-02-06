import "./Backoffice.scss"
import BackofficeSection from "../../organismes/Backoffice/BackofficeSection.tsx";
import useGetAllUser from "../../../services/hooks/useGetAllUser.tsx";
import {useEffect, useState} from "react";
import Button from "../../atomes/buttons/Button/Button.tsx";


export default function BackofficeUsers() {
    const getUsers = useGetAllUser();

    const [users, setUsers] = useState();

    useEffect(() => {
        (async () => {
            const data = await getUsers();
            setUsers(data);
        })();
    }, []);

    useEffect(() => {
        console.log(users);
    }, [users]);

    const deleteUser = () => {
        console.log("delete user");

    }

    return (
        <>
            <main className={"backoffice"}>
                <BackofficeSection
                    content={
                        <>
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
                                {users && users.map((user: any, id: number) => {
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
                                                    onclick={deleteUser}
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