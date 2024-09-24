import useAuth from "@/hooks/useAuth";

const Account = async () => {
    const { data, error } = await useAuth();

    if (error) {
        return <h1>Error par</h1>
    }

    return (
        <div className="flex flex-col gap-2 pt-5 pb-20 lg:pb-12 lg:gap-0 lg:mx-auto xl:m-4 xl:p-4 bg-slate-100 dark:bg-slate-950">
            <div className="p-4">
                <h2 className="text-xl font-semibold">Account Info</h2>
                <p>Email: {data.user?.email}</p>
            </div>
        </div>
    );
};

export default Account;
