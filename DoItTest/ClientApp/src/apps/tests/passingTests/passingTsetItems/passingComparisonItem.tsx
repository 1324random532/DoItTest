import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { Answer } from "domain/answers/answer";
import { ComparisonItem } from "domain/tests/items/comparisonItem";
import { AnswerBlank } from "domain/answers/answerBlank";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { SetState } from "tools/setState";
import useComponent from "tools/components/useComponent";
import { AnswerGroup } from "domain/answers/answerGroup";
import { useEffect, useState } from "react";
import { AnswerOptionGroup } from "domain/tests/items/answerOption/answerOptionGroups/answerOptionGroup";

export interface PassingTextFieldTestItemInfoProps {
    item: ComparisonItem
    answer: AnswerBlank
    changeAnswer: SetState<AnswerBlank>;
    sx?: SxProps<Theme>;
}

const guidEmty = "00000000-0000-0000-0000-000000000000";

export function PassingTextFieldTestItemInfo({ item, answer, changeAnswer, sx }: PassingTextFieldTestItemInfoProps) {

    useEffect(
        load,
        [item]
    )

    function load() {
        const answerGroupBlanks = item.answerOptionGroups.map(g => new AnswerGroup(g.id, []))
        answerGroupBlanks.push(new AnswerGroup(guidEmty, item.answerOptions.map(o => o.id)))

        changeAnswer({ ...answer, answerGroups: answerGroupBlanks })
    }

    function handleDragDrop(results: any) {
        const { source, destination } = results
        if (!destination) return;

        if (source.droppableId === destination.droppableId) {
            const sourceAnswerOptionIds = answer.answerGroups.find(g => g.id == source.droppableId)!.answerOptionIds
            const [removedAnswerOption] = sourceAnswerOptionIds.splice(source.index, 1);

            return sourceAnswerOptionIds.splice(destination.index, 0, removedAnswerOption)
        }

        const answerOptionSourceGroup = answer.answerGroups.find(b => b.id == source.droppableId)
        const answerOptionDestinationGroup = answer.answerGroups.find(b => b.id == destination.droppableId)

        const [removedAnswerOption] = answerOptionSourceGroup!.answerOptionIds.splice(source.index, 1)

        answerOptionDestinationGroup!.answerOptionIds.splice(destination.index, 0, removedAnswerOption)
    }

    function getCard(answerGroupBlanks: AnswerGroup, title: string) {

        return <Card
            sx={{ backgroundColor: '#F0F0F0' }}>
            <CardHeader title={title} />
            <CardContent>
                <Droppable droppableId={answerGroupBlanks.id}>
                    {(provided) => (
                        <Box {...provided.droppableProps}
                            ref={provided.innerRef}
                            sx={{ display: 'flex', flexDirection: 'column' }}>
                            {answerGroupBlanks.answerOptionIds.map((id, index) => {
                                const answerOption = item.answerOptions.find(o => o.id == id)
                                return <Draggable
                                    draggableId={id}
                                    key={id}
                                    index={index}
                                >
                                    {(provided) =>
                                        <Box
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                            ref={provided.innerRef}
                                            sx={{ margin: 1, padding: 1, borderRadius: 1, backgroundColor: '#DCDCDC' }}
                                        >
                                            {answerOption!.title}
                                        </Box>
                                    }
                                </Draggable>
                            })}
                            {provided.placeholder}
                        </Box>)}
                </Droppable>
            </CardContent>
        </Card>
    }

    return (
        <Box sx={{
            display: "flex",
            gap: 2,
        }}
            width={1}>
            <DragDropContext onDragEnd={handleDragDrop}>
                {
                    answer.answerGroups.map(b => {
                        const isDefaultAnswerGroup = b.id === guidEmty
                        if (!isDefaultAnswerGroup) return;

                        return <Box width={1}>
                            {getCard(b, "Варианты ответов")}
                        </Box>
                    })
                }
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1
                }}
                    width={1}>
                    {
                        answer.answerGroups.map(b => {
                            const isDefaultAnswerGroup = b.id === guidEmty
                            if (isDefaultAnswerGroup) return;

                            const itemAnswerOptionGroup = item.answerOptionGroups.find(g => g.id == b.id)!

                            return getCard(b, itemAnswerOptionGroup.name)
                        })
                    }
                </Box>
            </DragDropContext >
        </Box >
    )
}


