import "./Header.scss";
import {useTheme} from "../../../../context/ThemeContext.tsx";
import LogoLight from "../../../../assets/LogoLight.svg";
import LogoDark from "../../../../assets/LogoDark.svg";
import SwitchTheme from "../../../atomes/buttons/SwitchTheme/SwitchTheme.tsx";
import {NavLink} from "react-router-dom";
import Link from "../../../atomes/buttons/Link/Link.tsx";
import Button from "../../../atomes/buttons/Button/Button.tsx";
import Menu from "../../../../assets/pictos/menu.jsx";
import {useState} from "react";
import XClose from "../../../../assets/pictos/x-close.tsx";
import ProfileIcon from "../../../../assets/pictos/profileIcon.tsx";
import {useUser} from "../../../../context/UserContext.tsx";

export default function Header() {
    const themeContext = useTheme();
    const theme = themeContext ? themeContext.theme : "light";
    const [menuOpen, setMenuOpen] = useState(false);
    const userContext = useUser();
    if (!userContext) {
        throw new Error("UserContext is not initialized");
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        const nav = document.querySelector(".header__container__content__nav");
        if (nav) {
            nav.classList.toggle("header__container__content__nav--open");
        }
    }
    console.log(userContext);
    return (
        <>
            <header className="header">
                <div className="header__container">
                    <div className="header__container__logo">
                        <NavLink to="/" className="header__container__logo--link">
                            {theme === "light" ? (
                                <img src={LogoLight} className={"header__container__logo--img"} alt={"Logo MonoEat"}/>

                            ) : (
                                <img src={LogoDark} className={"header__container__logo--img"} alt={"Logo MonoEat"}/>
                            )}
                        </NavLink>
                    </div>
                    <div className="header__container__content">
                        <SwitchTheme />
                        <button className={"header__container__content--menuBurger"} onClick={toggleMenu} ><Menu /></button>
                        <div className={menuOpen ?
                            "header__container__content__nav header__container__content__nav--open"
                            : "header__container__content__nav"
                        }>
                            <button className={"header__container__content__nav--closeMenuButton"} onClick={toggleMenu}>
                                <XClose/>
                            </button>
                            <nav className="header__container__content__nav__list">
                                <ul className="header__container__content__nav__list__content">
                                    <li className="header__container__content__nav__list--content">
                                        <Link link={"/menu"} label={"Menu"} primary/>
                                    </li>
                                    <li className="header__container__content__nav__list--content">
                                        <Link link={"/a-propos"} label={"A propos de nous"} primary/>
                                    </li>
                                    <li className="header__container__content__nav__list--content">
                                        <Link link={"/faq"} label={"FAQ"} primary/>
                                    </li>
                                    <li className="header__container__content__nav__list--content">
                                        <Link link={"/contact"} label={"Nous contacter"} primary/>
                                    </li>
                                    {userContext.user?.role === "admin" && (
                                        <li className="header__container__content__nav__list--content">
                                            <Link link={"/Backoffice"} label={"Backoffice"} primary/>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                            <div className="header__container__content__nav__profile">
                                {userContext.user ? (
                                    <NavLink to={"/profile"} className="header__container__content__nav__profile--link">
                                        <ProfileIcon />
                                    </NavLink>
                                ) : (
                                    <>
                                        <Button type={"NavLink"} link="/connexion" label={"Se connecter"}/>
                                        <Button type={"NavLink"} link="/inscription" label={"S'inscrire"}/>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}