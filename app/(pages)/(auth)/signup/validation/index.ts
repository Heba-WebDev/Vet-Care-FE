import * as Yup from "yup";

const validJobTitles = ["Manager", "HR", "Receptionist", "Veterinarian", "Asistant", "Technician"];

export const signupValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be 2 characters or more")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Must be 6 characters or more")
    .required("Password is required"),
  phone_number: Yup.string().matches(/^[\d- ]{6,}$/, "Invalid phone number").required("Phone number is required"),
  job_title: Yup.string().oneOf(validJobTitles, "Invalid job title").required("Job title is required")
});
