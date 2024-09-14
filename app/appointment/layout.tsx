import AppointmentNavbar from "./_components/appointment-navbar";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-slate-50 text-slate-900">
            <main className="min-h-screen max-w-screen-2xl mx-auto">
                <AppointmentNavbar />
                {children}
            </main>
        </div>
    );
}
