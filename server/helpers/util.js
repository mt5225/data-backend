// return an array of date objects for start (monday)
// and end (sunday) of week based on supplied 
// date object or current date

function getWeekDayPair(date) {
    // If no date object supplied, use current date
    // Copy date so don't modify supplied date
    let now = date ? new Date(date) : new Date();
    // set time to some convenient value
    now.setHours(0, 0, 0, 0);
    // Get the previous Monday
    var monday = new Date(now);
    monday.setDate(monday.getDate() - monday.getDay() + 1);

    // Get next Sunday
    var sunday = new Date(now);
    sunday.setDate(sunday.getDate() - sunday.getDay() + 7);

    return [monday, sunday];
}

function getDateRange(days) {
    let start_day = new Date()
    let end_day = new Date()
    if (days < 0) {
        start_day.setDate(start_day.getDate() + days)
        end_day.setDate(end_day.getDate() - 1)

    } else {
        end_day.setDate(end_day.getDate() + days)
    }
    return [start_day, end_day]
}


export default { getWeekDayPair, getDateRange };