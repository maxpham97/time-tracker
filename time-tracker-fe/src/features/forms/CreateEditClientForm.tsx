import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateClients, useEditClients } from "../../api/client/clientQueries";
import { ClassicInput } from "../../components/inputs/classicInput";
import type { ClientResponseDto } from "../../models/client/Client";
import type { CreateClientDto } from "../../models/client/CreateClientDto";

interface CreateEditClientFormProps {
    open: boolean;
    onClose: () => void;
    initialValues?: Partial<ClientResponseDto>;
    refetch: () => void;
    isEdit: boolean;
}

const CreateEditClientForm: React.FC<CreateEditClientFormProps> = ({ open, onClose, initialValues, refetch, isEdit }) => {
    //QUERIES
    const { mutateAsync: createClient } = useCreateClients();
    const { mutateAsync: editClient } = useEditClients();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateClientDto>({
        defaultValues: {
            name: "",
            address: "",
            mail: "",
            billingRate: 0,
            phone: "",
            ...initialValues,
        },
    });

    useEffect(() => {
        reset({
            name: "",
            address: "",
            mail: "",
            billingRate: 0,
            phone: "",
            ...initialValues,
        });
    }, [initialValues, reset]);

    const onSubmit = async (data: CreateClientDto) => {
        if (isEdit && initialValues) {
            await editClient({ id: Number(initialValues.id), dto: { ...data } });
        } else {
            await createClient({
                ...data,
                isActive: true,
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
                <Dialog.Title className="text-xl font-semibold mb-4">{initialValues ? "Edit Client" : "Add Client"}</Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    <ClassicInput
                        label="Client Name"
                        placeholder="Name"
                        error={errors.name?.message}
                        {...register("name", {
                            required: "Name is required",
                        })}
                    />
                    <ClassicInput
                        label="Contact Email"
                        placeholder="you@example.com"
                        error={errors.mail?.message}
                        {...register("mail", {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email format",
                            },
                        })}
                    />
                    <ClassicInput label="Contact Phone" placeholder="+84..." error={errors.phone?.message} {...register("phone")} />
                    <ClassicInput label="Address" placeholder="..." error={errors.address?.message} {...register("address")} />
                    <ClassicInput
                        type="number"
                        label="Hourly Billing Rate"
                        placeholder="0"
                        error={errors.billingRate?.message}
                        {...register("billingRate", {
                            required: "Billing is required",
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

export default CreateEditClientForm;
