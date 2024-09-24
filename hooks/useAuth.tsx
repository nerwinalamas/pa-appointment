import { createClient } from "@/utils/supabase/server";

const useAuth = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    return { data, error };
};

export default useAuth;
