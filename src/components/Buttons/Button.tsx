import React from 'react'
import styles from "./Button.module.css"
import cls from "classnames/bind"
import plusSvgWhite from "images/controls/plusWhite.svg"
import plusSvgBlue from "images/controls/plusBlue.svg"

const cx = cls.bind(styles)

type propsType = {
    additionalClassNames?: string;
    text: string;
    onClick?: (e:React.MouseEvent) => void;
    size?: "small" | "medium" | "large" | "wide";
    color?: "blue" | "orange" | "gray" | "text" | "empty" | "white" | "white-text" | "white-empty" | "red" | "light"
    disabled?: boolean;
    prefix?: "plus";
    type?: "submit" | "button"
}

function Button({ additionalClassNames, text, onClick, size = "medium", color = "blue", prefix, type }: propsType) {
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
        red: color === "red",
        light: color === "light",
    })

    return (
        <button className={`${classNames} ${additionalClassNames||""}`} onClick={onClick} type={type}>
            {prefix === "plus" && <img src={color === "text" ? plusSvgBlue : plusSvgWhite} alt="add button" className={styles.prefix} />}
            {text}
        </button>
    )
}

export default Button
