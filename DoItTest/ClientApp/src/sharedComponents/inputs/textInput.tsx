import { OutlinedInputProps, SxProps, TextField, Theme } from '@mui/material';

export interface TextInputProps {
    label: string;
    value: string | null;
    onChange: (value: string) => void;
    multiline?: boolean;
    InputProps?: Partial<OutlinedInputProps>
    sx?: SxProps<Theme>
}

export function TextInput(props: TextInputProps) {
    return (
        <TextField
            label={props.label}
            value={props.value ?? ""}
            variant="outlined"
            autoComplete='new-password'
            type="text"
            multiline={props.multiline}
            onChange={event => props.onChange(event.target.value)}
            InputProps={props.InputProps}
            sx={props.sx}
        />
    )
}
