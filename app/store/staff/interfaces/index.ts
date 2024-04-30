export interface Staff {
    status: string,
    message: string,
    data: {
            id: string,
            email: string,
            job_title: string,
            permission_type: string,
            verified: string
    } | null,
    token: string | null
}

export interface ILogin {
  email: string;
  password: string;
}