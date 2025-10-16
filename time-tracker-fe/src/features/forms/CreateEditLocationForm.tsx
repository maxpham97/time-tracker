import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateLocation, useEditLocations } from "../../api/location/locationsQueries";
import { ClassicInput } from "../../components/inputs/classicInput";
import type { CreateLocationDto } from "../../models/locations/CreateLocationDto";
import type { LocationResponseDto } from "../../models/locations/Locations";

interface CreateEditLocationFormProps {
    open: boolean;
    onClose: () => void;
    initialValues?: Partial<LocationResponseDto>;
    refetch: () => void;
    isEdit: boolean;
}

const CreateEditLocationForm: React.FC<CreateEditLocationFormProps> = ({ open, onClose, initialValues, refetch, isEdit }) => {
    //QUERIES
    const { mutateAsync: createLocation } = useCreateLocation();
    const { mutateAsync: editLocation } = useEditLocations();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateLocationDto>({
        defaultValues: {
            name: "",
            address: "",
            ...initialValues,
        },
    });

    useEffect(() => {
        reset({
            name: "",
            address: "",
            ...initialValues,
        });
    }, [initialValues, reset]);

    const onSubmit = async (data: CreateLocationDto) => {
        if (isEdit && initialValues) {
            await editLocation({ id: Number(initialValues.id), dto: { ...data } });
            alert("Edit success");
        } else {
            await createLocation({
                ...data,
                isActive: true,
            });
            alert("Create success");
        }
        refetch();
        onClose();
    };

    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Dialog.Root open={open} onOpenChange={(val: any) => !val && onClose()}>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 w-96 p-6 bg-white rounded-md -translate-x-1/2 -translate-y-1/2 shadow-lg">
                <Dialog.Title className="text-xl font-semibold mb-4">{initialValues ? "Edit Location" : "Add Location"}</Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    <ClassicInput
                        label="Location Name"
                        placeholder="Name"
                        error={errors.name?.message}
                        {...register("name", {
                            required: "Name is required",
                        })}
                    />

                    <ClassicInput label="Address" placeholder="..." error={errors.address?.message} {...register("address")} />
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

export default CreateEditLocationForm;
