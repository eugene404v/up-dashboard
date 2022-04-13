import React from 'react'
import { Link } from 'react-router-dom'
import { activityAdminDataType, activitytypesEnum } from 'types/reduxTypes/adminTypes'
import { vehiclesCategoriesEnum } from 'types/vehicleTypes/vehiclesTypes'
import { lastTimeFormatter } from 'utils/time/lastTimeFormatter'
import styles from "./Trow.module.css"

type propsType = {
    data: activityAdminDataType;
}

const vehicleTypeFormatter = (vehicleType: vehiclesCategoriesEnum) => {
    if (vehicleType === vehiclesCategoriesEnum.yacht) return "yacht"
    return "jet"
}

const activityTypeFormatter = (activityType: activitytypesEnum) => {
    switch (activityType) {
        case activitytypesEnum.delete:
            return "Удаление "
        case activitytypesEnum.edit:
            return "Изменение "
        case activitytypesEnum.publish:
            return "Публикация " 
        case activitytypesEnum.addToDrafts:
            return "Добавление в черновик " 
        default:
            return ""
    }
}

const linkFormatter = (activityType: activitytypesEnum, vehicleType: vehiclesCategoriesEnum, vehicleName: string, vehicleId: number) => {
    return <p>{activityTypeFormatter(activityType)} <Link className={styles.link} to={`/${vehicleTypeFormatter(vehicleType)}/${vehicleId}`}>{vehicleName}</Link></p>
}

function TrowActivity({ data }: propsType) {
    return (
        <tr className={`${styles.tr} typo-14-17-400`}>
            <td className={styles.td}>{data.name}</td>
            <td className={styles.td}>{lastTimeFormatter(data.lastActivity)}</td>
            <td colSpan={2} className={`${styles.td} ${styles.tdColspan2}`}>{linkFormatter(data.actionType, data.vehicleType, data.vehicleName, data.idVehicle)}</td>
        </tr>
    )
}

export default TrowActivity
