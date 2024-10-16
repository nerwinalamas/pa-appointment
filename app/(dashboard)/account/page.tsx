import useAuth from "@/hooks/useAuth";
import { getUser } from "./service";
import { User } from "./_types";
import AccountSettingsForm from "./_components/account-settings-form";

const Account = async () => {
    const { data: authData, error: authError } = await useAuth();

    if (authError) {
        return <h1>Error fetching session: {authError.message}</h1>;
    }

    if (!authData) {
        return <h1>No user is logged in</h1>;
    }

    const userId = authData.user?.id as string;
    const { data: userData, error: userError } = await getUser(userId);

    if (userError) {
        return <h1>Error par</h1>;
    }

    return (
        <div className="flex flex-col gap-2 pt-5 pb-20 lg:pb-12 lg:gap-0 lg:mx-auto xl:m-4 xl:p-4 bg-slate-100 dark:bg-slate-950">
            <AccountSettingsForm user={userData as User} />
        </div>
    );
};

export default Account;
