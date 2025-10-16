import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useEditClients, useGetClients } from "../../../api/client/clientQueries";
import { ClassicButton } from "../../../components/buttons/ClassicButton";
import { ClassicTable } from "../../../components/tables/ClassicTable";
import type { ClientResponseDto } from "../../../models/client/Client";
import type { UserResponseDto } from "../../../models/user/UserResponseDto";
import { useGetUserData } from "../../../redux/user/userSlice";
import CreateEditClientForm from "../../forms/CreateEditClientForm";

const ClientsTab = () => {
    const user = useGetUserData() as unknown as UserResponseDto;
    const [openForm, setOpenForm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [clientData, setClientData] = useState<Partial<ClientResponseDto>>({
        name: "",
        address: "",
        mail: "",
        isActive: false,
        billingRate: 0,
        phone: "",
    });

    // QUERIES
    const { data: clientsData, refetch } = useGetClients();
    const { mutateAsync: editClient } = useEditClients();

    const baseColumns: ColumnDef<ClientResponseDto>[] = [
        { header: "Name", accessorKey: "name" },
        { header: "Email", accessorKey: "mail" },
        { header: "Phone", accessorKey: "phone" },
        { header: "Address", accessorKey: "address" },
        { header: "Billing Rate", accessorKey: "billingRate" },
        {
            header: "Status",
            accessorKey: "isActive",
            cell: ({ row }) => {
                const isActive = row.original.isActive;
                return <span className={isActive ? "text-green-600" : "text-red-600"}>{isActive ? "Active" : "Inactive"}</span>;
            },
        },
    ];

    const adminColumns: ColumnDef<ClientResponseDto>[] = user?.isAdmin
        ? [
              {
                  header: "Actions",
                  accessorKey: "actions",
                  cell: ({ row }) => {
                      const client = row.original;

                      const handleEdit = () => {
                          setOpenForm(true);
                          setIsEdit(true);
                          setClientData(client);
                          console.log("Edit employee:", client);
                      };

                      const handleDeactivate = async () => {
                          console.log("Deactivate employee:", client);
                          await editClient({
                              id: Number(client.id),
                              dto: { ...client, isActive: !client.isActive },
                          });
                          alert("Edit success");
                          refetch();
                      };

                      return (
                          <div className="flex gap-2">
                              <ClassicButton onClick={handleEdit}>Edit</ClassicButton>
                              <ClassicButton
                                  onClick={handleDeactivate}
                                  className={`text-white px-3 py-1 rounded ${
                                      client.isActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                                  }`}>
                                  {client.isActive ? "Deactivate" : "Activate"}
                              </ClassicButton>
                          </div>
                      );
                  },
              },
          ]
        : [];

    const columns = [...baseColumns, ...adminColumns];

    const onClose = () => {
        setClientData({
            name: "",
            address: "",
            mail: "",
            isActive: false,
            billingRate: 0,
            phone: "",
        });
        setOpenForm(false);
        setIsEdit(false);
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex w-full justify-between">
                <span className="text-gray-700 text-2xl">Clients</span>
                {user?.isAdmin && <ClassicButton onClick={() => setOpenForm(true)}>Create Clients</ClassicButton>}
            </div>

            <ClassicTable columns={columns} data={(clientsData as ClientResponseDto[]) || []} />

            <CreateEditClientForm initialValues={clientData} isEdit={isEdit} onClose={onClose} open={openForm} refetch={refetch} />
        </div>
    );
};

export default ClientsTab;
