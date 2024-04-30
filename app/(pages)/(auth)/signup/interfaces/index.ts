
export interface FormValues {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  job_title: string;
}

export type ISignUp = {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  job_title: string;
};


export type ISignUpResponse = {
  status: string;
  message: string;
  data: null
};