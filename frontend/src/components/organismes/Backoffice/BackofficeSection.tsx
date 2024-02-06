import "./BackofficeSection.scss";
import {NavLink} from "react-router-dom";
import Chevron from "../../../assets/pictos/chevron.tsx";
import LogoLight from "../../../assets/LogoLight.svg";
import LogoDark from "../../../assets/LogoDark.svg";
import {useTheme} from "../../../context/ThemeContext.tsx";

type Props = {
    content: any,
    link: string,
    title: string
}
export default function BackofficeSection({content, link, title}:Props) {
    const themeContext = useTheme();
    const theme = themeContext ? themeContext.theme : "light";
    return (
        <>
            <div className="backoffice__container">
                <div className={"backoffice__container__header"}>
                    <NavLink className={"backoffice__container__header__close"} to={link}>
                        <Chevron/>
                    </NavLink>
                    <NavLink to={"/"}>
                        {theme === "light" ? (
                            <img src={LogoLight} className={"header__container__logo--img"} alt={"Logo MonoEat"}/>

                        ) : (
                            <img src={LogoDark} className={"header__container__logo--img"} alt={"Logo MonoEat"}/>
                        )}
                    </NavLink>
                    <h1>{title}</h1>
                </div>
                <div className={"backoffice__container__content"}>
                    {content}
                </div>
            </div>
        </>
    )
}