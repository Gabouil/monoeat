import "./Notification.scss"
import XClose from "../../../assets/pictos/x-close.tsx";
import React from "react";

type defaultProps = {
    title: string
    contents: string[]
    setContent: React.Dispatch<React.SetStateAction<string>>
    type: "alert" | "success" | "info"
}

export default function Notification({title, contents, setContent, type}: defaultProps) {
    return (
        <div className={`notification notification--${type}`}>
            <header className={"notification__header"}>
                <h4>{title}</h4>
                <button onClick={() => setContent("")}>
                    <XClose/>
                </button>
            </header>
            <p>
                {contents.map(
                    (content: string, i: number) => <span key={i}>• {content}</span>
                )}
            </p>
        </div>
    )
}