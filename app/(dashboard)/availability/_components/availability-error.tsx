import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const AvailabilityError = ({
    name,
    className,
    card
}: {
    name: string;
    className?: string;
    card?: string
}) => {
    return (
        <Card className={card}>
            <CardContent
                className={`flex flex-col gap-1 items-center justify-center p-6 ${className}`}
            >
                <AlertCircle className="w-12 h-12 text-red-500" />
                <h2 className="text-base font-light">Error in {name}</h2>
            </CardContent>
        </Card>
    );
};

export default AvailabilityError;
