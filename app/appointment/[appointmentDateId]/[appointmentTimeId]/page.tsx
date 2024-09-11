import BackButton from "@/components/shared/back-button";
import PaymentForm from "./_components/payment-form";
import PaymentHeading from "./_components/payment-heading";
import PaymentMethod from "./_components/payment-method";

const PaymentInformation = ({
    params,
}: {
    params: { appointmentDateId: string; appointmentTimeId: string };
}) => {
    return (
        <div className="max-w-screen-xl min-h-screen mx-auto flex flex-col items-center justify-center gap-2 p-4">
            <BackButton />
            <PaymentHeading
                dateId={params.appointmentDateId}
                timeId={params.appointmentTimeId}
            />
            <div className="flex flex-col gap-2 lg:flex-row lg:gap-5">
                <PaymentMethod />
                <PaymentForm
                    appointmentDateId={params.appointmentDateId}
                    appointmentTimeId={params.appointmentTimeId}
                />
            </div>
        </div>
    );
};

export default PaymentInformation;
