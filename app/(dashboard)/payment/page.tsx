import { getPaymentDetails } from "./service";
import { PaymentDetails as PaymentDetailsProps } from "./_types";
import PaymentDetails from "./_components/payment-details";
import PaymentError from "./_components/payment-error";

const Payment = async () => {
    const { data, error } = await getPaymentDetails();

    if (error) {
        return <PaymentError />;
    }

    return (
        <div className="flex flex-col gap-2 pt-5 pb-20 lg:pb-12 lg:gap-4 lg:mx-auto xl:m-4 xl:p-4 bg-slate-100 dark:bg-slate-950">
            <h1 className="text-2xl font-bold">Payment Settings</h1>
            <PaymentDetails data={data as PaymentDetailsProps[]} />
        </div>
    );
};

export default Payment;
