import React from 'react'
import modalStyles from "./Modal.module.css"
import alertStyles from "./Alert.module.css"

type propsType = {
    onClose: () => void;
    title: string;
    containerClassNames?: string;
    classnames?: string;
    text: string;
}

function Alert({onClose, title, classnames, containerClassNames, text}: propsType) {
    React.useEffect(() => {
        document.body.style.overflowY = "hidden"
        return () => {
            document.body.style.overflowY = "auto"
        }
    }, [])
    
    return (
        <div className={`${modalStyles.container} ${containerClassNames||""}`}>
            <div className={modalStyles.overlay} onClick={onClose}></div>
            <section className={alertStyles.alert}>
                <h2 className={`${alertStyles.title} typo-20-24-500`}>{title}</h2>
                <p className={`${alertStyles.text} typo-16-24-400`}>{text}</p>
            </section>
        </div>
    )
}

export default Alert
