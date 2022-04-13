import BackModalBtn from 'components/Controls/BackModalBtn/BackModalBtn'
import CloseBtn from 'components/Controls/CloseBtn'
import React from 'react'
import styles from "./Modal.module.css"

type propsType = {
    onClose: (e: React.MouseEvent) => void;
    title: string;
    containerClassNames?: string;
    classnames?: string;
    children?: React.ReactFragment | React.ReactElement;
    onBack?: () => void;
}

function Modal({onClose, title, children, classnames, containerClassNames, onBack}: propsType) {

    React.useEffect(() => {
        document.body.style.overflowY = "hidden"
        return () => {
            document.body.style.overflowY = "auto"
        }
    }, [])

    return (
        <div className={`${styles.container} ${containerClassNames||""}`}>
            <div className={styles.overlay} onClick={onClose}></div>
            <section className={`${styles.modal} ${classnames||""}`}>
                <CloseBtn onClick={onClose} classNames={styles.close} />
                {onBack && <BackModalBtn onClick={onBack} classNames={styles.back} />}
                {title && <h2 className={`${styles.title} typo-20-24-700`}>{title}</h2>}
                {children}
            </section>
        </div>
    )
}

export default Modal
