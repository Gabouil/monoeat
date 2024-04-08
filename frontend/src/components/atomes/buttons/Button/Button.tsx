import './Button.scss'
import {NavLink} from "react-router-dom";
import React from "react";

interface Props {
    type?: 'button' | 'NavLink' | 'a'
    link?: string
    label: string | JSX.Element
    color?: 'danger' | 'success' | 'default'
    size?: 'small' | 'medium' | 'large'
    onclick?: (e: React.FormEvent) => void
    disabled?: boolean
}

export default function Button({
                                   type = "button",
                                   link = "",
                                   label = "",
                                   color = "default",
                                   size = 'medium',
                                   onclick = () => {},
                                   disabled = false
                               }: Props) {
    const classes = `button button--${color} button--${size} svg--reverse ${disabled ? 'button--disabled' : ''}`;

    return (
        <>
            {type === 'button' && (
                <button className={classes} onClick={onclick} disabled={disabled}>
                    {label}
                </button>
            )}

            {type === 'NavLink' && (
                <NavLink to={disabled ? '' : link} className={classes}>
                    {label}
                </NavLink>
            )}

            {type === 'a' && (
                <a href={disabled ? '' : link} className={classes}>
                    {label}
                </a>
            )}
        </>
    );
}