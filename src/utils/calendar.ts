export const Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const MonthsFullName = ["January", "Febrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const getTimeZone = (displayDate : Date) => {
    const offsetMinutes = displayDate.getTimezoneOffset();
    const sign = offsetMinutes > 0 ? '-' : '+';
    const hours = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(2, '0');
    const minutes = String(Math.abs(offsetMinutes) % 60).padStart(2, '0');
    return(`UTC${sign}${hours}:${minutes}`);
}

export const getCurrentMonthFirstDayIndex = (displayDate : Date) => {
    const currentMonthFirstDay = new Date(displayDate.getFullYear(), displayDate.getMonth(), 1);
    const firstDayIndex = currentMonthFirstDay.getDay();
    return(firstDayIndex);
}

export const getNextMonthFirstDayIndex = (displayDate : Date) => {
    const nextMonthFirstDay = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 1);
    const nextMonthFirstDayIndex = nextMonthFirstDay.getDay();
    return(nextMonthFirstDayIndex);
}

export const getCurrentMonthDates = (displayDate : Date) => {
    const currentMonthDates: number[] = [];
    const currentMonthLastDay = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0);
    const lastDayDate = currentMonthLastDay.getDate();
    for(let index = 1; index < lastDayDate + 1; index++) {
        currentMonthDates.push(index);
    };
    return(currentMonthDates);
}
 
export const getLastMonthDates = (displayDate : Date, firstDayIndex : number) => {

    const lastMonthDates: number[] = [];

    if(firstDayIndex === 0) return(lastMonthDates);
    
    // Get the last date of the previous month
    const lastMonthLastDay = new Date(displayDate.getFullYear(), displayDate.getMonth(), 0);

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
    let nextMonthFirstDay = 1;
    for(let index = nextMonthFirstDayIndex; index < 7; index++) {
        nextMonthDates.push(nextMonthFirstDay);
        nextMonthFirstDay++;
    };
    return(nextMonthDates);
}

export const getCurrentWeekFirstDate = (displayDate : Date) => {
    const currentWeekFirstDate = new Date(displayDate);
    currentWeekFirstDate.setDate(displayDate.getDate() - displayDate.getDay());
    return(currentWeekFirstDate);
}

export const getCurrentWeekDates = (currentWeekFirstDate : Date) => {
    
    const currentWeekDates: number[] = [];
    for (let i = 0; i < 7; i++) {
    const date = new Date(currentWeekFirstDate);
    date.setDate(currentWeekFirstDate.getDate() + i);
    currentWeekDates.push(date.getDate());
  }
    return(currentWeekDates);
}