import ModalProvider from "@/providers/ModalProvider";
import Navbar from "@/app/(dashboard)/_components/navbar";
import { ThemeProvider } from "@/providers/ThemeProvider";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <Navbar />
                <ModalProvider />
                <main className="max-w-screen-2xl mx-auto">{children}</main>
            </ThemeProvider>
        </div>
    );
}
