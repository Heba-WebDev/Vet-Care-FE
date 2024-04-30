"use client";
import Link from "next/link";
import { Form, Formik } from "formik";
import { loginValidationSchema } from "../validation";
import { FormValues, ILogin } from "../interfaces";
import { useAppDispatch } from "@/app/hooks/store";
import { loginStaffApi } from "../api";
import { loginStaff } from "@/app/store/staff/slice";
import { toast } from "react-toastify";
import { CustomError } from "@/app/utils/CustomError";

export default function LoginForm() {
  const initialValues: FormValues = {
    email: "",
    password: "",
  };
  const disptach = useAppDispatch();
  const handleSubmission = async (values: ILogin) => {
    try {
      const res = await loginStaffApi(values);
      toast.success(res?.message);
      if (res.token) {
        disptach(
          loginStaff({
            status: res.status,
            message: res.message,
            data: res.data,
            token: res.token,
          })
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        const customError = error as CustomError;
        if (customError.isCustomError) {
          toast(customError.response.data.message);
        } else {
          console.error(customError.message);
        }
      }
    }
  };
  return (
    <section className="grid items-center px-6 md:max-w-[580px] md:w-full md:mx-auto gap-6 py-14 md:px-2">
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmission}
        className=""
      >
        {(formik) => (
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="email" className=" text-sm">
                {formik.touched.email && formik.errors.email ? (
                  <p className=" text-red-600">{formik.errors.email}</p>
                ) : (
                  ""
                )}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="on"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="border pl-10 focus:bg-[#0575E6] focus:bg-opacity-10 py-3  px-2 rounded-full focus:outline-[#3396f9]"
              />
            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="password" className=" text-sm">
                {formik.touched.password && formik.errors.password ? (
                  <p className=" text-red-600">{formik.errors.password}</p>
                ) : (
                  ""
                )}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="on"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="border pl-10 focus:bg-[#0575E6] focus:bg-opacity-10 py-3  px-2 rounded-full focus:outline-[#3396f9]"
              />
            </div>
            <button
              type="submit"
              className=" bg-[#15487f] hover:bg-[#1f6fbf] py-3  px-1 text-white rounded-lg mt-4 w-full"
            >
              {formik.isSubmitting ? "Loading..." : "Login"}
            </button>
            <Link
              href="/signup"
              className="text-[#15487f] text-center underline"
            >
              Do not have an account? Sign up
            </Link>
          </Form>
        )}
      </Formik>
    </section>
  );
}
