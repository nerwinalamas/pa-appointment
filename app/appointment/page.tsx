import { getAppointmentsWithSlotCount } from "./service";
import { AppointmentProps } from "./_types";
import AppointmentList from "./_components/appointment-list";

const Appointment = async () => {
    const { data, error } = await getAppointmentsWithSlotCount();

    if (error) {
        return <div>Error par</div>;
    }

    return <AppointmentList data={data as AppointmentProps[]} />;
};

export default Appointment;
