import Navbar from "@/app/(dashboard)/_components/navbar";
import ModalProvider from "@/providers/ModalProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Sidebar from "./_components/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <ModalProvider />
                <main className="flex">
                    <Sidebar />
                    <div className="w-full">
                        <Navbar />
                        <section className="max-w-screen-xl mx-auto">
                            {children}
                        </section>
                    </div>
                </main>
            </ThemeProvider>
        </div>
    );
}
