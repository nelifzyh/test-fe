"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { loginUser } from "@/lib/api";
import LoadingOverlay from "@/components/LoadingOverlay";

const loginSchema = z.object({
    username: z.string().min(3, "Username minimal 3 karakter"),
    password: z.string().min(6, "Password minimal 6 karakter"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        setLoading(true);
        setErrorMsg("");

        try {
            const response = await loginUser(data.username, data.password);
            console.log("Login Success:", response);

            // simpan token & role di localStorage
            localStorage.setItem("token", response.token);
            localStorage.setItem("role", response.role);

            // redirect berdasarkan role
            if (response.role === "Admin") {
                router.push("/list-article");
            } else {
                router.push("/article");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMsg(error.message);
            } else {
                setErrorMsg("Login gagal");
            }
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white md:bg-gray-100">
            {loading && <LoadingOverlay />}
            <div className="w-full max-w-md md:bg-white md:rounded-2xl md:shadow p-6 md:p-8">
                {/* Logo */}
                <div className="flex justify-center mb-6 mt-6">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={100}
                        height={100}
                        priority
                        className="scale-125"
                    />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-bold mb-1 text-gray-800">Username</label>
                        <input
                            type="text"
                            placeholder="Input username"
                            {...register("username")}
                            className="w-full rounded-md border px-3 py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.username && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-bold mb-1  text-gray-800">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Input password"
                                {...register("password")}
                                className="w-full rounded-md border px-3 py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-gray-500"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Error message */}
                    {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        Login
                    </button>
                </form>

                {/* Register link */}
                <p className="text-center text-sm mt-5 text-gray-700">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-blue-600 hover:underline">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}
