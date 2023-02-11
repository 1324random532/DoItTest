import { Theme } from '@emotion/react';
import { SxProps, TextField } from '@mui/material';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export interface DateInputProps {
    label: string;
    value: Date | null;
    mask?: string;
    onChange: (value: Date | null) => void;
    disabled?: boolean;
    sx?: SxProps<Theme>;
}

export function DateInput(props: DateInputProps) {
    function onChange(date: Date | null) {
        if (date instanceof Date && !isNaN(date.getTime())) {
            props.onChange(date)
        }
    }

    return (
        // <DesktopDatePicker
        //     label={props.label}
        //     mask={props.mask}
        //     value={props.value}
        //     onChange={onChange}
        //     disabled={props.disabled}
        //     renderInput={(params) => <TextField {...params} sx={props.sx} />}
        // />
        <></>
    )
}
