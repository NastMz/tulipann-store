import {StaticTable} from "../common";
import {selectCities, selectDepartments, selectUsers} from "../../redux/selector";
import {useSelector} from "react-redux";

export const UserPage = () => {

    const users = useSelector(selectUsers);

    const cities = useSelector(selectCities);

    const departments = useSelector(selectDepartments);

    const tableUsers = users.map((user) => {
        return {
            id: user.id,
            name: user.firstName + ' ' + user.lastName,
            email: user.email,
            phone: user.phone,
            address: cities.find(city => city.id === user.cityId)?.name + ', ' + departments.find(department => department.id === user.departmentId)?.name
        }
    });

    return (
        <div
            className={'h-full w-full'}
        >
            <StaticTable
                headersMap={{
                    id: 'ID',
                    name: 'Nombre',
                    email: 'Correo',
                    phone: 'Teléfono',
                    address: 'Dirección',
                }}
                data={tableUsers}
                itemsPerPage={5}
            />
        </div>
    )
}