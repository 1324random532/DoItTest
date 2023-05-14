import { TestItemBlank } from "domain/tests/testItemBlank"
import { Card, CardContent, CardHeader, SxProps, Theme, Typography } from "@mui/material";
import { IconButton } from "sharedComponents/buttons/iconButton";
import { SetState } from "tools/setState";
import { Box } from "@mui/system";
import { TestItem } from "domain/tests/items/testItem";
import { PassingTestItemInfo } from "./passingTestItemInfo";
import { Answer } from "domain/answers/answer";

export interface PassingTestItemInfoCardProps {
    item: TestItem
    answer: Answer | null
    index: number
    sx?: SxProps<Theme>
}

export function PassingTestItemInfoCard({ item, answer, index, sx }: PassingTestItemInfoCardProps) {
    return <Card>
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
            <PassingTestItemInfo item={item} answer={answer} sx={sx} />
        </CardContent>
    </Card>
}