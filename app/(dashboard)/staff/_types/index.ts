export type Staff = {
    id?: string;
    first_name: string;
    last_name: string;
    contact_number: string;
    email: string;
    role: string;
    status: string;
};

export type ErrorState = {
    first_name?: string;
    last_name?: string;
    contact_number?: string;
    email?: string;
    role?: string;
    status?: string;
};
