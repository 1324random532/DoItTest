import { Box, Typography } from "@mui/material";
import { Student } from "domain/students/student";
import { StudentBlank } from "domain/students/studentBlank";
import { StudentsProvider } from "domain/students/studentProvider";
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
    setStudent: (student: Student) => void
    setStartTimer: (startTimer: boolean) => void
}


export function StudentRegistrationForm({ testId, setStudent, setStartTimer }: StudentRegistrationFormProps) {
    const { showError, showSuccess } = useNotification()

    const blockUi = useBlockUi();

    const [studentBlank, setStudentBlank] = useState<StudentBlank>(StudentBlank.getDefault)

    async function save() {
        blockUi(async () => {
            const result = await TestsProvider.startTest(studentBlank, testId);
            if (!result.isSuccess) {
                return showError(result.errors[0].message);
            }

            setStudent(result.data)
            createCookie("studentId", result.data.id, 1)
            setStartTimer(true)
            showSuccess("Тест начат")
        })
    }

    return (
        <Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography>Введите данные чтобы начать</Typography>

                <Input
                    type="text"
                    label="Имя"
                    value={studentBlank.firstName}
                    onChange={firstName => setStudentBlank({ ...studentBlank, firstName })}
                />

                <Input
                    type="text"
                    label="Фамилия"
                    value={studentBlank.lastName}
                    onChange={lastName => setStudentBlank({ ...studentBlank, lastName })}
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

                <Button onClick={() => { save() }}>Начать</Button>
            </Box>
        </Box>
    )
}