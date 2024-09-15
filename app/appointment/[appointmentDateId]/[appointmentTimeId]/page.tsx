
import AppointmentBackButton from "../../_components/appointment-back-button";
import PaymentForm from "./_components/payment-form";
import PaymentHeading from "./_components/payment-heading";
import PaymentMethod from "./_components/payment-method";

const PaymentInformation = ({
    params,
}: {
    params: { appointmentDateId: string; appointmentTimeId: string };
}) => {
    return (
        <div className="mx-auto p-4 lg:w-[80%]">
            <AppointmentBackButton />
            <div className="h-full mt-5 flex flex-col items-center justify-center gap-2">
                <PaymentHeading
                    dateId={params.appointmentDateId}
                    timeId={params.appointmentTimeId}
                />
                <div className="w-full flex flex-col items-center gap-2 lg:flex-row lg:items-start lg:justify-center lg:gap-5">
                    <PaymentMethod />
                    <PaymentForm
                        appointmentDateId={params.appointmentDateId}
                        appointmentTimeId={params.appointmentTimeId}
                    />
                </div>
            </div>
        </div>
    );
};

export default PaymentInformation;
