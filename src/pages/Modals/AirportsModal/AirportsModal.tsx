import React from 'react'
import { useDeleteAirportMutation, useGetAirportsQuery } from 'redux/ducks/airports/airportsApi'
import EntityModal from '../EntityModal/EntityModal'

type propsType = {
    onClose: (e: React.MouseEvent) => void;
    onOpenAddModal?: () => void;
}

function AirportsModal({onClose, onOpenAddModal}: propsType) {
    const {data: airportsData} = useGetAirportsQuery()
    const [deleteAirport, deletingResult] = useDeleteAirportMutation()

    const deleteHandler = (id: number) => {
        deleteAirport(id)
    }

    return (
        <EntityModal 
            onClose={onClose} 
            data={airportsData||[]} 
            title="Аэропорты" 
            addBtnText="Добавить аэропорт" 
            onOpenAddModal={onOpenAddModal} 
            onDelete={deleteHandler} 
            pendingDeletingState={deletingResult.isLoading} 
        />
    )
}

export default AirportsModal
