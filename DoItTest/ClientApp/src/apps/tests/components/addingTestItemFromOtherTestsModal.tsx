import { Box } from "@mui/material";
import { TestItemType } from "domain/tests/items/testItemType";
import { TestItemBlank } from "domain/tests/testItemBlank";
import React, { useEffect } from "react";
import { useMemo, useState } from "react";
import { Button } from "sharedComponents/buttons/button";
import { IconButton } from "sharedComponents/buttons/iconButton";
import Dialog from "sharedComponents/dialog/dialog";
import { SetState } from "tools/setState";
import { Test } from "domain/tests/test";
import CAsyncAutocomplete from "sharedComponents/inputs/CAsyncAutocomplete";
import { TestsProvider } from "domain/tests/testsProvider";
import { TestItemCard } from "./infos/testItemInfoCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Color } from "tools/colors";

export interface AddingTestItemFromOtherTestsModalProps {
    currentTestItemBlanks: TestItemBlank[]
    changeCurrentTestItemBlanks: SetState<TestItemBlank[]>
    open: boolean
    onClose: () => void
}

class State {
    constructor
        (
            public selectedTest: Test | null = null,
            public tests: Test[] = [],
            public selectedTestTestItemBlanks: TestItemBlank[] = [],
            public selectedTestItemBlanks: TestItemBlank[] = []
        ) { }
}

const leftGroupId = "leftGroupId"
const rigthGroupId = "rigthGroupId"

export default function AddingTestItemFromOtherTestsModal(props: AddingTestItemFromOtherTestsModalProps) {

    const [state, setState] = useState<State>(new State())

    function confirm() {
        const currentTestItemBlanks = [...props.currentTestItemBlanks, ...state.selectedTestItemBlanks]
        props.changeCurrentTestItemBlanks(currentTestItemBlanks)
        setState(new State())
        props.onClose()
    }

    async function changeSelectedTest(selectedTest: Test | null) {
        let selectedTestTestItemBlanks: TestItemBlank[] = []
        if (selectedTest != null) {
            const selectedTestTestItems = await TestsProvider.getTestItems(selectedTest.id)
            selectedTestTestItemBlanks = TestItemBlank.formTestItems(selectedTestTestItems, true)
        }
        setState({ ...state, selectedTestTestItemBlanks, selectedTest })
    }

    function handleDragDrop(results: any) {
        const { source, destination } = results
        if (!destination) return;

        const selectedTestItemBlanks = [...state.selectedTestItemBlanks]

        if (source.droppableId === destination.droppableId) {
            if (source.droppableId == rigthGroupId) {
                const [removedSelectedTestItemBlank] = selectedTestItemBlanks.splice(source.index, 1);

                selectedTestItemBlanks.splice(destination.index, 0, removedSelectedTestItemBlank)
            }
            return setState({ ...state, selectedTestItemBlanks })
        }

        const selectedTestTestItemBlanks = [...state.selectedTestTestItemBlanks]

        if (destination.droppableId == leftGroupId) {
            const [removedSelectedTestItemBlank] = selectedTestItemBlanks.splice(source.index, 1);

            selectedTestTestItemBlanks.splice(destination.index, 0, removedSelectedTestItemBlank)
        }
        else {
            const [removedSelectedTestTestItemBlank] = selectedTestTestItemBlanks.splice(source.index, 1);

            selectedTestItemBlanks.splice(destination.index, 0, removedSelectedTestTestItemBlank)
        }
        setState({ ...state, selectedTestItemBlanks, selectedTestTestItemBlanks })
    }

    return (
        <Dialog
            isOpen={props.open}
            onClose={() => {
                setState(new State())
                props.onClose()
            }}
            title="Импортирование вопросов"
            sx={{
                minWidth: 1500,
                maxWidth: 1500
            }}
            actionsContent={< Button
                title="Подтвердить"
                onClick={confirm}
            >
                Подтвердить
            </Button >
            }
        >
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}>
                <CAsyncAutocomplete
                    options={state.tests}
                    label="Тест"
                    getOptionLabel={test => test?.title}
                    onChange={changeSelectedTest}
                    onChangeText={async (text) => {
                        const tests = String.isNullOrWhitespace(text) ? [] : await TestsProvider.getTestsBySearchText(text);
                        setState(prevState => ({ ...prevState, tests }));
                    }}
                    value={state.selectedTest}
                    placeholder={"Введите название теста"}
                />
                Перетащите вопросы из левой колонки вправую и нажмите кнопку подтвердить, чтобы экспортировать(вопросы можно брать из разных тестов)
                <Box display="flex" gap={3} width={1}>
                    <DragDropContext
                        onDragEnd={handleDragDrop}>

                        <Box sx={{ borderRadius: 1, padding: 2, backgroundColor: "#f48fb1" }} width={1}>
                            <h3>Вопросы тестов</h3>
                            <Droppable droppableId={leftGroupId}>
                                {(provided) => (
                                    <Box {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        sx={{ display: 'flex', flexDirection: 'column' }} height={1}>

                                        {state.selectedTestTestItemBlanks.map((b, index) => <Draggable
                                            draggableId={b.key}
                                            key={b.key}
                                            index={index}
                                        >
                                            {(provided) =>
                                                <Box
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                    ref={provided.innerRef}
                                                    sx={{ margin: 1 }}
                                                >
                                                    <TestItemCard
                                                        item={b}
                                                        index={index + 1}
                                                    />
                                                </Box>
                                            }
                                        </Draggable>
                                        )}
                                        {provided.placeholder}
                                    </Box>)}
                            </Droppable>
                        </Box>

                        <Box sx={{ borderRadius: 1, padding: 2, backgroundColor: "#c5e1a5" }} width={1}>
                            <h3>Импортируемые вопросы</h3>
                            <Droppable droppableId={rigthGroupId}>
                                {(provided) => (
                                    <Box {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        sx={{ display: 'flex', flexDirection: 'column' }} height={1}>

                                        {state.selectedTestItemBlanks.map((b, index) => <Draggable
                                            draggableId={b.key}
                                            key={b.key}
                                            index={index}
                                        >
                                            {(provided) =>
                                                <Box
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                    ref={provided.innerRef}
                                                    sx={{ margin: 1 }}
                                                >
                                                    <TestItemCard
                                                        item={b}
                                                        index={index + 1}
                                                    />
                                                </Box>
                                            }
                                        </Draggable>
                                        )}
                                        {provided.placeholder}
                                    </Box>)}
                            </Droppable>
                        </Box>
                    </DragDropContext>
                </Box>
            </Box>
        </Dialog >
    );
}

