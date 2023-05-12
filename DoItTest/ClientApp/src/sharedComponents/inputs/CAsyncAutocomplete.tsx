import { Autocomplete as MaterialAutocomplete, AutocompleteRenderInputParams, AutocompleteRenderOptionState, FilterOptionsState, SxProps, TextField, Theme } from '@mui/material'
import { ChangeEvent, useState } from 'react'

import ClearIcon from "sharedComponents/Icons/ClearIcon"
import useDebounced from "hooks/useDebounced"

interface Props<TValue> {
    label: string
    placeholder: string
    onChange: (values: TValue | null) => void
    disabled?: boolean
    value: TValue | null
    options: TValue[]
    blurOnSelect?: boolean
    getOptionLabel: (value: TValue) => string
    isOptionEqualToValue?: (option: TValue, value: TValue) => boolean
    onChangeText: (text: string) => Promise<void>
    debouncedDelay?: number
    renderOption?: (props: React.HTMLAttributes<HTMLLIElement>, option: TValue, state: AutocompleteRenderOptionState) => React.ReactNode
    disablePortal?: boolean
    noOptionsText?: string
    filterOptions?: (options: TValue[], state: FilterOptionsState<TValue>) => TValue[];
    sx?: SxProps<Theme>

}

export const CAsyncAutocomplete = <TValue,>(props: Props<TValue>) => {
    const [loading, setLoading] = useState(false)
    const [inputValue, setInputValue] = useState("")

    function onChange(_: React.SyntheticEvent, value: TValue | null): void {
        props.onChange(value)
    }

    function isOptionEqualToValue(option: TValue, value: TValue): boolean {
        if (props.isOptionEqualToValue)
            return props.isOptionEqualToValue(option, value)

        return option === value
    }

    const onChangeText = useDebounced(async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value
        setLoading(true)
        setInputValue(value)
        await props.onChangeText(value)
        setLoading(false)
    }, props.debouncedDelay ?? 500)

    function renderInput(params: AutocompleteRenderInputParams) {
        return (
            <TextField
                {...params}
                variant="outlined"
                autoComplete="off"
                label={props.label}
                value={inputValue}
                onChange={onChangeText}
                size="medium"
                sx={{ width: 250 }}
            />
        )
    }

    return <MaterialAutocomplete
        loading={loading}
        placeholder={props.placeholder}
        getOptionLabel={props.getOptionLabel}
        multiple={false}
        freeSolo={false}
        disableClearable={false}
        onChange={onChange}
        disabled={props.disabled}
        options={props.options}
        blurOnSelect={props.blurOnSelect}
        forcePopupIcon={false}
        disablePortal={props.disablePortal}
        isOptionEqualToValue={isOptionEqualToValue}
        filterOptions={props.filterOptions}
        renderInput={renderInput}
        value={props.value}
        renderOption={props.renderOption}
        clearIcon={<ClearIcon />}
        size="small"
        noOptionsText={props.noOptionsText ?? 'Не найдено'}
        sx={props.sx}
        componentsProps={{ popper: { sx: { zIndex: 10000 } } }}
    />
}

export default CAsyncAutocomplete
