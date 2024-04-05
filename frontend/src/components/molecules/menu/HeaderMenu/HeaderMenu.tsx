import "./HeaderMenu.scss";
import {useTheme} from "../../../../context/ThemeContext.tsx";
import LogoLight from "../../../../assets/LogoLight.svg";
import LogoDark from "../../../../assets/LogoDark.svg";
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {useUser} from "../../../../context/UserContext.tsx";
import Chevron from "../../../../assets/pictos/chevron.tsx";
import Cart from "../../../../assets/pictos/cart.tsx";
import CartMenu from "../CartMenu/CartMenu.tsx";
import {useCart} from "../../../../context/CartContext.tsx";

type props = {
    section: "menu" | "information" | "paiement";
}
export default function HeaderMenu({section}: props) {
    const themeContext = useTheme();
    const theme = themeContext ? themeContext.theme : "light";
    const [cartIsOpen, setCartIsOpen] = useState(false);
    const userContext = useUser();
    if (!userContext) {
        throw new Error("UserContext is not initialized");
    }
    const CartContext = useCart()
    const cart = CartContext ? CartContext.cart : [];

    const [activeMenu, setActiveMenu] = useState("");
    const [activeInformation, setActiveInformation] = useState("");
    const [activePaiement, setActivePaiement] = useState("");
    const isActive = () => {
        const classActive = "header__menu__container__content__progress__item--active";
        switch (section) {
            case "menu":
                setActiveMenu(classActive);
                break;
            case "information":
                setActiveMenu(classActive);
                setActiveInformation(classActive);
                break;
            case "paiement":
                setActiveMenu(classActive);
                setActiveInformation(classActive);
                setActivePaiement(classActive);
                break;
            default:
                break;
        }
    }



    useEffect(() => {
        isActive();
    }, [section]);

    const goBack = () => {
        switch (section) {
            case "menu":
                return "/";
            case "information":
                return "/menu";
            case "paiement":
                return "/information";
            default:
                return "/";
        }
    }
    return (
        <>
            <header className="header__menu">
                <div className="header__menu__container">
                    <div className="header__menu__container__logo">
                        <NavLink to="/" className="header__menu__container__logo--link">
                            {theme === "light" ? (
                                <img src={LogoLight} className={"header__menu__container__logo--img"} alt={"Logo MonoEat"}/>

                            ) : (
                                <img src={LogoDark} className={"header__menu__container__logo--img"} alt={"Logo MonoEat"}/>
                            )}
                        </NavLink>
                    </div>
                    <div className="header__menu__container__content">
                        <div>
                            <NavLink to={goBack()}>
                                <Chevron/> Retour
                            </NavLink>
                        </div>
                        <ul className="header__menu__container__content__progress">
                            <li className={"header__menu__container__content__progress__item " + activeMenu}><span>Menu</span></li>
                            <li className={"header__menu__container__content__progress__item " + activeInformation}><span>Information</span></li>
                            <li className={"header__menu__container__content__progress__item " + activePaiement}><span>Paiement</span></li>
                        </ul>
                        <div>
                            <button onClick={() => setCartIsOpen(!cartIsOpen)}><Cart/> {cart.length > 0 &&<span></span>}</button>
                        </div>
                    </div>
                </div>
            </header>
            {cartIsOpen && <CartMenu setIsOpen={setCartIsOpen}/>}
        </>
    );
}