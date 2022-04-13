import React from 'react'
import styles from "./HeaderProfile.module.css"
import avatarSvg from "images/avatar.svg" 

type propsType = {
    name: string;
    onLogOut?: () => void;
    avatar?: string;
}

function HeaderProfile({name, onLogOut, avatar}: propsType) {
    return (
        <div className={styles.container}>
            <p className={`${styles.name} typo-14-17-400`}>{name}</p>
            <img className={styles.avatar} src={avatar || avatarSvg} alt="avatar" />
        </div>
    )
}

export default HeaderProfile
