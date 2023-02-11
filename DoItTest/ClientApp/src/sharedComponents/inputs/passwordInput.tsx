import { SxProps, TextField, Theme } from '@mui/material';

export interface PasswordInputProps {
    label: string;
    value: string | null;
    onChange: (value: string) => void;
    sx?: SxProps<Theme>
}

export function PasswordInput(props: PasswordInputProps) {
    return (
        <TextField
            label={props.label}
            value={props.value ?? ""}
            variant="outlined"
            type="password"
            onChange={event => props.onChange(event.target.value)}
            sx={props.sx}
        />
    )
}
