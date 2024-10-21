import { createClient } from '@/utils/supabase/client';
import * as XLSX from 'xlsx';

// TODO: NOT FINAL
export const downloadAppointments = async () => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .order("date", { ascending: true })
        .csv();

    if (error) {
        return { success: false, error: error.message };
    }

    const csvData = data;
    const workbook = XLSX.read(csvData, { type: "string" });
    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "buffer",
    });

    return {
        success: true,
        data: excelBuffer,
        headers: {
            "Content-Type":
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": 'attachment; filename="appointments.xlsx"',
        },
    };
};
