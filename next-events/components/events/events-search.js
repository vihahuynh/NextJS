import { useRef } from "react";
import Button from "../ui/button";
import classes from "./events-search.module.css";

const EventsSearch = (props) => {
  const yearInputRef = useRef();
  const monthInputRef = useRef();
  const submitHanlder = (e) => {
    e.preventDefault();
    const selectedYear = yearInputRef.current.value;
    const selectedMonth = monthInputRef.current.value;

    props.onSearch(selectedYear, selectedMonth);
  };
  return (
    <form className={classes.form} onSubmit={submitHanlder}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearInputRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthInputRef}>
            {Array(12)
              .fill()
              .map((_, i) => i + 1)
              .map((m) => (
                <option key={m} value={m}>
                  {m.toString().padStart(2, "0")}
                </option>
              ))}
          </select>
        </div>
      </div>

      <Button>Find events</Button>
    </form>
  );
};

export default EventsSearch;
