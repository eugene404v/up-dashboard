import React from 'react'
import modalStyles from "./Modal.module.css"
import alertStyles from "./Alert.module.css"
import Button from 'components/Buttons/Button'

type propsType = {
    onClose: () => void;
    title: string;
    containerClassNames?: string;
    classnames?: string;
    text: string;
    btns?: "double" | "single";
    onAccept?: () => void;
    onDecline?: () => void;
    acceptText?: string;
    declineText?: string;
}

function Prompt({ onClose, title, classnames, containerClassNames, text, btns = "double", onAccept, onDecline, acceptText, declineText }: propsType) {
    React.useEffect(() => {
        document.body.style.overflowY = "hidden"
        return () => {
            document.body.style.overflowY = "auto"
        }
    }, [])

    return (
        <div className={`${modalStyles.container} ${containerClassNames || ""}`}>
            <div className={modalStyles.overlay} onClick={onClose}></div>
            <section className={alertStyles.alert}>
                <h2 className={`${alertStyles.title} typo-20-24-500`}>{title}</h2>
                <p className={`${alertStyles.text} typo-16-24-400`}>{text}</p>

                {btns === "double" ?
                    <div className={alertStyles.buttons}>
                        <Button text={declineText || ""} onClick={onDecline} size="small" color="text" />
                        <Button text={acceptText || ""} onClick={onAccept} size="small" color="red" />
                    </div> : 
                    <div className={alertStyles.buttons}>
                        <Button text={acceptText || ""} onClick={onAccept} size="small" color="text" />
                    </div>}
            </section>
        </div>
    )
}

export default Prompt
