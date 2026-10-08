"use client";
import Link from "next/link";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@/hooks/useSignUp";
import { getErrorMessage } from "@/lib/getErrorMessage";
const signupSchema = z
  .object({
    img: z.instanceof(File).nullable().optional(),
    name: z.string().nonempty("Name is required"),
    username: z.string().nonempty("Username is required"),
    email: z.email("Email is invalid").nonempty("Email is required"),
    password: z
      .string()
      .min(8, "Password should be at least 8 charecters")
      .nonempty("Password is required"),
    password_confirm: z.string().nonempty("Password confirmation is required"),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Passwords do not match",
    path: ["password_confirm"],
  });

type FormType = z.infer<typeof signupSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const signupMutation = useSignUp();
  const nameField = register("name");
  const usernameField = register("username");
  const emailField = register("email");
  const passwordField = register("password");
  const passwordConfirmField = register("password_confirm");

  const onSubmit: SubmitHandler<FormType> = (data: FormType) => {
    signupMutation.mutate(data);
  };

  return (
    <div className="w-full flex items-center justify-center bg-background min-h-[80vh]">
      <div className="flex flex-col gap-8 my-4 sm:gap-10 m-2 p-4 sm:p-8 w-full max-w-125 sm:max-w-125 items-center justify-center border rounded">
        <div className="flex flex-col items-center gap-4">
          <h3 className=" text-xl sm:text-2xl font-semibold text-primary">
            Create Your account
          </h3>
        </div>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full font-semibold text-primary"
        >
          <label htmlFor="img">Profile Image</label>

          <input
            id="image"
            className="border  p-2 h-12 rounded  font-normal file:bg-chart-4 file:text-background file:border-0 file:rounded file:px-4 file:py-1 file:cursor-pointer file:hover:bg-chart-5"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const files = (e.target as HTMLInputElement).files;
              const file = files?.[0] || null;
              setValue("img", file);
            }}
          />
          {errors.img && (
            <p className="text-red-400 font-normal">{errors.img.message}</p>
          )}
          <label htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            {...nameField}
            onChange={(event) => {
              nameField.onChange(event);
              signupMutation.reset();
            }}
            className="border h-10 rounded p-2 font-normal "
            type="text"
            id="name"
          />
          {errors.name && (
            <p className="text-red-400 font-normal">{errors.name.message}</p>
          )}
          <label htmlFor="username">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            {...usernameField}
            onChange={(event) => {
              usernameField.onChange(event);
              signupMutation.reset();
            }}
            className="border h-10 rounded p-2 font-normal"
            type="text"
            id="username"
          />
          {errors.username && (
            <p className="text-red-400 font-normal">
              {errors.username.message}
            </p>
          )}
          <label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...emailField}
            onChange={(event) => {
              emailField.onChange(event);
              signupMutation.reset();
            }}
            className="border h-10 rounded p-2 font-normal"
            type="email"
            id="email"
          />
          {errors.email && (
            <p className="text-red-400 font-normal">{errors.email.message}</p>
          )}
          <label htmlFor="password">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            {...passwordField}
            onChange={(event) => {
              passwordField.onChange(event);
              signupMutation.reset();
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
          <label htmlFor="password_confirm">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            {...passwordConfirmField}
            onChange={(event) => {
              passwordConfirmField.onChange(event);
              signupMutation.reset();
            }}
            className="border h-10 rounded p-2 font-normal"
            type="password"
            id="password_confirm"
          />
          {errors.password_confirm && (
            <p className="text-red-400 font-normal">
              {errors.password_confirm.message}
            </p>
          )}
          {signupMutation.isError && (
            <p className="text-red-400 font-normal">
              {getErrorMessage(signupMutation.error)}
            </p>
          )}
          <button
            disabled={signupMutation.isPending}
            className="cursor-pointer bg-chart-4 text-background h-10 rounded mt-4 hover:bg-chart-5"
            type="submit"
          >
            {signupMutation.isPending ? "loading... " : "Sign up"}
          </button>
        </form>
        <div className="flex gap-1 flex-wrap ">
          <p>You have an account?</p>
          <Link className="text-chart-3" href="/login">
            login
          </Link>
        </div>
      </div>
    </div>
  );
}
