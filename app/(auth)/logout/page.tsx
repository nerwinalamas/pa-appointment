import { logout } from "./actions";

const Logout = () => {
    return (
        <form action={logout}>
            <button className="p-2 font-semibold bg-slate-900 text-slate-100">
                Logout
            </button>
        </form>
    );
};

export default Logout;
