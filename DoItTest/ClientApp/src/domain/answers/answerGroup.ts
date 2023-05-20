export class AnswerGroup {
    public constructor(
        public readonly id: string,
        public readonly answerOptionIds: string[]
    ) { }
}

export function mapToAnswerGroup(value: any): AnswerGroup {
    return new AnswerGroup(value.id, value.answerOptionIds)
}

export function mapToAnswerGroups(value: any[]): AnswerGroup[] {
    return value.map(mapToAnswerGroup);
}