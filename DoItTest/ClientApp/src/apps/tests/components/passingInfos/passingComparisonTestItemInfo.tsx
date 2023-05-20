import { Box, Card, CardContent, CardHeader, SxProps, Theme } from "@mui/material";
import { Answer } from "domain/answers/answer";
import { ComparisonItem } from "domain/tests/items/comparisonItem";
import { GroupInfo } from "../infos/groupInfo";
import { Color } from "tools/colors";

export interface PassingComparisonTestItemInfoProps {
    item: ComparisonItem
    answer: Answer | null
    sx?: SxProps<Theme>;
}


export function PassingComparisonTestItemInfo({ item, answer, sx }: PassingComparisonTestItemInfoProps) {

    const allAnswerOtions = item.answerOptionGroups.flatMap(o => o.answerOptions)

    return (
        <Box display='flex' flexDirection='column' gap={2} width={1} >
            {
                answer == null ?
                    <>
                        Нет ответа
                    </>
                    : item.answerOptionGroups.map(ig =>
                        <Card sx={{ backgroundColor: '#F0F0F0' }}>
                            <CardHeader title={ig.name} />
                            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {
                                    answer.answerGroups.filter(g => ig.id == g.id).flatMap(o => o.answerOptionIds).map(o => {

                                        const answerOption = allAnswerOtions.find(ao => ao.id == o)

                                        return <Box sx={{ padding: 1, borderRadius: 1, backgroundColor: answerOption!.groupId != ig.id ? Color.error : Color.succes }}>
                                            {answerOption?.title}
                                        </Box>
                                    })
                                }
                            </CardContent>
                        </Card>
                    )


            }
        </Box>
    )
}