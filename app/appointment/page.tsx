import AppointmentList from "./_components/appointment-list";
import { AppointmentProps } from "./_types";
import { getAppointmentsWithSlotCount } from "./service";

const Appointment = async () => {
    const { data, error } = await getAppointmentsWithSlotCount();

    if (error) {
        return <div>Error par</div>;
    }

    return <AppointmentList data={data as AppointmentProps[]} />;
};

export default Appointment;
