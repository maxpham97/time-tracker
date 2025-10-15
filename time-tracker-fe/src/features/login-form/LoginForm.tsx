import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ClassicButton } from "../../components/buttons/ClassicButton";
import { ClassicInput } from "../../components/inputs/classicInput";

interface LoginFormValues {
    email: string;
    password: string;
}

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>();

    const navigate = useNavigate();

    const onSubmit = async (data: LoginFormValues) => {
        console.log("Login:", data);
        await new Promise((res) => setTimeout(res, 800)); // mock delay
        navigate("/dashboard");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-semibold text-center mb-2">Time Tracking System</h2>
            <h3 className="text-gray-500 text-sm text-center mb-4">Please sign in to continue</h3>

            <ClassicInput
                label="Username or email"
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
                label="Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                })}
            />

            <ClassicButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign in"}
            </ClassicButton>
        </form>
    );
};
