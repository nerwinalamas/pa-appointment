import { createClient } from "@/utils/supabase/server";
import TimeCard from "./_components/time-card";

//kailangan ang makukuha lang is yung galing sa appointment date id hindi lahat
// bali dapat ganito
// select * from slots where id = appointmentDateId

const SelectTime = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("slots").select("*");

    if (error) {
        return <div>Error: Hindi makuha ang data ng oras</div>;
    }

    return (
        <div className="max-w-screen-xl mx-auto p-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:w-[80%] xl:grid-cols-6">
            {data.map((time) => (
                <TimeCard
                    key={time.id}
                    startTime={time.start_time.slice(0, 5)}
                    endTime={time.end_time.slice(0, 5)}
                    {...time}
                />
            ))}
        </div>
    );
};

export default SelectTime;
