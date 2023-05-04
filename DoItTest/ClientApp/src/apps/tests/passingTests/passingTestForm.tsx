import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { Student } from "domain/students/student";
import { TestItem } from "domain/tests/items/testItem";
import { StudentTest } from "domain/tests/studentTest";
import { TestsProvider } from "domain/tests/testsProvider";
import { useState } from "react";
import { useBlockUi } from "sharedComponents/blockUi/blockUiContext";
import { ConfirmDialogAsync } from "sharedComponents/dialog/dialog2";
import useDialog from "sharedComponents/dialog/useDialog";
import { useNotification } from "sharedComponents/notification/store/notificationStore";
import useComponent from "tools/components/useComponent";
import { PassingTestItemCard } from "./passingTsetItems/passingTestItemCard";

export interface PassingTestCardProps {
    testId: string
    student: Student
}

export function PassingTestForm({ testId, student }: PassingTestCardProps) {

    const { showError, showSuccess } = useNotification()
    const confirmDialog = useDialog(ConfirmDialogAsync)

    const blockUi = useBlockUi();

    const [testItem, setTestItem] = useState<TestItem | null>(null)
    const [errorss, setErrors] = useState<String[]>([])

    useComponent({
        didMount: async () => {
            blockUi(async () => {
                const result = await TestsProvider.getItemForPassing(testId, student.id);
                if (!result.isSuccess) {
                    setErrors(result.errors.map(e => e.message))
                    return showError(result.errors[0].message)
                }

                setTestItem(result.data)
            })
        }
    })

    return (
        <Box>
            {
                errorss.length != 0
                    ? <>{errorss.map(e => e)}</>
                    : <>
                        {
                            testItem != null
                                ? <PassingTestItemCard student={student} testId={testId} item={testItem} index={null} />
                                : <>Тест пройден</>
                        }
                    </>
            }

        </Box>
    )
}