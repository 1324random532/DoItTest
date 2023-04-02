import { OutlinedInputProps, SxProps, TextField, Theme } from "@mui/material";
import { ChangeEvent } from "react";
import Time from "tools/time";

export interface TimeInputProps {
    label: string;
    value: Time | null;
    onChange: (value: Time | null) => void;
    InputProps?: Partial<OutlinedInputProps>
    sx?: SxProps<Theme>
}

export default function TimePicker(props: TimeInputProps) {
    const _mask = '00:00'

    function formatValue(value: Time | null): string {
        if (value == null) return _mask;

        const hoursString = value.getHours() > 9 ? value.getHours().toString() : '0' + value.getHours().toString();
        const minutesString = value.getMinutes() > 9 ? value.getMinutes().toString() : '0' + value.getMinutes().toString();

        return hoursString + ':' + minutesString;
    }

    function getValueFromString(valueString: string): Time | null {
        const hours = getHours(valueString);
        const minutes = getMinutes(valueString);

        if (hours == null || minutes == null) return null;
        return new Time((hours * 3600) + (minutes * 60));
    }

    function getHours(valueString: string): number | null {
        if (!valueString) return null;

        const hoursString: string = valueString.slice(0, 2);
        const hours = hoursString.indexOf('_') === -1 ? parseInt(hoursString) : null;

        if (hours != null && (hours >= 0 || hours <= 23)) return hours;

        return null;
    }

    function getMinutes(valueString: string): number | null {
        if (!valueString) return null;

        const minutesString = valueString.slice(3, 5);
        const minutes = minutesString.indexOf('_') === -1 ? parseInt(minutesString) : null;

        if (minutes != null && (minutes >= 0 || minutes <= 59)) return minutes;

        return null;
    }

    return (
        <form noValidate>
            <TextField
                id="time"
                label={props.label}
                type="time"
                value={formatValue(props.value)}
                onChange={(e) => {
                    const value = e.currentTarget.value
                    const time = getValueFromString(value)
                    props.onChange(time);
                }}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
                sx={props.sx}
            />
        </form>
    );
}