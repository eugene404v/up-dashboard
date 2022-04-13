import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from "./HeaderLink.module.css"

type propsType = {
    text: string;
    link: string;
}

function HeaderLink({text, link}: propsType) {
    return (
        <NavLink to={link} className={`${styles.navlink} typo-14-17-400`} activeClassName={styles.active}>
            {text}
        </NavLink>
    )
}

export default HeaderLink
