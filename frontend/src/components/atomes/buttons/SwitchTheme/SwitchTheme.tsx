import {useState, useEffect} from "react";
import { useTheme } from "../../../../context/ThemeContext";
import Sun from "../../../../assets/pictos/theme/sun.tsx";
import Moon from "../../../../assets/pictos/theme/moon.tsx";
import "./SwitchTheme.scss";

export default function SwitchTheme() {
    const themeContext = useTheme();
    const theme = themeContext ? themeContext.theme : "light";
    const toggleTheme = themeContext ? themeContext.toggleTheme : () => {};
    const [darkModeEnabled, setDarkModeEnabled] = useState(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);

    useEffect(() => {
        const favicon = document.getElementById("favicon") as HTMLLinkElement;
        favicon.href = darkModeEnabled ? "/favicone_dark.svg" : "/favicone_light.svg";
        setDarkModeEnabled(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }, [theme, darkModeEnabled]);

    return (
        <div className="switch-theme" onClick={toggleTheme}>
            {theme === "light" ? <Sun /> : <Moon />}
        </div>
    );
}