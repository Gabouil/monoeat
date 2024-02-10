import "./AddStringList.scss";
import Input from "../../../atomes/inputs/Input/Input.tsx";
import React, {useState} from "react";
import Button from "../../../atomes/buttons/Button/Button.tsx";

type props = {
    setValues: (values: string[]) => void;
    values: string[];
    inputPlaceholder?: string;
    title?: string;
    listTitle?: string;
}
export default function AddStringList({ setValues, values, inputPlaceholder, title,listTitle}: props) {
    const [valueAdd, setValueAdd] = useState("");


    const pushToList = (e: React.FormEvent) => {
        e.preventDefault()
        if (valueAdd) {
            setValues([...values, valueAdd]);
            setValueAdd("");
        }
    }

    const deleteItem = (e: React.FormEvent, id: number) => {
        e.preventDefault()
        const newValues = values;
        newValues.splice(id, 1);
        setValues([...newValues]);
    }
    return (
        <>
            <div className="addstring">
                {title && <p>{title}</p>}
                <div className={"addstring__container"}>
                    <div className={"addstring__container__input"}>
                        <Input
                            name={"valueAdd"}
                            type={"text"}
                            value={valueAdd}
                            setValue={setValueAdd}
                            color
                            placeholder={inputPlaceholder ? inputPlaceholder : "Ajouter un élément"}
                        />
                        <Button label={"Ajouter"} onclick={(e: React.FormEvent) => {
                            pushToList(e)
                        }}/>
                    </div>
                    <table className={"addstring__container__select"}>
                        <thead>
                        <tr className={"table__color--1"}>
                            <th scope="col">Id</th>
                            <th scope="col">{listTitle ? listTitle : "Valeur" }</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {values.map((value, id) => {
                            return (
                                <tr key={id}
                                    className={id % 2 === 0 ? "table__color--2" : "table__color--1"}>
                                    <td>{id + 1}</td>
                                    <td>{value}</td>
                                    <td>
                                        <Button
                                            size={"small"}
                                            color={"danger"}
                                            label={"Supprimer"}
                                            onclick={(e: React.FormEvent) => {deleteItem(e, id)}}
                                        />
                                    </td>
                                </tr>

                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}