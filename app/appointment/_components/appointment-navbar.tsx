import Link from "next/link";

const AppointmentNavbar = () => {
    return (
        <nav className="p-4 flex items-center justify-between lg:px-20">
            <Link href="/appointment">
                <h1 className="text-xl font-semibold">Logo</h1>
            </Link>
        </nav>
    );
};

export default AppointmentNavbar;
