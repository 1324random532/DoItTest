import { OutlinedInputProps, SxProps, TextField, Theme } from '@mui/material';
import { useEffect, useState } from 'react';

export interface NumberInputProps {
    label: string;
    value: number | null;
    onChange: (value: number | null) => void;
    disabled?: boolean;
    InputProps?: Partial<OutlinedInputProps>;
    sx?: SxProps<Theme>;
    size?: 'small' | 'medium'
    onlyWhole?: boolean
    onlyPositive?: boolean
    maxValue?: number
}

export function NumberInput(props: NumberInputProps) {
    const [valueString, setValueString] = useState<string>(props.value?.toString() ?? "")

    useEffect(() => {
        if (valueString == null) return props.onChange(null)

        const value: number | null = valueString.length == 0 ? null : parseFloat(valueString)
        if (value == null) return props.onChange(value)

        if (maxValue && maxValue <= value) return

        if (!Number.isNaN(value)) return props.onChange(value)
    }, [valueString])

    const maxValue = props.maxValue ? props.maxValue + 1 : null

    function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (!props.onChange) return
        setValueString(e.currentTarget.value)
    }

    return (
        <TextField
            label={props.label}
            value={props.value ?? ""}
            variant="outlined"
            type="number"
            onChange={onChange}
            onKeyPress={e => {
                if (e.key === '+' || e.key == 'e' || e.key === '.') {
                    e.preventDefault();
                    return false;
                }

                if (e.key === '-') {
                    if (valueString.length != 0 || props.onlyPositive) {
                        e.preventDefault();
                        return false;
                    }
                    else {
                        setValueString("-")
                    }
                }

                if (props.onlyWhole && e.key === ',') {
                    e.preventDefault();
                    return false;
                }
            }}
            disabled={props.disabled}
            InputProps={props.InputProps}
            sx={props.sx}
            size={props.size}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: props.onlyPositive ? 0 : undefined, max: maxValue }}
        />
    )
}
