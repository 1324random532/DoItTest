import { Box } from "@mui/system";
import { TestBlank } from "domain/tests/testBlank";
import { TestItemBlank } from "domain/tests/testItemBlank";
import { TestsProvider } from "domain/tests/testsProvider";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlockUi } from "sharedComponents/blockUi/blockUiContext";
import { Button } from "sharedComponents/buttons/button";
import { Content } from "sharedComponents/content/content";
import { ConfirmDialogAsync } from "sharedComponents/dialog/dialog2";
import useDialog from "sharedComponents/dialog/useDialog";
import { Input } from "sharedComponents/inputs/input";
import { useNotification } from "sharedComponents/notification/store/notificationStore";
import useComponent from "tools/components/useComponent";
import { TestItemCard } from "./components/info/testItemInfoCard";
import TestItemEditorModal from "./components/testItemEditorModal";
import { TestLinks } from "./links";


export function TestEditor() {

    const routeParams = useParams();

    const { showError, showSuccess } = useNotification()
    const confirmDialog = useDialog(ConfirmDialogAsync)

    const blockUi = useBlockUi();

    const [testBlank, setTestBlank] = useState<TestBlank>(TestBlank.getDefault)

    const [testItemBlanks, setTestItemBlanks] = useState<TestItemBlank[]>([])

    const [editItem, setEditItem] = useState<TestItemBlank | null>(null)

    useComponent({
        didMount: async () => {
            blockUi(async () => {
                const testId = routeParams.testId ?? null
                if (testId == null) return

                const test = await TestsProvider.getTest(testId);
                setTestBlank(TestBlank.formTest(test));

                const testItems = await TestsProvider.geTestItems(test.id);
                const testItemBlanks = TestItemBlank.formTestItems(testItems)
                setTestItemBlanks(testItemBlanks)
            })
        }
    })

    function setTestItemBlank(itemBlank: TestItemBlank) {
        setTestItemBlanks(prev => {
            const items = [...prev]

            const index = items.findIndex(i => i.key === itemBlank.key)

            if (index !== -1) items[index] = itemBlank
            else items.push(itemBlank)

            return items
        })
        setEditItem(null)
    }

    async function removeTestItemBlank(itemKey: string) {
        const result = await confirmDialog.show({ title: "Вы действительно хотите удалить данный вопрос?" })
        if (!result) return

        const testItems = testItemBlanks
        setTestItemBlanks(testItems.filter(i => (i.key != itemKey)))
    }

    const navigateTo = useNavigate();

    async function save() {
        blockUi(async () => {
            const result = await TestsProvider.saveTest(testBlank, testItemBlanks);
            if (!result.isSuccess) {
                return showError(result.errors[0].message);
            }

            showSuccess("Сохранение выполнено")
            navigateTo(TestLinks.list, { replace: true })
        })
    }

    return (
        <Content withSidebar={true}>
            <h1>{testBlank.id == null ? "Добавить" : "Изменить"}</h1>
            <Box sx={{ display: "flex", gap: 2 }}>
                <Button onClick={save} title='Сохранить именения' sx={{ mb: 2, width: 250, height: 56 }}>Сохранить</Button>
                <Input
                    type="text"
                    label="Название теста"
                    value={testBlank.title}
                    onChange={title => setTestBlank({ ...testBlank, title })}
                    sx={{ width: 250 }}
                />
            </Box>
            <Button
                title="Добавить вопрос"
                onClick={() => { setEditItem(TestItemBlank.getDefault()) }}
                sx={{ mb: 2, width: 250, height: 56 }}
            >
                Добавить вопрос
            </Button>
            {editItem !== null && <TestItemEditorModal
                changeTestItemBlank={setTestItemBlank}
                testItem={editItem}
                open={true}
                onClose={() => {
                    setEditItem(null)
                }}
            />}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {testItemBlanks.map((i, index) => {
                    return <TestItemCard item={i} index={index + 1} removeItem={removeTestItemBlank} changeItem={() => setEditItem(i)} sx={{ width: 600 }} />
                })}
            </Box>
        </Content>
    )
}

