import React, {useState, useEffect} from 'react';
import dayjs from "dayjs";
import "./Calendar.css";

const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

function Calendar() {

    const CURRENT_MONTH = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1)).format("MMMM YYYY")
    const [selectedMonth, setMonth] = useState(CURRENT_MONTH);

    const [calendarDaysElement, setCalendarDaysElement] = useState("");

    function createCalendar(year = INITIAL_YEAR, month = INITIAL_MONTH) {
      // const calendarDaysElement = document.getElementById("calendar-days");
      // removeAllDayElements(calendarDaysElement);
    
      currentMonthDays = createDaysForCurrentMonth(
        year,
        month,
        dayjs(`${year}-${month}-01`).daysInMonth()
      );
    
      previousMonthDays = createDaysForPreviousMonth(year, month);
    
      nextMonthDays = createDaysForNextMonth(year, month);
    
      const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
    
      days.forEach((day) => {
        appendDay(day, calendarDaysElement);
      });
    }



    return (
        <div className="calendar-month">

          <section className="calendar-month-header">
            <div id="selected-month" className="calendar-month-header-selected-month">
                {selectedMonth}
            </div>

            <button onClick={() => console.log(dayjs(selectedMonth).subtract(1, "month").format("MMMM YYYY"))}>HAAAAAAAA</button>

            <section className="calendar-month-header-selectors">
              <span id="previous-month-selector" onClick={() => setMonth(dayjs(selectedMonth).subtract(1, "month").format("MMMM YYYY"))}>B</span>
              <span id="present-month-selector" onClick={() => setMonth(dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1)).format("MMMM YYYY"))}>Today</span>
              <span id="next-month-selector" onClick={() => setMonth(dayjs(selectedMonth).add(1, "month").format("MMMM YYYY"))}>F</span>
            </section>

          </section>
        
          <ol id="days-of-week" className="day-of-week"> {WEEKDAYS.map((weekday) => (
              <li>{weekday}</li>
          ))} </ol>
        
          <ol id="calendar-days" className="days-grid">
            {calendarDaysElement}
          </ol>
          
        </div>
)};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TODAY = dayjs().format("YYYY-MM-DD");

const INITIAL_YEAR = dayjs().format("YYYY");
const INITIAL_MONTH = dayjs().format("M");

// let selectedMonth = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));
let currentMonthDays;
let previousMonthDays;
let nextMonthDays;

// const daysOfWeekElement = document.getElementById("days-of-week");

// WEEKDAYS.forEach((weekday) => {
//   const weekDayElement = document.createElement("li");
//   daysOfWeekElement.appendChild(weekDayElement);
//   weekDayElement.innerText = weekday;
// });

// createCalendar();
// initMonthSelectors();

// function createCalendar(year = INITIAL_YEAR, month = INITIAL_MONTH) {
//   const calendarDaysElement = document.getElementById("calendar-days");

// //   document.getElementById("selected-month").innerText = dayjs(
// //     new Date(year, month - 1)
// //   ).format("MMMM YYYY");

// //   removeAllDayElements(calendarDaysElement);

//   currentMonthDays = createDaysForCurrentMonth(
//     year,
//     month,
//     dayjs(`${year}-${month}-01`).daysInMonth()
//   );

//   previousMonthDays = createDaysForPreviousMonth(year, month);

//   nextMonthDays = createDaysForNextMonth(year, month);

//   const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

//   days.forEach((day) => {
//     appendDay(day, calendarDaysElement);
//   });
// }

// function appendDay(day, calendarDaysElement) {
//   const dayElement = document.createElement("li");
//   const dayElementclassNameList = dayElement.classNameList;
//   dayElementclassNameList.add("calendar-day");
//   const dayOfMonthElement = document.createElement("span");
//   dayOfMonthElement.innerText = day.dayOfMonth;
//   dayElement.appendChild(dayOfMonthElement);
//   calendarDaysElement.appendChild(dayElement);

//   if (!day.isCurrentMonth) {
//     dayElementclassNameList.add("calendar-day--not-current");
//   }

//   if (day.date === TODAY) {
//     dayElementClassList.add("calendar-day--today");
//   }
// }

// function removeAllDayElements(calendarDaysElement) {
//   let first = calendarDaysElement.firstElementChild;

//   while (first) {
//     first.remove();
//     first = calendarDaysElement.firstElementChild;
//   }
// }

// function getNumberOfDaysInMonth(year, month) {
//   return dayjs(`${year}-${month}-01`).daysInMonth();
// }

// function createDaysForCurrentMonth(year, month) {
//   return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
//     return {
//       date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
//       dayOfMonth: index + 1,
//       isCurrentMonth: true
//     };
//   });
// }

// function createDaysForPreviousMonth(year, month) {
//   const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].date);

//   const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

//   // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
//   const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
//     ? firstDayOfTheMonthWeekday - 1
//     : 6;

//   const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays[0].date)
//     .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
//     .date();

//   return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
//     return {
//       date: dayjs(
//         `${previousMonth.year()}-${previousMonth.month() + 1}-${
//           previousMonthLastMondayDayOfMonth + index
//         }`
//       ).format("YYYY-MM-DD"),
//       dayOfMonth: previousMonthLastMondayDayOfMonth + index,
//       isCurrentMonth: false
//     };
//   });
// }

// function createDaysForNextMonth(year, month) {
//   const lastDayOfTheMonthWeekday = getWeekday(
//     `${year}-${month}-${currentMonthDays.length}`
//   );

//   const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");

//   const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
//     ? 7 - lastDayOfTheMonthWeekday
//     : lastDayOfTheMonthWeekday;

//   return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
//     return {
//       date: dayjs(
//         `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
//       ).format("YYYY-MM-DD"),
//       dayOfMonth: index + 1,
//       isCurrentMonth: false
//     };
//   });
// }

// function getWeekday(date) {
//   return dayjs(date).weekday();
// }

// function initMonthSelectors() {
//   document
//     .getElementById("previous-month-selector")
//     .addEventListener("click", function () {
//       selectedMonth = dayjs(selectedMonth).subtract(1, "month");
//       createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
//     });

//   document
//     .getElementById("present-month-selector")
//     .addEventListener("click", function () {
//       selectedMonth = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1));
//       createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
//     });

//   document
//     .getElementById("next-month-selector")
//     .addEventListener("click", function () {
//       selectedMonth = dayjs(selectedMonth).add(1, "month");
//       createCalendar(selectedMonth.format("YYYY"), selectedMonth.format("M"));
//     });
// }

export default Calendar;

