import React, {useState} from 'react';
import dayjs from "dayjs";
import "./Calendar.css";

import Card from '@mui/material/Card';
import { Button, CardActionArea } from '@mui/material';

import Booking, { OpenBooking } from './Booking/Booking';



const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");

dayjs.extend(weekday);
dayjs.extend(weekOfYear);


function Calendar() {

  let currentMonthDays;
  let previousMonthDays;
  let nextMonthDays;

  const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const TODAY = dayjs().format("YYYY-MM-DD");
  const INITIAL_YEAR = dayjs().format("YYYY");
  const INITIAL_MONTH = dayjs().format("M");
  const CURRENT_MONTH = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1)).format("MMMM YYYY")

  const [selectedMonth, setMonth] = useState(CURRENT_MONTH);

  const [value, setValue] = useState([null, null]);

  // const [calendarDaysElement, setCalendarDaysElement] = useState("");

  function createCalendar(year = INITIAL_YEAR, month = INITIAL_MONTH) {
    // const calendarDaysElement = document.getElementById("calendar-days");
    // removeAllDayElements();
  
    currentMonthDays = createDaysForCurrentMonth(
      year,
      month,
      dayjs(`${year}-${month}-01`).daysInMonth()
    );
  
    previousMonthDays = createDaysForPreviousMonth(year, month);
  
    nextMonthDays = createDaysForNextMonth(year, month);
  
    const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
      
    console.log("Created Calendar")

    return(
      days.map((day) => (
          <li id={day.date} className={`calendar-day ${!day.isCurrentMonth ? "calendar-day--not-current" : ""} ${(day.date === TODAY) ? "calendar-day--today" : ""} ${isValidDay(day.date, dayjs(value[0]).format("YYYY-MM-DD"), dayjs(value[1]).format("YYYY-MM-DD")) ? "test2": ""} `}>
            <span>{day.dayOfMonth}</span>
            {/* <Booking day={day.date} /> */}
            {isValidDay(day.date) &&
              // <Button id={day.date} onClick={(e) => console.log(typeof e.target.id)}>
              //   BOKA
              // </Button>
              <>
              <OpenBooking date={day.date} />
              </>
            }
            {/* <button id={day.date} onClick={(e) => console.log(day)} /> */}
            {/* <button id={day.toString()} onClick={(e) => console.log(day)} /> */}
            
          </li>
      ))
    )
  };
  
  function getNumberOfDaysInMonth(year, month) {
    return dayjs(`${year}-${month}-01`).daysInMonth();
  }
  
  function createDaysForCurrentMonth(year, month) {
    return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
      return {
        date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: true
      };
    });
  }

  function getWeekday(date) {
    return dayjs(date).weekday();
  }

  function createDaysForPreviousMonth(year, month) {
    const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].date);
  
    const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");
  
    // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
      ? firstDayOfTheMonthWeekday - 1
      : 6;
  
    const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays[0].date)
      .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
      .date();
  
    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
      return {
        date: dayjs(
          `${previousMonth.year()}-${previousMonth.month() + 1}-${
            previousMonthLastMondayDayOfMonth + index
          }`
        ).format("YYYY-MM-DD"),
        dayOfMonth: previousMonthLastMondayDayOfMonth + index,
        isCurrentMonth: false
      };
    });
  }

  function createDaysForNextMonth(year, month) {
    const lastDayOfTheMonthWeekday = getWeekday(
      `${year}-${month}-${currentMonthDays.length}`
    );
  
    const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");
  
    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
      ? 7 - lastDayOfTheMonthWeekday
      : lastDayOfTheMonthWeekday;
  
    return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
      return {
        date: dayjs(
          `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
        ).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: false
      };
    });
  }

  const [bz, setBz] = useState("pres");

  function setPrevMonth() {
    setMonth(dayjs(selectedMonth).subtract(1, "month").format("MMMM YYYY"));
    setBz("prev")
    // createCalendar(dayjs(selectedMonth).format("YYYY"), dayjs(selectedMonth).format("M"));
  }

  function setPresMonth() {
    setMonth(dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1)).format("MMMM YYYY"));
    setBz("pres")
    // createCalendar(dayjs(selectedMonth).format("YYYY"), dayjs(selectedMonth).format("M"));
  }

  function setNextMonth() {
    setMonth(dayjs(selectedMonth).add(1, "month").format("MMMM YYYY"));
    setBz("next")
    // createCalendar(dayjs(selectedMonth).format("YYYY"), dayjs(selectedMonth).format("M"));
  }

  function aa() {
    if (bz === "prev") {
      return createCalendar(dayjs(selectedMonth).format("YYYY"), dayjs(selectedMonth).format("M"));
    } 
    else if (bz === "pres") {
      return createCalendar(dayjs(selectedMonth).format("YYYY"), dayjs(selectedMonth).format("M"));
    } 
    else if (bz === "next") {
      return createCalendar(dayjs(selectedMonth).format("YYYY"), dayjs(selectedMonth).format("M"));
    }
  }
  
    return (
        <div className="calendar-month">

          <section className="calendar-month-header">
            <div id="selected-month" className="calendar-month-header-selected-month">
                {selectedMonth}
            </div>

            <button onClick={(e) => console.log(value)}>DEBUG123123</button>
            <Booking value={value} setValue={setValue} />


            <section className="calendar-month-header-selectors">
              <span id="previous-month-selector" onClick={() => setPrevMonth()}>B</span>
              <span id="present-month-selector" onClick={() => setPresMonth()}>Today</span>
              <span id="next-month-selector" onClick={() => setNextMonth()}>F</span>
            </section>

          </section>
        
          <ol id="days-of-week" className="day-of-week">
            {WEEKDAYS.map((weekday) => (
              <li>{weekday}</li>
            ))} 
          </ol>
        
          <ol id="calendar-days" className="days-grid">
            {aa()}
          </ol>
          
        </div>
)};

export function isValidDay(currDate, dateFrom, dateTo) {

  let arrValidDays = [];

  // for (const numDays in validDays) {

    const date1 = dayjs(dateFrom)
    const date2 = dayjs(dateTo)
    const dateDiff = date2.diff(date1, "day")
    
    for (let i=0; i < dateDiff + 1; i++) {
      arrValidDays.push(dayjs(dateFrom).add(i, "day"))
    }
  // }

  const getValidDays = arrValidDays.some(day => day.format("YYYY-MM-DD") === currDate)
  console.log(getValidDays)
  console.log(dayjs(arrValidDays).format("YYYY-MM-DD"))

  return getValidDays
}




const validDays = {
  1: {
    dateFrom: "2021-11-13",
    dateTo: "2021-11-16",
    numOfSpots: 10,

  }
}



// export isValidDay();

export default Calendar;