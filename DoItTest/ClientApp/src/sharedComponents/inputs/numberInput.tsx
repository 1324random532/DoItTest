import { OutlinedInputProps, SxProps, TextField, Theme } from '@mui/material';

export interface NumberInputProps {
    label: string;
    value: number | null;
    onChange: (value: number) => void;
    disabled?: boolean;
    InputProps?: Partial<OutlinedInputProps>;
    sx?: SxProps<Theme>;
}

export function NumberInput(props: NumberInputProps) {
    return (
        <TextField
            label={props.label}
            value={props.value ?? ""}
            variant="outlined"
            type="number"
            onChange={event => props.onChange(parseFloat(event.target.value))}
            disabled={props.disabled}
            InputProps={props.InputProps}
            sx={props.sx}
        />
    )
}
