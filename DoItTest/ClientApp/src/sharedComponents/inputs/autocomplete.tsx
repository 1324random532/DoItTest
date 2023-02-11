import { Autocomplete as MaterialAutocomplete, SxProps, TextField, Theme } from '@mui/material';

export interface AutocompleteProps<T> {
    options: T[];
    label: string;
    value: T | null;
    sx?: SxProps<Theme>;
    onChange: (value: T | null) => void;
    getOptionLabel: (option: T) => string;
    isOptionEqualToValue?: (option: T, otherOption: T) => boolean
}

export function Autocomplete<T>(props: AutocompleteProps<T>) {
    return (
        <MaterialAutocomplete
            options={props.options}
            getOptionLabel={props.getOptionLabel}
            value={props.value}
            sx={props.sx}
            isOptionEqualToValue={props.isOptionEqualToValue}
            renderInput={(params) => <TextField {...params} label={props.label} />}
            onChange={(_, value) => props.onChange(value)}
        />
    )
}
