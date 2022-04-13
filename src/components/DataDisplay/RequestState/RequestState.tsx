import React from 'react'
import { typoEnum } from 'styles/typo'
import { requestsEnum, requestsTypesEnum } from 'types/requestsTypes'
import styles from "./RequestState.module.css"

type propsType = {
    state: requestsTypesEnum;
    className?: string;
}

function RequestState({state, className}: propsType) {
    const requestTypeSwitcher = () => {
        switch (state) {
            case requestsTypesEnum.accepted:
                return {
                    btnClassName: styles.accepted,
                    btnText: "Одобрено"
                }
            case requestsTypesEnum.archived:
                return {
                    btnClassName: styles.archived,
                    btnText: "Архив"
                }
            case requestsTypesEnum.pending:
                return {
                    btnClassName: styles.pending,
                    btnText: "На рассмотрении"
                }
            default:
                return {}
        }
    }

    return (
        <div className={`${className||""} ${styles.request} ${typoEnum.typo_14_17_500} ${requestTypeSwitcher().btnClassName}`}>
            {requestTypeSwitcher().btnText}
        </div>
    )
}

export default RequestState
