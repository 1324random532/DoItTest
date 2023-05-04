import { purple } from "@mui/material/colors"

export class AnswerBlank {
    public constructor(
        public readonly studentId: string,
        public readonly testId: string,
        public readonly stringAnswer: string | null,
        public readonly numberAnswer: number | null,
        public readonly answerOptionId: string | null,
        public readonly answerOptionIds: string[]
    ) { }

    public static getDefault(studentId: string, testId: string): AnswerBlank {
        return new AnswerBlank(studentId, testId, null, null, null, [])
    }
}

export function mapToAnswerBlank(value: any): AnswerBlank {

    return new AnswerBlank(value.id, value.studentTestId, value.testItemId, value.stringAnswer, value.numberAnswer, value.answerOptionId, value.answerOptionIds)
}

