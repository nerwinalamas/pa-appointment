export const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const dayName = date.toLocaleString("en-US", { weekday: "long" });

    const formattedDate = date.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return {
        dayName,
        formattedDate,
    };
};
