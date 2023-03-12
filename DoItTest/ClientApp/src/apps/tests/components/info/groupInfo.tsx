import { Card, CardContent, CardHeader, SxProps, Theme } from "@mui/material"
import { border, Box } from "@mui/system";
import { AnswerOptionBlank } from "domain/tests/answerOptionBlank"

export interface ComparisonItemInfoProps {
    label: string | null
    options: AnswerOptionBlank[]
    sx?: SxProps<Theme>;
}


export function GroupInfo({ label, options, sx }: ComparisonItemInfoProps) {
    return (
        <Card sx={{ backgroundColor: '#F0F0F0' }}>
            <CardHeader title={label} />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {
                    options.map(o =>
                        <Box sx={{ padding: 1, borderRadius: 1, backgroundColor: '#DCDCDC' }}>
                            {o.title}
                        </Box>)
                }
            </CardContent>
        </Card>
    )
}