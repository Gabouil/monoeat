import './Link.scss'
import {NavLink} from "react-router-dom";

interface Props {
    type?: 'NavLink' | 'a'
    link: string
    label: string
    primary?: boolean
    color?: 'danger' | 'success' | 'default'
}

export default function Link({
                                 type = "NavLink",
                                 link = "",
                                 label = "",
                                 primary = false,
                                 color = "default",
                             }: Props) {
    const classes = `link link--${color} ${primary ? "link--primary" : ""}`;

    return (
        <>
            {type === 'NavLink' && (
                <NavLink to={link} className={classes}>
                    {label}
                </NavLink>
            )}

            {type === 'a' && (
                <a href={link} className={classes}>
                    {label}
                </a>
            )}
        </>
    );
}