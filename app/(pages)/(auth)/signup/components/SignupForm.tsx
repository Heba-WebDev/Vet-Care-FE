"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import Select from "react-select";
import { jobsList } from "@/app/utils/ListOfJobs";
import { signupValidationSchema } from "../validation";
import { FormValues, ISignUp } from "../interfaces";
import Link from "next/link";
import { toast } from "react-toastify";
import { CustomError } from "@/app/utils/CustomError";
import { registerStaffApi, registerVetApi } from "../api";

export default function SignUpForm() {
  const initialValues: FormValues = {
    name: "",
    email: "",
    password: "",
    phone_number: "",
    job_title: "",
  };
  const [isStaff, setIsStaff] = useState(true);
  const router = useRouter();
  const id = Date.now().toString();
  const [isMounted, setIsMounted] = useState(false);

  const handleSubmit = async (values: ISignUp) => {
    try {
      const type = jobsList.find((option) => option.value === values.job_title);
      let res;
      if (type?.type === "Staff") {
        res = await registerStaffApi({
          name: values.name,
          email: values.email,
          password: values.password,
          phone_number: values.phone_number,
          job_title: values.job_title,
        });
      } else {
        res = await registerVetApi({
          name: values.name,
          email: values.email,
          password: values.password,
          phone_number: values.phone_number,
          job_title: values.job_title,
        });
      }
      toast.success(res?.message);
      router.push("/login");
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
  useEffect(() => setIsMounted(true), []);
  return (
    <section className="grid items-center px-6 md:max-w-[580px] md:w-full md:mx-auto gap-6 py-6 md:py-14 md:px-2">
      <Formik
        initialValues={initialValues}
        validationSchema={signupValidationSchema}
        onSubmit={handleSubmit}
        className=""
      >
        {(formik) => (
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="name" className=" text-sm">
                {formik.touched.name && formik.errors.name ? (
                  <p className=" text-red-600">{formik.errors.name}</p>
                ) : (
                  ""
                )}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                autoComplete="on"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="border pl-10 focus:bg-[#0575E6] focus:bg-opacity-10 py-3 px-2 rounded-full focus:outline-[#3396f9]"
              />
            </div>
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
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="phone_number" className=" text-sm">
                {formik.touched.phone_number && formik.errors.phone_number ? (
                  <p className=" text-red-600">{formik.errors.phone_number}</p>
                ) : (
                  ""
                )}
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="text"
                placeholder="Phone Number"
                onChange={formik.handleChange}
                value={formik.values.phone_number}
                className="border pl-10 focus:bg-[#0575E6] focus:bg-opacity-10 py-3  px-2 rounded-full focus:outline-[#3396f9]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="job_title" className="text-sm">
                {formik.touched.job_title && formik.errors.job_title ? (
                  <p className=" text-red-600">{formik.errors.job_title}</p>
                ) : (
                  ""
                )}
              </label>
              {isMounted && (
                <div className="relative">
                  <Select
                    id={id}
                    name="job_title"
                    placeholder="Job Title"
                    options={jobsList}
                    onChange={(option) => {
                      formik.setFieldValue("job_title", option?.value);
                    }}
                    value={jobsList.find(
                      (option) => option.value === formik.values.job_title
                    )}
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        backgroundColor: "white",
                        border: 0,
                        borderColor: state.isFocused
                          ? ""
                          : provided.borderColor,
                        boxShadow: state.isFocused ? "" : provided.boxShadow,
                        paddingLeft: "20px",
                        "&:hover": {
                          borderColor: state.isFocused
                            ? ""
                            : provided.borderColor,
                        },
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        color: state.isSelected ? "" : provided.color,
                        backgroundColor: state.isSelected
                          ? ""
                          : provided.backgroundColor,
                        "&:hover": {
                          color: "#0047AB",
                          backgroundColor: "",
                        },
                      }),
                    }}
                    className="border placeholder:opacity-80 py-2 bg-white px-2 rounded-full focus:outline-[#33A077]"
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              className=" bg-[#15487f] hover:bg-[#1f6fbf] hover:cursor-pointer py-3  px-1 text-white rounded-lg mt-4 w-full"
            >
              {formik.isSubmitting ? "Loading..." : "Sign up"}
            </button>
            <Link
              href="/login"
              className="text-[#15487f] text-center underline"
            >
              Already have an account? Login
            </Link>
          </Form>
        )}
      </Formik>
    </section>
  );
}
