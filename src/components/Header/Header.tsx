import React from 'react'
import styles from "./Header.module.css"
import { Link } from "react-router-dom"
import { profileRolesEnum } from '../../types/reduxTypes/profileTypes'
import logoSvg from "images/logo.svg"
import HeaderLink from './HeaderLink'
import HeaderProfile from './HeaderProfile'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'

type propsType = {
    role?: profileRolesEnum;
    name: string;
    onLogout?: () => void;
}

function Header({ role, name, onLogout }: propsType) {
    return (
        role !== undefined ? <header className={styles.header}>
            <div className={`${styles.wrapper}`}>
                <Link to="/search">
                    <img src={logoSvg} alt="logo" className={styles.logo} />
                </Link>
                <nav className={styles.nav}>
                    <HeaderLink text="Карточки" link="/search" />
                    <HeaderLink text="Черновики" link="/drafts" />
                    <HeaderLink text="Заявки" link="/requests" />
                    {/*role === profileRolesEnum.admin && <HeaderLink text="Админ" link="/admin" />*/}
                </nav>
                <DropdownMenu data={[{text:"Выйти", onClick: onLogout}]} className={styles.logout}>
                    <HeaderProfile  name={name} />
                </DropdownMenu>
            </div>
        </header>
            :
            <header className={styles.header}>
                <img src={logoSvg} alt="logo" className={styles.logo} />
            </header>
    )
}

export default Header
