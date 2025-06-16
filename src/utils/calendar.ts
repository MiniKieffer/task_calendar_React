import { PopupPosition } from "@/types/calendar";
import { Holiday } from "@/types/calendar";

export const Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const MonthsFullName = ["January", "Febrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const countries = [
                            {
                              "countryCode": "AD",
                              "name": "Andorra"
                            },
                            {
                              "countryCode": "AL",
                              "name": "Albania"
                            },
                            {
                              "countryCode": "AM",
                              "name": "Armenia"
                            },
                            {
                              "countryCode": "AR",
                              "name": "Argentina"
                            },
                            {
                              "countryCode": "AT",
                              "name": "Austria"
                            },
                            {
                              "countryCode": "AU",
                              "name": "Australia"
                            },
                            {
                              "countryCode": "AX",
                              "name": "Åland Islands"
                            },
                            {
                              "countryCode": "BA",
                              "name": "Bosnia and Herzegovina"
                            },
                            {
                              "countryCode": "BB",
                              "name": "Barbados"
                            },
                            {
                              "countryCode": "BE",
                              "name": "Belgium"
                            },
                            {
                              "countryCode": "BG",
                              "name": "Bulgaria"
                            },
                            {
                              "countryCode": "BJ",
                              "name": "Benin"
                            },
                            {
                              "countryCode": "BO",
                              "name": "Bolivia"
                            },
                            {
                              "countryCode": "BR",
                              "name": "Brazil"
                            },
                            {
                              "countryCode": "BS",
                              "name": "Bahamas"
                            },
                            {
                              "countryCode": "BW",
                              "name": "Botswana"
                            },
                            {
                              "countryCode": "BY",
                              "name": "Belarus"
                            },
                            {
                              "countryCode": "BZ",
                              "name": "Belize"
                            },
                            {
                              "countryCode": "CA",
                              "name": "Canada"
                            },
                            {
                              "countryCode": "CD",
                              "name": "DR Congo"
                            },
                            {
                              "countryCode": "CG",
                              "name": "Congo"
                            },
                            {
                              "countryCode": "CH",
                              "name": "Switzerland"
                            },
                            {
                              "countryCode": "CL",
                              "name": "Chile"
                            },
                            {
                              "countryCode": "CN",
                              "name": "China"
                            },
                            {
                              "countryCode": "CO",
                              "name": "Colombia"
                            },
                            {
                              "countryCode": "CR",
                              "name": "Costa Rica"
                            },
                            {
                              "countryCode": "CU",
                              "name": "Cuba"
                            },
                            {
                              "countryCode": "CY",
                              "name": "Cyprus"
                            },
                            {
                              "countryCode": "CZ",
                              "name": "Czechia"
                            },
                            {
                              "countryCode": "DE",
                              "name": "Germany"
                            },
                            {
                              "countryCode": "DK",
                              "name": "Denmark"
                            },
                            {
                              "countryCode": "DO",
                              "name": "Dominican Republic"
                            },
                            {
                              "countryCode": "EC",
                              "name": "Ecuador"
                            },
                            {
                              "countryCode": "EE",
                              "name": "Estonia"
                            },
                            {
                              "countryCode": "EG",
                              "name": "Egypt"
                            },
                            {
                              "countryCode": "ES",
                              "name": "Spain"
                            },
                            {
                              "countryCode": "FI",
                              "name": "Finland"
                            },
                            {
                              "countryCode": "FO",
                              "name": "Faroe Islands"
                            },
                            {
                              "countryCode": "FR",
                              "name": "France"
                            },
                            {
                              "countryCode": "GA",
                              "name": "Gabon"
                            },
                            {
                              "countryCode": "GB",
                              "name": "United Kingdom"
                            },
                            {
                              "countryCode": "GD",
                              "name": "Grenada"
                            },
                            {
                              "countryCode": "GE",
                              "name": "Georgia"
                            },
                            {
                              "countryCode": "GG",
                              "name": "Guernsey"
                            },
                            {
                              "countryCode": "GI",
                              "name": "Gibraltar"
                            },
                            {
                              "countryCode": "GL",
                              "name": "Greenland"
                            },
                            {
                              "countryCode": "GM",
                              "name": "Gambia"
                            },
                            {
                              "countryCode": "GR",
                              "name": "Greece"
                            },
                            {
                              "countryCode": "GT",
                              "name": "Guatemala"
                            },
                            {
                              "countryCode": "GY",
                              "name": "Guyana"
                            },
                            {
                              "countryCode": "HK",
                              "name": "Hong Kong"
                            },
                            {
                              "countryCode": "HN",
                              "name": "Honduras"
                            },
                            {
                              "countryCode": "HR",
                              "name": "Croatia"
                            },
                            {
                              "countryCode": "HT",
                              "name": "Haiti"
                            },
                            {
                              "countryCode": "HU",
                              "name": "Hungary"
                            },
                            {
                              "countryCode": "ID",
                              "name": "Indonesia"
                            },
                            {
                              "countryCode": "IE",
                              "name": "Ireland"
                            },
                            {
                              "countryCode": "IM",
                              "name": "Isle of Man"
                            },
                            {
                              "countryCode": "IS",
                              "name": "Iceland"
                            },
                            {
                              "countryCode": "IT",
                              "name": "Italy"
                            },
                            {
                              "countryCode": "JE",
                              "name": "Jersey"
                            },
                            {
                              "countryCode": "JM",
                              "name": "Jamaica"
                            },
                            {
                              "countryCode": "JP",
                              "name": "Japan"
                            },
                            {
                              "countryCode": "KR",
                              "name": "South Korea"
                            },
                            {
                              "countryCode": "KZ",
                              "name": "Kazakhstan"
                            },
                            {
                              "countryCode": "LI",
                              "name": "Liechtenstein"
                            },
                            {
                              "countryCode": "LS",
                              "name": "Lesotho"
                            },
                            {
                              "countryCode": "LT",
                              "name": "Lithuania"
                            },
                            {
                              "countryCode": "LU",
                              "name": "Luxembourg"
                            },
                            {
                              "countryCode": "LV",
                              "name": "Latvia"
                            },
                            {
                              "countryCode": "MA",
                              "name": "Morocco"
                            },
                            {
                              "countryCode": "MC",
                              "name": "Monaco"
                            },
                            {
                              "countryCode": "MD",
                              "name": "Moldova"
                            },
                            {
                              "countryCode": "ME",
                              "name": "Montenegro"
                            },
                            {
                              "countryCode": "MG",
                              "name": "Madagascar"
                            },
                            {
                              "countryCode": "MK",
                              "name": "North Macedonia"
                            },
                            {
                              "countryCode": "MN",
                              "name": "Mongolia"
                            },
                            {
                              "countryCode": "MS",
                              "name": "Montserrat"
                            },
                            {
                              "countryCode": "MT",
                              "name": "Malta"
                            },
                            {
                              "countryCode": "MX",
                              "name": "Mexico"
                            },
                            {
                              "countryCode": "MZ",
                              "name": "Mozambique"
                            },
                            {
                              "countryCode": "NA",
                              "name": "Namibia"
                            },
                            {
                              "countryCode": "NE",
                              "name": "Niger"
                            },
                            {
                              "countryCode": "NG",
                              "name": "Nigeria"
                            },
                            {
                              "countryCode": "NI",
                              "name": "Nicaragua"
                            },
                            {
                              "countryCode": "NL",
                              "name": "Netherlands"
                            },
                            {
                              "countryCode": "NO",
                              "name": "Norway"
                            },
                            {
                              "countryCode": "NZ",
                              "name": "New Zealand"
                            },
                            {
                              "countryCode": "PA",
                              "name": "Panama"
                            },
                            {
                              "countryCode": "PE",
                              "name": "Peru"
                            },
                            {
                              "countryCode": "PG",
                              "name": "Papua New Guinea"
                            },
                            {
                              "countryCode": "PH",
                              "name": "Philippines"
                            },
                            {
                              "countryCode": "PL",
                              "name": "Poland"
                            },
                            {
                              "countryCode": "PR",
                              "name": "Puerto Rico"
                            },
                            {
                              "countryCode": "PT",
                              "name": "Portugal"
                            },
                            {
                              "countryCode": "PY",
                              "name": "Paraguay"
                            },
                            {
                              "countryCode": "RO",
                              "name": "Romania"
                            },
                            {
                              "countryCode": "RS",
                              "name": "Serbia"
                            },
                            {
                              "countryCode": "RU",
                              "name": "Russia"
                            },
                            {
                              "countryCode": "SE",
                              "name": "Sweden"
                            },
                            {
                              "countryCode": "SG",
                              "name": "Singapore"
                            },
                            {
                              "countryCode": "SI",
                              "name": "Slovenia"
                            },
                            {
                              "countryCode": "SJ",
                              "name": "Svalbard and Jan Mayen"
                            },
                            {
                              "countryCode": "SK",
                              "name": "Slovakia"
                            },
                            {
                              "countryCode": "SM",
                              "name": "San Marino"
                            },
                            {
                              "countryCode": "SR",
                              "name": "Suriname"
                            },
                            {
                              "countryCode": "SV",
                              "name": "El Salvador"
                            },
                            {
                              "countryCode": "TN",
                              "name": "Tunisia"
                            },
                            {
                              "countryCode": "TR",
                              "name": "Türkiye"
                            },
                            {
                              "countryCode": "UA",
                              "name": "Ukraine"
                            },
                            {
                              "countryCode": "US",
                              "name": "United States"
                            },
                            {
                              "countryCode": "UY",
                              "name": "Uruguay"
                            },
                            {
                              "countryCode": "VA",
                              "name": "Vatican City"
                            },
                            {
                              "countryCode": "VE",
                              "name": "Venezuela"
                            },
                            {
                              "countryCode": "VN",
                              "name": "Vietnam"
                            },
                            {
                              "countryCode": "ZA",
                              "name": "South Africa"
                            },
                            {
                              "countryCode": "ZW",
                              "name": "Zimbabwe"
                            }
                          ]

export const getCountryCodeByName = (name: string) => {
  const country = countries.find(c => c.name.toLowerCase() === name.toLowerCase());
  return country?.countryCode;
};

export const findHolidayByDate = (holidays: Holiday[], date: string) => {
  return holidays.find(holiday => holiday.date === date);
};
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

export const getCurrentWeekDays = (currentWeekFirstDate : Date) => {
    
    const currentWeekDays: Date[] = [];
    for (let i = 0; i < 7; i++) {
    const date = new Date(currentWeekFirstDate);
    date.setDate(currentWeekFirstDate.getDate() + i);
    currentWeekDays.push(date);
  }
    return(currentWeekDays);
}

export const cursorPointDetection = (e: React.MouseEvent) => {
    let { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    let transformOrigin: PopupPosition["transformOrigin"] = "top left";

    if (clientX > innerWidth / 2 && clientY < innerHeight / 2) {
      transformOrigin = "top right";
      clientX = innerWidth - clientX;
    } else if (clientX <= innerWidth / 2 && clientY >= innerHeight / 2) {
      transformOrigin = "bottom left";
      clientY = innerHeight - clientY;
    } else if (clientX > innerWidth / 2 && clientY >= innerHeight / 2) {
      transformOrigin = "bottom right";
      clientX = innerWidth - clientX;
      clientY = innerHeight - clientY;
    }
    return {x: clientX, y: clientY, transformOrigin}
};

export const calendarGridGenerateTool = (displayDate: Date, lastMonthDates: number[], currentMonthDates: number[], date: number, index: number, allDates: number[]) => {
    const isLast = index < lastMonthDates.length;
    const isNext = index >= lastMonthDates.length + currentMonthDates.length;
    const currentIdx = isLast
      ? index
      : isNext
      ? index - (lastMonthDates.length + currentMonthDates.length)
      : index - lastMonthDates.length;
    const year = isLast
      ? displayDate.getMonth() === 0
        ? displayDate.getFullYear() - 1
        : displayDate.getFullYear()
      : isNext
      ? displayDate.getMonth() === 11
        ? displayDate.getFullYear() + 1
        : displayDate.getFullYear()
      : displayDate.getFullYear();
    const month = isLast
      ? displayDate.getMonth() === 0
        ? 11
        : displayDate.getMonth() - 1
      : isNext
      ? displayDate.getMonth() === 11
        ? 0
        : displayDate.getMonth() + 1
      : displayDate.getMonth();
    const fullDate = new Date(year, month, date);
    const formatDate = (date: Date) => date.toLocaleDateString("en-CA");
    const dateString = formatDate(fullDate);
    const labelPrefix =
      date === 1 || index === allDates.length - 1
        ? `${Months[month]} `
        : "";
    const variant: "otherMonthCell" | "todayCell" | "thisMonthCell" = isLast || isNext
      ? "otherMonthCell"
      : fullDate.toDateString() === new Date().toDateString()
      ? "todayCell"
      : "thisMonthCell";
    return {
      dateString,
      variant,
      label: `${labelPrefix}${date} `,
      currentIdx,
    };
}

export const pad = (n: number) => n.toString().padStart(2, '0');
