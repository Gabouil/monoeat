import "./Menu.scss"
import Footer from "../../molecules/global/Footer/Footer.tsx";
import Header from "../../molecules/global/Header/Header.tsx";
import MenuSection from "../../organismes/MenuSection/MenuSection.tsx";
import Button from "../../atomes/buttons/Button/Button.tsx";
import React from "react";
// import HeroHeaderMenuSection from "../../organismes/HeroHeaderSection/HeroHeaderMenuSection.tsx";

export default function Menu() {
    const newDate = new Date();
    const day = newDate.getDay();
    const diff = newDate.getDate() - day + (day == 0 ? -6 : 1);
    newDate.setDate(diff)
    const date = newDate.toISOString().split('T')[0];

    const menuTypes = ["plats", "entrées", "desserts", "autres"];
    return (
        <>
            <Header/>
            <main className={"menu__page"}>
                <header className={"menu__header"}>
                    {menuTypes.map((type) => {
                        return (
                            <React.Fragment key={type + "_button"}>
                                <Button
                                    type={"a"}
                                    label={type.charAt(0).toUpperCase() + type.slice(1)}
                                    link={"/menu#" + type}
                                />
                            </React.Fragment>
                        )
                    })}
                </header>
                {/*<HeroHeaderMenuSection/>*/}
                {menuTypes.map((type) => {
                    return (
                        <React.Fragment key={type + "_section"}>
                            <MenuSection type={type} date={date}/>
                        </React.Fragment>
                    )
                })}
            </main>
            <Footer newsLetter/>
        </>
    )
}