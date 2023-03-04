import { Autocomplete, AutocompleteProps } from "./autocomplete"
import { CheckInput, CheckInputProps } from './checkInput'
import { DateInput, DateInputProps } from './dateInput'
import { NumberInput, NumberInputProps } from "./numberInput"
import { PasswordInput, PasswordInputProps } from './passwordInput'
import { Switch, SwitchProps } from "./switch"
import { TextInput, TextInputProps } from "./textInput"

type TextInputPropsType = { type: "text" } & TextInputProps
type NumberInputPropsType = { type: "number" } & NumberInputProps
type SelectInputPropsType<T> = { type: "select" } & AutocompleteProps<T>
type PasswordInputPropsType = { type: "password" } & PasswordInputProps
type DateInputPropsType = { type: "date" } & DateInputProps
type CheckInputPropsType = { type: "check" } & CheckInputProps
type SwitchPropsType = { type: "switch" } & SwitchProps

export type IProps<T> =
    (
        TextInputPropsType |
        NumberInputPropsType |
        SelectInputPropsType<T> |
        PasswordInputPropsType |
        DateInputPropsType |
        CheckInputPropsType |
        SwitchPropsType
    )


export function Input<T>(props: IProps<T>) {
    switch (props.type) {
        case "number": return <NumberInput {...props} />
        case "text": return <TextInput {...props} />
        case "select": return <Autocomplete {...props} />
        case "password": return <PasswordInput {...props} />
        case "date": return <DateInput {...props} />
        case "check": return <CheckInput {...props} />
        case "switch": return <Switch {...props} />
    }
}
