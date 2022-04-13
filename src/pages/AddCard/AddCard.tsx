import BreadCrumbs from 'components/BreadCrumbs/BreadCrumbs'
import React from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import { typoEnum } from 'styles/typo'
import styles from "./AddCard.module.css"
import AddJet from './AddJet'
import AddYacht from './AddYacht'

function AddCard() {
    return (
        <div className="wrapper">
            <BreadCrumbs links={[{ link: "/search", text: "Карточки" }]} here="Добавить карточку" />
            <div className={styles.page}>
                <h1 className={`${styles.title} ${typoEnum.typo_24_29_500}`}>Добавить карточку</h1>
                <h2 className={`${styles.subtitle} ${typoEnum.typo_16_19_500}`}>Транспорт</h2>
                <nav className={`${styles.nav} ${typoEnum.typo_14_17_500}`}>
                    <NavLink className={styles.navLink} activeClassName={styles.navLinkActive} to="/add/yacht">Яхта</NavLink>
                    <NavLink className={styles.navLink} activeClassName={styles.navLinkActive} to="/add/jet">Самолет</NavLink>
                </nav>
            </div>
                <Switch>
                    <Route path="/add/yacht" component={AddYacht} />
                    <Route path="/add/jet" component={AddJet} />
                </Switch>
        </div>
    )
}

export default AddCard
