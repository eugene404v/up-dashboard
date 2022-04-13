import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import React from 'react'
import styles from "./PhotoUploader.module.css"

type propsType = {
    id?: number;
    photo?: string;
    onOpen?: (index: number) => void;
    onDelete?: (id: number) => void;
    onMakeMain?: (id: number) => void;
    isMain?: boolean;
    type: "New" | "Existing" | "Loading";
    index: number;
}

function PhotoUploadItem({id, photo, onDelete, onMakeMain, onOpen, isMain, index, type}: propsType) {
    const deleteHandler = () => {
        onDelete && onDelete(index)
        setIsDisabled(true)
    }

    const dropDownData = isMain ? [
        {text: "Открыть", onClick: () => onOpen!(index||0)},
        {text: "Удалить", onClick: () => onDelete!(type==="New" ? index : id as number) }
    ] : [
        {text: "Открыть", onClick: () => onOpen!(index||0) },
        {text: "Сделать основной", onClick: () => onMakeMain!(type==="New" ? index : id as number) },
        {text: "Удалить", onClick: () => onDelete!(type==="New" ? index : id as number) }
    ] 
    const [isDisabled, setIsDisabled] = React.useState(type === "Loading")

    return (
        <div className={`${styles.item} ${isDisabled ? styles.loading : ""}`}>
            <DropdownMenu data={dropDownData} className={styles.dropdownMenu}>
                <img src={photo} className={`${styles.img} ${isMain ? styles.isMain : ""}`} />
            </DropdownMenu>
        </div>
    )
}

export default PhotoUploadItem
