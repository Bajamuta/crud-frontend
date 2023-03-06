import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {}

export default function CustomDatePicker(props: Props) {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    return (
        <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
        />
    );
}
