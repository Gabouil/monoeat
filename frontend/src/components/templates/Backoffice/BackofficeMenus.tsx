import "./Backoffice.scss"
import BackofficeSection from "../../organismes/Backoffice/BackofficeSection.tsx";
import Input from "../../atomes/inputs/Input/Input.tsx";
import Button from "../../atomes/buttons/Button/Button.tsx";
import {useState} from "react";


export default function BackofficeMenus() {
    const [dateSelected, setDateSelected] = useState<string>("");

    const handleDateSelected = (date: string) => {
        const newDate = new Date(date);
        const day = newDate.getDay();
        const diff = newDate.getDate() - day + (day == 0 ? -6:1);
        newDate.setDate(diff);
        const monday = newDate.toISOString().split('T')[0];
        setDateSelected(monday);
    }

    return (
        <>
            <main className={"backoffice"}>
                <BackofficeSection content={
                    <>
                        <Input
                            type={"date"}
                            label={"Date de la semaine"}
                            value={dateSelected}
                            setValue={handleDateSelected}
                            name={"dateSelected"}
                            placeholder={""}
                        />
                        <Button
                            type={"NavLink"}
                            label={"Voir le menu"}
                            link={"/backoffice/menus/" + dateSelected}
                        />
                    </>
                } link={"/backoffice"} title={"Gestion des menus"}/>
            </main>
        </>
    )
}