import { Box, Typography } from "@mui/material";
import { StudentBlank } from "domain/students/studentBlank";
import { useState } from "react";
import { useBlockUi } from "sharedComponents/blockUi/blockUiContext";
import { Button } from "sharedComponents/buttons/button";
import { ConfirmDialogAsync } from "sharedComponents/dialog/dialog2";
import useDialog from "sharedComponents/dialog/useDialog";
import { Input } from "sharedComponents/inputs/input";
import { useNotification } from "sharedComponents/notification/store/notificationStore";

export interface StudentRegistrationFormProps {

}


export function StudentRegistrationForm() {
    const { showError, showSuccess } = useNotification()
    const confirmDialog = useDialog(ConfirmDialogAsync)

    const blockUi = useBlockUi();

    const [studentBlank, setStudentBlank] = useState<StudentBlank>(StudentBlank.getDefault)

    // async function save() {
    //     blockUi(async () => {
    //         const result = await TestsProvider.saveTest(testBlank, testItemBlanks);
    //         if (!result.isSuccess) {
    //             return showError(result.errors[0].message);
    //         }

    //         showSuccess("Сохранение выполнено")
    //         navigateTo(TestLinks.list, { replace: true })
    //     })
    // }

    return (
        <Box>
            <Typography>Карточка регистрации студента</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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

                <Button onClick={() => { }}>Начать</Button>
            </Box>
        </Box>
    )
}