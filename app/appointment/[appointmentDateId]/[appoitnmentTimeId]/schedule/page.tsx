const Schedule = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="p-4 text-sm rounded-lg bg-slate-200 text-slate-800">
                <h1 className="text-xl font-semibold uppercase mb-2">Appointment Schedule</h1>
                <p>
                    Date: <span className="font-semibold">September 6, 2024</span>
                </p>
                <p>
                    Time: <span className="font-semibold">08:00 - 09:00</span>
                </p>
                <p>
                    Name: <span className="font-semibold">John doe</span>
                </p>
                <p>
                    Contact number: <span className="font-semibold">09123456789</span>
                </p>
                <p>
                    Deposit: <span className="font-semibold">P10.00</span>
                </p>
                <p>Payment Screenshot: </p>
            </div>
        </div>
    );
};

export default Schedule;
