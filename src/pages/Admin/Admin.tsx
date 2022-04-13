import TableActivity from 'components/Table/TableActivity'
import TableUsers from 'components/Table/TableUsers'
import React from 'react'
import { activityAdminDataType, activitytypesEnum, createUserType, usersAdminDataType } from 'types/reduxTypes/adminTypes'
import { vehiclesCategoriesEnum } from 'types/vehicleTypes/vehiclesTypes'
import CreateUserModal from './components/CreateUserModal'
import DeleteUserPrompt from './components/DeleteUserPrompt'
import EditUserModal from './components/EditUserModal'

const data: Array<usersAdminDataType> = [{
    id: 1,
    name: "Stanislaus",
    lastActivity: "2021-07-28T13:55:53.866Z",
    role: 0
}, {
    id: 2,
    name: "Margatet",
    lastActivity: "2021-07-28T12:55:53.866Z",
    role: 1
}, {
    id: 3,
    name: "Veronika",
    lastActivity: "2021-05-28T12:55:53.866Z",
    role: 1
},]

const activities: Array<activityAdminDataType> = [
    {
        id: 1,
        name: "Margatet",
        lastActivity: "2021-05-28T12:55:53.866Z",
        vehicleType: vehiclesCategoriesEnum.yacht,
        idVehicle: 1,
        vehicleName: "Jeanneau Sun Odyssey 419",
        actionType: activitytypesEnum.edit
    },
    {
        id: 2,
        name: "Margatet",
        lastActivity: "2021-05-28T12:55:53.866Z",
        vehicleType: vehiclesCategoriesEnum.jet,
        idVehicle: 2,
        vehicleName: "Sun Odyssey Jeanneau 419",
        actionType: activitytypesEnum.delete
    },
    {
        id: 3,
        name: "Valera",
        lastActivity: "2021-05-28T12:55:53.866Z",
        vehicleType: vehiclesCategoriesEnum.jet,
        idVehicle: 4,
        vehicleName: "Sun Jeanneau Odyssey 419",
        actionType: activitytypesEnum.addToDrafts
    },
    {
        id: 13,
        name: "Margatet",
        lastActivity: "2021-05-28T12:55:53.866Z",
        vehicleType: vehiclesCategoriesEnum.yacht,
        idVehicle: 13,
        vehicleName: "Odyssey Jeanneau Sun 419",
        actionType: activitytypesEnum.publish
    },
]

function Admin() {
    const [isCreatingUser, setIsCreatingUser] = React.useState(false)
    const [deletingUserId, setDeletingUserId] = React.useState(-1)
    const [editinUserId, setEditingUserId] = React.useState(-1)

    return (
        <>
            <div className="wrapper">
                <TableUsers title="Пользователи" data={data} onDelete={(id) => setDeletingUserId(id)} onEdit={(id) => setEditingUserId(id)} onOpenModal={() => setIsCreatingUser(true)} />
                <TableActivity title="Активность" data={activities} />
            </div>
            {isCreatingUser && <CreateUserModal onClose={() => setIsCreatingUser(false)} onSubmit={(value: createUserType) => console.log(value)} />}
            {deletingUserId >=0 && <DeleteUserPrompt onClose={() => setDeletingUserId(-1)} onAccept={() => alert(deletingUserId)} />}
            {editinUserId >=0 && <EditUserModal id={1488} login="oleg228" role={1} onClose={() => setEditingUserId(-1)} onSubmit={(value: createUserType, id: number) => console.log(value, id)} />}
        </>
    )
}

export default Admin
