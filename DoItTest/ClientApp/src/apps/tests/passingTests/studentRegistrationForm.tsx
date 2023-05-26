import { Box, Typography } from "@mui/material";
import { Student } from "domain/students/student";
import { StudentBlank } from "domain/students/studentBlank";
import { StudentsProvider } from "domain/students/studentProvider";
import { TestItem } from "domain/tests/items/testItem";
import { TestsProvider } from "domain/tests/testsProvider";
import { useState } from "react";
import { useBlockUi } from "sharedComponents/blockUi/blockUiContext";
import { Button } from "sharedComponents/buttons/button";
import { ConfirmDialogAsync } from "sharedComponents/dialog/dialog2";
import useDialog from "sharedComponents/dialog/useDialog";
import { Input } from "sharedComponents/inputs/input";
import { useNotification } from "sharedComponents/notification/store/notificationStore";
import { createCookie } from "tools/Cookie";
import { SetState } from "tools/setState";

export interface StudentRegistrationFormProps {
    testId: string
    startTest: (student: Student, testItem: TestItem) => void
}


export function StudentRegistrationForm({ testId, startTest }: StudentRegistrationFormProps) {
    const { showError, showSuccess } = useNotification()

    const blockUi = useBlockUi();

    const [studentBlank, setStudentBlank] = useState<StudentBlank>(StudentBlank.getDefault)

    async function save() {
        blockUi(async () => {
            const result = await TestsProvider.startTest(studentBlank, testId);
            if (!result.isSuccess) {
                return showError(result.errors[0].message);
            }

            createCookie("studentId", result.data.student.id, 1)
            startTest(result.data.student, result.data.testItem)
            showSuccess("Тест начат")
        })
    }

    return (
        <Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography sx={{ fontSize: 20 }}>Введите данные, чтобы начать.</Typography>

                <Input
                    type="text"
                    label="Фамилия"
                    value={studentBlank.lastName}
                    onChange={lastName => setStudentBlank({ ...studentBlank, lastName })}
                />

                <Input
                    type="text"
                    label="Имя"
                    value={studentBlank.firstName}
                    onChange={firstName => setStudentBlank({ ...studentBlank, firstName })}
                />

                <Input
                    type="text"
                    label="Отчество"
                    value={studentBlank.patronymic}
                    onChange={patronymic => setStudentBlank({ ...studentBlank, patronymic })}
                />

                <Input
                    type="text"
                    label="Группа"
                    value={studentBlank.group}
                    onChange={group => setStudentBlank({ ...studentBlank, group })}
                />

                <Button
                    onClick={() => { save() }}
                    sx={{ height: 50 }}
                >
                    Начать
                </Button>
            </Box>
        </Box>
    )
}