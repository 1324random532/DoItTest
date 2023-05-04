
import { Card, CardHeader, Box, IconButton, CardContent, Typography, CardActions } from "@mui/material";
import { TestItemInfo } from "apps/tests/components/info/testItemInfo";
import { TestItem } from "domain/tests/items/testItem";
import { useNotification } from "sharedComponents/notification/store/notificationStore";
import { PassingTestItem } from "./passingTestItem";
import { useState } from "react";
import { AnswerBlank } from "domain/answers/answerBlank";
import { Button } from "sharedComponents/buttons/button";
import useComponent from "tools/components/useComponent";
import { TestsProvider } from "domain/tests/testsProvider";
import { Student } from "domain/students/student";
import { Test } from "domain/tests/test";

export interface PassingTestItemCardProps {
    test: Test
    student: Student
    item: TestItem
    index: number | null
}

export function PassingTestItemCard({ item, index, test, student }: PassingTestItemCardProps) {

    const [answer, setAnswer] = useState<AnswerBlank>(AnswerBlank.getDefault(st))


    return (
        <Card>
            <CardHeader
                title={`Вопрос номер: ${index}`}
            />
            <CardContent>
                <Typography variant="body2" sx={{ fontSize: 20, wordWrap: "break-word", marginBottom: 2 }}>
                    {item.question}
                </Typography>
                {
                    item.imageBase64 &&
                    <Box sx={{ position: 'relative', marginTop: 1, marginBottom: 1 }}>
                        <Box width={1} height={300} sx={{ objectFit: 'contain' }} src={item.imageBase64} component='img'>
                        </Box>
                    </Box>
                }
                <PassingTestItem
                    item={item}
                    answer={answer}
                    changeAnswer={setAnswer}
                />
            </CardContent>
            <CardActions>
                <Button onClick={() => { }}>Далее</Button>
                <Button onClick={() => { }}>Завершить</Button>
            </CardActions>
        </Card>
    )
}

function blockUi(arg0: () => Promise<void>) {
    throw new Error("Function not implemented.");
}
