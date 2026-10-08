"use client";

import Link from "next/link";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/hooks/useLogin";
import { getErrorMessage } from "@/lib/getErrorMessage";
const loginSchema = z.object({
  email: z.email("Email is invalid").nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password should be at least 8 charecters")
    .nonempty("Password is required"),
});

type FormType = z.infer<typeof loginSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(loginSchema),
  });
  const loginMutation = useLogin();
  const emailField = register("email");
  const passwordField = register("password");

  const onSubmit: SubmitHandler<FormType> = (data: FormType) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="w-full  flex  items-center justify-center min-h-[80vh] bg-background">
      <div className="flex flex-col gap-8 sm:gap-10 m-2 p-4 sm:p-8 w-full max-w-125 sm:max-w-125 items-center justify-center border rounded">
        <div className="flex flex-col items-center gap-4">
          <h3 className=" text-xl sm:text-2xl font-semibold text-foreground">
            Join the DEV Community
          </h3>
        </div>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full font-semibold text-secondary-foreground"
        >
          <label htmlFor="email">Email</label>
          <input
            {...emailField}
            onChange={(event) => {
              emailField.onChange(event);
              loginMutation.reset();
            }}
            className="border h-10 rounded p-2 font-normal"
            type="email"
            id="email"
          />
          {errors.email && (
            <p className="text-red-400 font-normal">{errors.email.message}</p>
          )}
          <label htmlFor="password">Password</label>
          <input
            {...passwordField}
            onChange={(event) => {
              passwordField.onChange(event);
              loginMutation.reset();
            }}
            className="border h-10 rounded p-2 font-normal"
            type="password"
            id="password"
          />
          {errors.password && (
            <p className="text-red-400 font-normal">
              {errors.password.message}
            </p>
          )}
          {loginMutation.isError && (
            <p className="text-red-400 font-normal">
              {getErrorMessage(loginMutation.error)}
            </p>
          )}
          <button
            disabled={loginMutation.isPending}
            className="cursor-pointer bg-chart-4 text-background h-10 rounded mt-4 hover:bg-chart-5"
            type="submit"
          >
            {loginMutation.isPending ? "loading... " : "Log in"}
          </button>
        </form>
        <div className="flex gap-1 flex-wrap ">
          <p>New to DEV Community?</p>
          <Link className="text-chart-3" href="/signup">
            Create account.
          </Link>
        </div>
      </div>
    </div>
  );
}
