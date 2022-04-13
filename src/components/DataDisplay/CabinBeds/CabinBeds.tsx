import React from 'react'
import { ReactSVG } from 'react-svg'
import { typoEnum } from 'styles/typo'
import styles from "./CabinBeds.module.css"
import oneSvg from "./imgs/one.svg"
import twoSvg from "./imgs/two.svg"
import threeSvg from "./imgs/three.svg"
import fourSvg from "./imgs/four.svg"
import crewSvg from "./imgs/crew.svg"
import sofaSvg from "./imgs/sofa.svg"
 
type propsType = {
    type: bedsType;
    counter: number;
}

type bedsType = "one" | "two" | "three" | "four" | "crew" | "sofa"

const typeSwitcher = {
    one: {
        svg: oneSvg,
        text: "1-спальные кабины"
    },
    two: {
        svg: twoSvg,
        text: "2-спальные кабины"
    },
    three: {
        svg: threeSvg,
        text: "3-спальные кабины"
    },
    four: {
        svg: fourSvg,
        text: "4-спальные кабины"
    },
    crew: {
        svg: crewSvg,
        text: "Спальные места для экипажа"
    },
    sofa: {
        svg: sofaSvg,
        text: "Спальные места в салоне"
    },
}

function CabinBeds({type, counter}: propsType) {
    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <p className={`${styles.counter} ${typoEnum.typo_20_24_500}`}>{counter}x</p>
                <ReactSVG src={typeSwitcher[type].svg} className={styles.svg} />
            </div>
            <p className={styles.text}>{typeSwitcher[type].text}</p>
        </div>
    )
}

export default CabinBeds
