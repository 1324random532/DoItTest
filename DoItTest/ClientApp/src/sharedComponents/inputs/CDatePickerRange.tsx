import { DateRange, LocalizationProvider, SingleInputDateRangeField } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { useEffect, useState } from 'react';
import { DateTimePeriod } from 'tools/dateTimePeriod';

export interface CDatePickerRangeProps {
    value: DateTimePeriod
    onChange: (period: DateTimePeriod) => void
}

export default function CDatePickerRange(props: CDatePickerRangeProps) {

    const [value, setValue] = useState<DateRange<Date>>([props.value.beginDateTime, props.value.endDateTime])

    useEffect(() => {
        const newDateTimePeriod = new DateTimePeriod(value[0], value[1])

        props.onChange(newDateTimePeriod)
    }, value)


    return (
        <DateRangePicker
            value={value}
            onChange={(newValue) => setValue(newValue)}
            localeText={{ start: "Начало", end: "Конец" }}
            slotProps={{ textField: { sx: { width: 250 } } }}
        />
    );
}