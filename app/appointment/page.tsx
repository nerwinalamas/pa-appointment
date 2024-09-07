import { createClient } from "@/utils/supabase/server";
import AppointmentList from "./_components/appointment-list";
import { AppointmentProps } from "./_types";

const Appointment = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("appointments").select("*");

    if (error) {
        return <div>Error par</div>;
    }

    return <AppointmentList data={data as AppointmentProps[]} />;
};

export default Appointment;
