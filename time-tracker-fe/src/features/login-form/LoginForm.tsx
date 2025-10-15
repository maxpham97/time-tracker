import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../api/auth/authQueries";
import { ClassicButton } from "../../components/buttons/ClassicButton";
import { ClassicInput } from "../../components/inputs/classicInput";
import type { LoginDto } from "../../models/auth/AuthDto";

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginDto>();
    const { mutateAsync: login } = useLogin();

    const navigate = useNavigate();

    const onSubmit = async (data: LoginDto) => {
        try {
            const res = await login(data);
            localStorage.setItem("token", res.token);
            navigate("/dashboard");
        } catch (er) {
            console.log(er);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-semibold text-center mb-2">Time Tracking System</h2>
            <h3 className="text-gray-500 text-sm text-center mb-4">Please sign in to continue</h3>

            <ClassicInput
                label="Username or email"
                placeholder="you@example.com"
                error={errors.userName?.message}
                {...register("userName", {
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
