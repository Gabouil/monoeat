import './Button.scss'
import {NavLink} from "react-router-dom";

interface Props {
    type?: 'button' | 'NavLink' | 'a'
    link?: string
    label: string | JSX.Element
    color?: 'danger' | 'success' | 'default'
    size?: 'small' | 'medium' | 'large'
}

export default function Button({
                                   type = "button",
                                   link="",
                                   label = "",
                                   color = "default",
                                   size = 'medium'
                               }: Props) {
    const classes = `button button--${color} button--${size} svg--reverse`;

    return (
        <>
            {type === 'button' && (
                <button className={classes }>
                    {label}
                </button>
            )}

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