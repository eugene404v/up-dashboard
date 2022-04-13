import React from 'react'
import styles from './styles.module.css'
import yearSvg from "./imgs/year.svg"
import peopleSvg from "./imgs/people.svg"
import toiletSvg from "./imgs/toilet.svg"
import showerSvg from "./imgs/shower.svg"
import grotSvg from "./imgs/grot.svg"
import widthSvg from "./imgs/width.svg"
import lengthSvg from "./imgs/length.svg"
import cabinsSvg from "./imgs/cabins.svg"
import depthSvg from "./imgs/depth.svg"
import engineSvg from "./imgs/engine.svg"
import fuelSvg from "./imgs/fuel.svg"
import bedSvg from "./imgs/bed.svg"
import baggageSvg from "./imgs/baggage.svg"
import jetTypeSvg from "./imgs/jetType.svg"
import heightSvg from "./imgs/height.svg"
import rangeSvg from "./imgs/range.svg"
import speedSvg from "./imgs/speed.svg"
import { typoEnum } from 'styles/typo'

type propsType = {
    value: string | number;
    type: mainInfoItemType;
}

export type mainInfoItemType = "year" | "people" | "toilets" | "showers" | "grot" | "width" | "length" | "cabins" | "depth" | "engine" | "fuel" | "beds" | "baggage" | 
"jetType" | "height" | "range" | "speed"

const typeSwitcher = {
    year: {
        text: "Год",
        svg: yearSvg
    },
    people: {
        text: "Человек",
        svg: peopleSvg
    },
    toilets: {
        text: "Туалеты",
        svg: toiletSvg
    },
    showers: {
        text: "Душевые",
        svg: showerSvg
    },
    grot: {
        text: "Грот",
        svg: grotSvg
    },
    width: {
        text: "Ширина",
        svg: widthSvg
    },
    length: {
        text: "Длина",
        svg: lengthSvg
    },
    cabins: {
        text: "Каюты",
        svg: cabinsSvg
    },
    depth: {
        text: "Осадка",
        svg: depthSvg
    },
    engine: {
        text: "Двигатель",
        svg: engineSvg
    },
    fuel: {
        text: "Топливный бак",
        svg: fuelSvg
    },
    beds: {
        text: "Кровать",
        svg: bedSvg
    },
    baggage: {
        text: "Багаж",
        svg: baggageSvg
    },
    jetType: {
        text: "Тип",
        svg: jetTypeSvg
    },
    height: {
        text: "Высота",
        svg: heightSvg
    },
    range: {
        text: "Дальность",
        svg: rangeSvg
    }, 
    speed: {
        text: "Скорость",
        svg: speedSvg
    }
}

function MainInfoItem({value, type}: propsType) {

    return (
        value ? <div className={styles.container}>
            <div className={styles.icon}>
                <img src={typeSwitcher[type].svg} alt={typeSwitcher[type].text} className={styles.img} />
            </div>
            <p className={`${styles.name} ${typoEnum.typo_14_17_500}`}>{typeSwitcher[type].text}</p>
            <p className={styles.value}>{value}</p>
        </div> : null
    )
}

export default MainInfoItem
