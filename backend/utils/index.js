export const formatDate = () => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = monthNames[date.getMonth()]; // Get the month name using the month index
  const year = date.getFullYear(); // Get the year

  return `${day} ${monthName} ${year}`; // Format the date as "dd MonthName yyyy"
};
