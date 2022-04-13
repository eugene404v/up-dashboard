import React from 'react'
import EntityModal from '../EntityModal/EntityModal'
import { useDeleteJetManufacturerMutation, useGetJetManufacturersQuery } from 'redux/ducks/manufacturers/manufacturersQuery'


type propsType = {
    onClose: (e: React.MouseEvent) => void;
    onOpenAddModal?: () => void;
}

function JetProducerModal({onClose, onOpenAddModal}: propsType) {
    const {data: manufacturersJet} = useGetJetManufacturersQuery()
    const [deleteJetManufacturer] = useDeleteJetManufacturerMutation()

    const deleteHandler = (id: number) => {
        deleteJetManufacturer(id)
    }

    return (
        <EntityModal onClose={onClose} data={manufacturersJet||[]} title="Производители" addBtnText="Добавить производителя" onOpenAddModal={onOpenAddModal} onDelete={deleteHandler} />
    )
}

export default JetProducerModal
