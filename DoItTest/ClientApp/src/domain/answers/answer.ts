export class Answer {
    public constructor(
        public readonly id: string,
        public readonly studentTestId: string,
        public readonly testItemId: string,
        public readonly stringAnswer: string | null,
        public readonly numberAnswer: number | null,
        public readonly answerOptionId: string | null,
        public readonly answerOptionIds: string[],
        public readonly isTrue: boolean
    ) { }
}

export function mapToAnswer(value: any): Answer {
    return new Answer(value.id, value.studentTestId, value.testItemId, value.stringAnswer,
        value.numberAnswer, value.answerOptionId, value.answerOptionIds, value.isTrue)
}

export function mapToAnswers(value: any[]): Answer[] {
    return value.map(mapToAnswer);
}