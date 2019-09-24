const readableDateFromISO = (ISO) => {
   var readableDate = new Date(ISO);

   // Date variables
   var D = readableDate.getDay();
   var m = readableDate.getMonth();
   var d = readableDate.getDate();
   var y = readableDate.getFullYear();

   var days = [
       "Sunday",
       "Monday",
       "Tuesday",
       "Wednesday",
       "Thursday",
       "Friday",
       "Saturday",
   ]

   var months = [
       "Jan",
       "Feb",
       "Mar",
       "Apr",
       "May",
       "Jun",
       "Jul",
       "Aug",
       "Sep",
       "Oct",
       "Nov",
       "Dec",
    ];

    // Time Variables
    let hh = readableDate.getHours();
    var mm = readableDate.getMinutes();
    
    // Gets the meridian value based on the military time value in hh
    var meridian = hh >= 12 ? "pm" : "am";
    // reassigns hour value based on regular (non-military) hour format
    hh = ((hh + 11) % 12 + 1);
    
    var day = days[D];
    var monthName = months[m];
    var date = `${monthName} ${d}, ${y}`;
    var time = `${hh}:${mm}${meridian}`;

    return { day, date, time };
};

export default readableDateFromISO;