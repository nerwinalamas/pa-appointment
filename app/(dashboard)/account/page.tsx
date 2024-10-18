import useAuth from "@/hooks/useAuth";
import { getUser } from "./service";
import { User } from "./_types";
import AccountSettingsAccountInformation from "./_components/account-settings-account-information";
import AccountSettingsChangePassword from "./_components/account-settings-change-password";
import AccountSettingsChangeEmail from "./_components/account-settings-change-email";
import AccountSettingsDeleteAccount from "./_components/account-settings-delete-account";

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
        <div className="flex flex-col gap-2 pt-5 pb-20 lg:pb-12 lg:gap-4 lg:mx-auto xl:m-4 xl:p-4 bg-slate-100 dark:bg-slate-950">
            <h1 className="text-2xl font-bold">Account Settings</h1>
            <AccountSettingsAccountInformation user={userData as User} />
            <AccountSettingsChangePassword user={userData as User} />
            <AccountSettingsChangeEmail user={userData as User} />
            <AccountSettingsDeleteAccount user={userData as User} />
        </div>
    );
};

export default Account;
