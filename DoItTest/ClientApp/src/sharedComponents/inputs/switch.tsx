import { FormControlLabel, Switch as MaterialSwitch, SxProps, Theme } from "@mui/material";


export interface SwitchProps {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
    defaultChecked?: boolean;
    sx?: SxProps<Theme>;
}

export function Switch(props: SwitchProps) {
    return (
        <FormControlLabel
            control={<MaterialSwitch
                checked={props.checked}
                onChange={event => props.onChange(event.target.checked)}
            />}
            label={props.label}
        />
    )
}