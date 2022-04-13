import React from 'react'
import styles from "./Button.module.css"
import cls from "classnames/bind"
import { Link } from 'react-router-dom'

const cx = cls.bind(styles)

type propsType = {
    additionalClassNames?: string;
    text: string;
    onClick?: (e:React.MouseEvent) => void;
    size?: "small" | "medium" | "large" | "wide";
    color?: "blue" | "orange" | "gray" | "text" | "empty" | "white" | "white-text" | "white-empty" | "red"
    disabled?: boolean;
    to: string;
}

function ButtonLink({ additionalClassNames, text, onClick, size = "medium", color = "blue", to }: propsType) {
    const classNames = cx({
        btn: true,
        small: size === "small",
        medium: size === "medium",
        large: size === "large",
        wide: size === "wide",
        blue: color === "blue",
        orange: color === "orange",
        gray: color === "gray",
        text: color === "text",
        empty: color === "empty",
        white: color === "white",
        whiteText: color === "white-text",
        whiteEmpty: color === "white-empty",
        red: color === "red"
    })

    return (
        <Link to={to} className={`${classNames} ${additionalClassNames||""}`} onClick={onClick}>
            {text}
        </Link>
    )
}

export default ButtonLink
