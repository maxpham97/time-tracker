import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useEditLocations, useGetLocations } from "../../../api/location/locationsQueries";
import { ClassicButton } from "../../../components/buttons/ClassicButton";
import { ClassicTable } from "../../../components/tables/ClassicTable";
import type { LocationResponseDto } from "../../../models/locations/Locations";
import type { UserResponseDto } from "../../../models/user/UserResponseDto";
import { useGetUserData } from "../../../redux/user/userSlice";
import CreateEditLocationForm from "../../forms/CreateEditLocationForm";

const LocationTab = () => {
    const user = useGetUserData() as unknown as UserResponseDto;
    const [openForm, setOpenForm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [clientData, setClientData] = useState<Partial<LocationResponseDto>>({
        name: "",
        address: "",
        isActive: false,
    });

    // QUERIES
    const { data: locations, refetch } = useGetLocations();
    const { mutateAsync: editLocation } = useEditLocations();

    const baseColumns: ColumnDef<LocationResponseDto>[] = [
        { header: "Name", accessorKey: "name" },
        { header: "Address", accessorKey: "address" },
        {
            header: "Status",
            accessorKey: "isActive",
            cell: ({ row }) => {
                const isActive = row.original.isActive;
                return <span className={isActive ? "text-green-600" : "text-red-600"}>{isActive ? "Active" : "Inactive"}</span>;
            },
        },
    ];

    const adminColumns: ColumnDef<LocationResponseDto>[] = user?.isAdmin
        ? [
              {
                  header: "Actions",
                  accessorKey: "actions",
                  cell: ({ row }) => {
                      const location = row.original;

                      const handleEdit = () => {
                          setOpenForm(true);
                          setIsEdit(true);
                          setClientData(location);
                          console.log("Edit location:", location);
                      };

                      const handleDeactivate = async () => {
                          console.log("Deactivate location:", location);
                          await editLocation({
                              id: Number(location.id),
                              dto: { ...location, isActive: !location.isActive },
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
                                      location.isActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                                  }`}>
                                  {location.isActive ? "Deactivate" : "Activate"}
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
            isActive: false,
        });
        setOpenForm(false);
        setIsEdit(false);
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex w-full justify-between">
                <span className="text-gray-700 text-2xl">Locations</span>
                {user?.isAdmin && <ClassicButton onClick={() => setOpenForm(true)}>Create Location</ClassicButton>}
            </div>

            <ClassicTable columns={columns} data={(locations as LocationResponseDto[]) || []} />

            <CreateEditLocationForm isEdit={isEdit} onClose={onClose} open={openForm} refetch={refetch} initialValues={clientData} />
        </div>
    );
};

export default LocationTab;
