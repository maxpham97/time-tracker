import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateEmployee, useEditEmployee } from "../../api/employee/employeeQueries";
import { ClassicInput } from "../../components/inputs/classicInput";

export interface EmployeeFormValues {
    name: string;
    email: string;
    role: string;
    cost: number;
    isActive?: boolean;
    id?: number;
}

interface CreateEditEmployeeFormProps {
    open: boolean;
    onClose: () => void;
    initialValues?: Partial<EmployeeFormValues>;
    refetch: () => void;
    isEdit: boolean;
}

const CreateEditEmployeeForm: React.FC<CreateEditEmployeeFormProps> = ({ open, onClose, initialValues, refetch, isEdit }) => {
    //QUERIES
    const { mutateAsync: createEmployee } = useCreateEmployee();
    const { mutateAsync: editEmployee } = useEditEmployee();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<EmployeeFormValues>({
        defaultValues: {
            name: "",
            email: "",
            role: "",
            cost: 0,
            ...initialValues,
        },
    });

    useEffect(() => {
        reset({
            name: "",
            email: "",
            role: "",
            cost: 0,
            ...initialValues,
        });
    }, [initialValues, reset]);

    const onSubmit = async (data: EmployeeFormValues) => {
        if (isEdit && initialValues) {
            await editEmployee({ id: Number(initialValues.id), dto: { ...data } });
        } else {
            await createEmployee({
                ...data,
                isActive: true,
                isAdmin: false,
            });
        }
        refetch();
        onClose();
    };

    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Dialog.Root open={open} onOpenChange={(val: any) => !val && onClose()}>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 w-96 p-6 bg-white rounded-md -translate-x-1/2 -translate-y-1/2 shadow-lg">
                <Dialog.Title className="text-xl font-semibold mb-4">{initialValues ? "Edit Employee" : "Create Employee"}</Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    <ClassicInput
                        label="Name"
                        placeholder="Name"
                        error={errors.name?.message}
                        {...register("name", {
                            required: "Name is required",
                        })}
                    />
                    <ClassicInput
                        label="Email"
                        placeholder="you@example.com"
                        error={errors.email?.message}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email format",
                            },
                        })}
                    />
                    <ClassicInput
                        label="Role"
                        placeholder="e.g., Developer, Manager, Designer"
                        error={errors.role?.message}
                        {...register("role", {
                            required: "Role is required",
                        })}
                    />
                    <ClassicInput
                        type="number"
                        label="Hourly Cost Rate"
                        placeholder="0"
                        error={errors.cost?.message}
                        {...register("cost", {
                            required: "Cost is required",
                        })}
                    />
                    <div className="flex justify-end gap-2 mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Save
                        </button>
                    </div>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default CreateEditEmployeeForm;
