export type User = {
    id: string;
    first_name: string | null;
    last_name: string | null;
    email: string;
    photo: string | null;
    role: "user" | "admin" | "super admin";
    created_at: string;
    updated_at: string;
};
