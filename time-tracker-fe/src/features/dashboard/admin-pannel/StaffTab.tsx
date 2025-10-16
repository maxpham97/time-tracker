import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useEditEmployee, useGetEmployees } from "../../../api/employee/employeeQueries";
import { ClassicButton } from "../../../components/buttons/ClassicButton";
import { ClassicTable } from "../../../components/tables/ClassicTable";
import type { IEmPloyee } from "../../../models/employee/Employee";
import type { UserResponseDto } from "../../../models/user/UserResponseDto";
import { useGetUserData } from "../../../redux/user/userSlice";
import CreateEditEmployeeForm from "../../forms/CreateEditEmployeeForm";

const StaffTab = () => {
    const user = useGetUserData() as unknown as UserResponseDto;

    const [openForm, setOpenForm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [employeeData, setEmployeeData] = useState<Partial<IEmPloyee>>({
        name: "",
        cost: 0,
        email: "",
        isActive: false,
        role: "",
    });

    // QUERIES
    const { data: employeesData, refetch } = useGetEmployees();
    const { mutateAsync: editEmployee } = useEditEmployee();

    const baseColumns: ColumnDef<IEmPloyee>[] = [
        { header: "Name", accessorKey: "name" },
        { header: "Email", accessorKey: "email" },
        { header: "Role", accessorKey: "role" },
        { header: "Hour Cost", accessorKey: "cost" },
        {
            header: "Status",
            accessorKey: "isActive",
            cell: ({ row }) => {
                const isActive = row.original.isActive;
                return <span className={isActive ? "text-green-600" : "text-red-600"}>{isActive ? "Active" : "Inactive"}</span>;
            },
        },
    ];

    const adminColumns: ColumnDef<IEmPloyee>[] = user?.isAdmin
        ? [
              {
                  header: "Actions",
                  accessorKey: "actions",
                  cell: ({ row }) => {
                      const employee = row.original;

                      const handleEdit = () => {
                          setOpenForm(true);
                          setIsEdit(true);
                          setEmployeeData(employee);
                      };

                      const handleDeactivate = async () => {
                          await editEmployee({
                              id: Number(employee.id),
                              dto: { ...employee, isActive: !employee.isActive },
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
                                      employee.isActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                                  }`}>
                                  {employee.isActive ? "Deactivate" : "Activate"}
                              </ClassicButton>
                          </div>
                      );
                  },
              },
          ]
        : [];

    const columns = [...baseColumns, ...adminColumns];

    const onClose = () => {
        setEmployeeData({
            name: "",
            cost: 0,
            email: "",
            isActive: false,
            role: "",
        });
        setOpenForm(false);
        setIsEdit(false);
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex w-full justify-between">
                <span className="text-gray-700 text-2xl">Staff Members</span>
                {user?.isAdmin && <ClassicButton onClick={() => setOpenForm(true)}>Create Staff</ClassicButton>}
            </div>

            <ClassicTable columns={columns} data={(employeesData as IEmPloyee[]) || []} />

            <CreateEditEmployeeForm isEdit={isEdit} refetch={refetch} open={openForm} onClose={onClose} initialValues={employeeData} />
        </div>
    );
};

export default StaffTab;
