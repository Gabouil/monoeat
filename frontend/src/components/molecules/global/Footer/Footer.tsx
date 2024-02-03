import "./Footer.scss";
import {useTheme} from "../../../../context/ThemeContext.tsx";
import LogoLight from "../../../../assets/LogoLight.svg";
import LogoDark from "../../../../assets/LogoDark.svg";
import {NavLink} from "react-router-dom";
import Instagram from "../../../../assets/pictos/social/instagram.tsx";
import Facebook from "../../../../assets/pictos/social/facebook.tsx";
import Linkedin from "../../../../assets/pictos/social/linkedin.tsx";
import Youtube from "../../../../assets/pictos/social/youtube.tsx";
import Button from "../../../atomes/buttons/Button/Button.tsx";
import Input from "../../../atomes/inputs/Input/Input.tsx";
import {useState} from "react";

interface Props {
    newsLetter?: boolean
}

export default function Footer({
                                   newsLetter = false
                               }: Props) {
    const themeContext = useTheme();
    const theme = themeContext ? themeContext.theme : "light";
    const [email, setEmail] = useState("");

    return (
        <footer className="footer">
            {newsLetter && (
                <div className="footer__newsletter">
                    <h4>S'inscrire à la newsletter</h4>
                    <form className="footer__newsletter__form">
                        <Input
                            type="email"
                            placeholder={"Votre email"}
                            name="newsletter"
                            setValue={setEmail}
                            value={email}
                        />
                        <Button type="button" label="S'inscrire"/>
                    </form>
                </div>
            )}
            <div className="footer__content">
                <div className="footer__content__logo">
                    <NavLink to="/" className="header__container__logo--link">
                        {theme === "light" ? (
                            <img src={LogoLight} className={"header__container__logo--img"} alt={"Logo MonoEat"}/>

                        ) : (
                            <img src={LogoDark} className={"header__container__logo--img"} alt={"Logo MonoEat"}/>
                        )}
                    </NavLink>
                </div>
                <nav className="footer__content__links">
                    <ul className="footer__content__links__list">
                        <li>
                            <NavLink to="/menu">Menu</NavLink>
                        </li>
                        <li>
                            <NavLink to="/a-propos">A propos de nous</NavLink>
                        </li>
                        <li>
                            <NavLink to="/faq">FAQ</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">Nous contacter</NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="footer__content__social">
                    <ul className="footer__content__social__list">
                        <li>
                            <NavLink to="/contact"><Linkedin/></NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact"><Facebook/></NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact"><Instagram/></NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact"><Youtube/></NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <span className={"footer__separator"}></span>
            <div className="footer__mentions">
                <div className={"footer__mentions__links"}>
                    <div className="footer__mentions__links__content">
                        <NavLink className="smallLink" to={"/mentions-legales"}>CGV</NavLink>
                        <NavLink className="smallLink" to={"/mentions-legales"}>Conditions générale d'utilisation</NavLink>
                        <NavLink className="smallLink" to={"/mentions-legales"}>Politique de gestion des cookies</NavLink>
                    </div>
                    <div className="footer__mentions__links__content">
                        <NavLink className="smallLink" to={"/mentions-legales"}>Plan du site</NavLink>
                        <NavLink className="smallLink" to={"/mentions-legales"}>Politique de confidentialité</NavLink>
                        <NavLink className="smallLink" to={"/mentions-legales"}>Panneau de gestion des cookies</NavLink>
                    </div>
                </div>
                <div className={"footer__mentions__copy"}>
                    <p className="smallLink" >© 2023 MonoEat. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}