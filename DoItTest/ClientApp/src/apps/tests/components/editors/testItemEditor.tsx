import { TestItemType } from "domain/tests/items/testItemType";
import { TestItemBlank } from "domain/tests/testItemBlank"
import { SetState } from "tools/setState";
import { RadioButtonsItemEditor } from "./radioButtonsItemEditor";
import { NumberFieldTestItemEditor } from "./numberFieldTestItemEditor";
import { TextFieldTestItemEditor } from "./textFieldTestItemEditor";
import { CheckBoxesItemEditor } from "./checkBoxesItemEditor";

export interface TestItemEditorProps {
    item: TestItemBlank
    changeItem: SetState<TestItemBlank>
}


export function TestItemEditor({ item, changeItem }: TestItemEditorProps): JSX.Element | null {
    switch (item.type) {
        case TestItemType.TextField:
            return <TextFieldTestItemEditor item={item} changeItem={changeItem} />;
        case TestItemType.NumericField:
            return <NumberFieldTestItemEditor item={item} changeItem={changeItem} />
        case TestItemType.RadioButtonsGroup:
            return <RadioButtonsItemEditor item={item} changeItem={changeItem} />
        case TestItemType.CheckboxesGroup:
            return <CheckBoxesItemEditor item={item} changeItem={changeItem} />
        default:
            return null;
    }
}
