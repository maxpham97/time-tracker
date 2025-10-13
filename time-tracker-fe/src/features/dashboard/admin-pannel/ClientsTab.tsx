import { ClassicTable } from "../../../components/tables/ClassicTable";
import { columns, data } from "../../../constants/mockData";

const ClientsTab = () => {
    return (
        <div className="flex flex-col gap-3">
            <span className="text-gray-700 text-2xl">Clients</span>
            <ClassicTable columns={columns} data={data} />
        </div>
    );
};

export default ClientsTab;
