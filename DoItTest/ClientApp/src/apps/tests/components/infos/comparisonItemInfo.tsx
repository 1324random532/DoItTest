import { FormControlLabel, FormGroup, SxProps, Theme } from "@mui/material";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { TestItemBlank } from "domain/tests/testItemBlank";
import { useState } from "react";
import { AnswerOption } from "domain/tests/items/answerOption/answerOption";
import { AnswerOptionBlank } from "domain/tests/answerOptionBlank";
import { GroupInfo } from "./groupInfo";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box } from "@mui/system";

export interface ComparisonItemInfoProps {
    item: TestItemBlank,
    sx?: SxProps<Theme>;
}


export function ComparisonItemInfo({ item, sx }: ComparisonItemInfoProps) {

    return (
        <Box display='flex' flexDirection='column' gap={2} width={1} >
            {
                item.answerOptionGroups.map(o =>

                    <GroupInfo label={o.name} options={o.answerOptions} />
                )
            }
        </Box>
    )
}