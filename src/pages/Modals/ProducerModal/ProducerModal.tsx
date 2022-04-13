import React from 'react'
import EntityModal from '../EntityModal/EntityModal'
import { useDeleteYachtManufacturerMutation, useGetYachtManufacturersQuery } from 'redux/ducks/manufacturers/manufacturersQuery'


type propsType = {
    onClose: (e: React.MouseEvent) => void;
    onOpenAddModal?: () => void;
}

function ProducerModal({onClose, onOpenAddModal}: propsType) {
    const {data: manufacturersYacht} = useGetYachtManufacturersQuery()
    const [deleteYachtManufacturer] = useDeleteYachtManufacturerMutation()

    const deleteHandler = (id: number) => {
        deleteYachtManufacturer(id)
    }


    return (
        <EntityModal onClose={onClose} data={manufacturersYacht||[]} title="Производители" addBtnText="Добавить производителя" onOpenAddModal={onOpenAddModal} onDelete={deleteHandler} />
    )
}

export default ProducerModal
