export const Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const MonthsFullName = ["January", "Febrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const getCurrentMonthFirstDayIndex = (currentDate : Date) => {
    const currentMonthFirstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const firstDayIndex = currentMonthFirstDay.getDay();
    return(firstDayIndex);
}

export const getNextMonthFirstDayIndex = (currentDate : Date) => {
    const nextMonthFirstDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const nextMonthFirstDayIndex = nextMonthFirstDay.getDay();
    return(nextMonthFirstDayIndex);
}

export const getCurrentMonthDates = (currentDate : Date) => {
    const currentMonthDates: number[] = [];
    const currentMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const lastDayDate = currentMonthLastDay.getDate();
    for(let index = 1; index < lastDayDate + 1; index++) {
        currentMonthDates.push(index);
    };
    return(currentMonthDates);
}
 

export const getLastMonthDates = (currentDate : Date, firstDayIndex : number) => {

    const lastMonthDates: number[] = [];

    if(firstDayIndex === 0) return(lastMonthDates);
    
    // Get the last date of the previous month
    const lastMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

    const lastMonthLastDate = lastMonthLastDay.getDate();

    let firstIndexDate = lastMonthLastDate - firstDayIndex + 1;
    for(let index = 0; index < firstDayIndex; index++) {
        lastMonthDates.push(firstIndexDate);
        firstIndexDate++;
    };

    return(lastMonthDates);
}

export const getNextMonthDates = (nextMonthFirstDayIndex : number) => {
    const nextMonthDates: number[] = [];
    if(nextMonthFirstDayIndex === 0) return(nextMonthDates);

    for(let index = 1; index < 7 - nextMonthFirstDayIndex; index++) {
        nextMonthDates.push(index);
    };
    return(nextMonthDates);
}