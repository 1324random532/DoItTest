import { purple } from "@mui/material/colors"
import { AnswerGroup } from "./answerGroup"

export class AnswerBlank {
    public constructor(
        public readonly studentId: string,
        public readonly testId: string,
        public readonly stringAnswer: string | null,
        public readonly numberAnswer: number | null,
        public readonly answerOptionId: string | null,
        public readonly answerOptionIds: string[],
        public readonly answerGroups: AnswerGroup[]
    ) { }

    public static getDefault(studentId: string, testId: string): AnswerBlank {
        return new AnswerBlank(studentId, testId, null, null, null, [], [])
    }
}

