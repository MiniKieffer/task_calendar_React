export const Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getFirstDayIndex = (currentDate : Date) => {
    const todayDate = currentDate.getDate();
    const todayDay = currentDate.getDay();
    const firstDayIndex = ((7 - ((todayDate - todayDay - 1) % 7) + 1) > 7) ? 1 : (7 - ((todayDate - todayDay - 1) % 7) + 1);
    return (firstDayIndex);
} 

export const getLastMonthDates = (currentDate : Date, firstDayIndex : number) => {

    const lastMonthDates: number[] = [];

    if(firstDayIndex === 1) return(lastMonthDates);
    
    // Set the date to the first day of the current month
    currentDate.setDate(1);
    
    // Subtract one day to get the last day of the previous month
    currentDate.setMonth(currentDate.getMonth() - 1);
    
    // Get the last date of the previous month
    const lastMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const lastMonthLastDate = lastMonthLastDay.getDate();
    let firstIndexDate = lastMonthLastDate - firstDayIndex + 2;
    for(let index = 1; index < firstDayIndex; index++) {
        lastMonthDates.push(firstIndexDate);
        firstIndexDate++;
    }

    return(lastMonthDates);
}