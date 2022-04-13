import Prompt from 'components/Modals/Prompt'
import React from 'react'

type propsType = {
    onClose: () => void;
    containerClassNames?: string;
    classnames?: string;
    onAccept?: () => void;
}

function DeleteUserPrompt(props: propsType) {
    return (
        <Prompt {...props} title="Удалить" text="Вы уверены, что хотите удалить аккаунт?" acceptText="Удалить" declineText="Отмена" btns="double" onDecline={props.onClose} />
    )
}

export default DeleteUserPrompt
