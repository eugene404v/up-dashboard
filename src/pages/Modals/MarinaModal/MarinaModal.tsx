import React from 'react'
import EntityModal from '../EntityModal/EntityModal'
import { useGetMarinasQuery, useDeleteMarinaMutation } from 'redux/ducks/marinas/marinasQuery'


type propsType = {
    onClose: (e: React.MouseEvent) => void;
    onOpenAddModal?: () => void;
}

function MarinaModal({onClose, onOpenAddModal}: propsType) {
    const {data: marinas} = useGetMarinasQuery()
    const [deleteMarina, deletingResult] = useDeleteMarinaMutation()

    const deleteHandler = (id: number) => {
        deleteMarina(id)
    }

    return (
        <EntityModal 
            onClose={onClose} 
            data={marinas||[]} 
            title="Марины" 
            addBtnText="Добавить марину" 
            onOpenAddModal={onOpenAddModal} 
            onDelete={deleteHandler} 
            pendingDeletingState={deletingResult.isLoading} 
        />
    )
}

export default MarinaModal
