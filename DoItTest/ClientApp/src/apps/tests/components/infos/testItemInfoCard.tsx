import { TestItemBlank } from "domain/tests/testItemBlank"
import { Card, CardContent, CardHeader, SxProps, Theme, Typography } from "@mui/material";
import { TestItemInfo } from "./testItemInfo";
import { IconButton } from "sharedComponents/buttons/iconButton";
import { SetState } from "tools/setState";
import { Box } from "@mui/system";

export interface TestItemInfoProps {
    item: TestItemBlank
    index: number
    removeItem?: (itemKey: string) => void
    changeItem?: () => void
    onClick?: () => void
    sx?: SxProps<Theme>
}

export function TestItemCard({ item, index, removeItem, changeItem, sx }: TestItemInfoProps) {
    return <Card sx={sx}>
        <CardHeader
            title={`Вопрос номер: ${index}`}
            action={
                <Box>
                    {
                        changeItem &&
                        <IconButton icon="create" onClick={changeItem} />
                    }
                    {
                        removeItem &&
                        <IconButton icon="delete" onClick={() => removeItem(item.key)} />
                    }
                </Box>
            }
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
            <TestItemInfo item={item} sx={sx} />
        </CardContent>
    </Card>
}