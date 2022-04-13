import React from 'react'
import styles from "./EntityModal.module.css"
import Button from 'components/Buttons/Button'
import Input from 'components/Inputs/Input'
import Modal from 'components/Modals/Modal'
import MarinaRow from './MarinaRow'
import { apiArrayType, pendingStateType } from 'types/utilTypes'

type propsType = {
    onClose: (e: React.MouseEvent) => void;
    data: apiArrayType[];
    onDelete: (id: number) => void;
    onOpenAddModal?: () => void;
    title: string;
    addBtnText: string;
    pendingDeletingState?: boolean;
}

function EntityModal({onClose, data, onDelete, onOpenAddModal, title, addBtnText, pendingDeletingState}: propsType) {
    const [filteredData, setFilteredData] = React.useState(data)

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilteredData(data.filter(el => el.name.toLowerCase().includes(value.toLowerCase())));
    }

    React.useEffect(() => {
        setFilteredData(data)
    }, [data, pendingDeletingState])

    return (
        <Modal onClose={onClose} title={title} classnames={styles.modal}>
            <Input placeholder="Поиск" containerClassNames={styles.search} onChange={inputHandler} />
            <Button text={addBtnText} color="text" prefix="plus" additionalClassNames={styles.addBtn} onClick={onOpenAddModal} />
            <ul className={`${styles.list} ${pendingDeletingState?styles.deleting:""}`}>
                {Array.isArray(filteredData) && filteredData.map((el:apiArrayType) => (
                    <MarinaRow 
                        key={Math.random()} 
                        id={el.id as number} 
                        name={el.name} 
                        onDelete={() => onDelete(el.id as number)} 
                    />))}
            </ul>
        </Modal>
    )
}

export default EntityModal
