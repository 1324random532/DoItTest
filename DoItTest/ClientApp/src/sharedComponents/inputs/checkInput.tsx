import { Checkbox, SxProps, Theme } from '@mui/material';

export interface CheckInputProps {
    checked: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
    defaultChecked?: boolean;
    sx?: SxProps<Theme>;
}

export function CheckInput(props: CheckInputProps) {
    return (
        <Checkbox
            checked={props.checked}
            onChange={event => props.onChange(event.target.checked)}
            disabled={props.disabled}
            defaultChecked={props.defaultChecked}
            inputProps={{ 'aria-label': 'controlled' }}
            sx={props.sx}
        />
    )
}
