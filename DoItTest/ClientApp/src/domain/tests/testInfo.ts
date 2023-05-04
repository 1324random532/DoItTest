export class TestInfo {
    public constructor(
        public readonly testId: string,
        public readonly title: string,
        public readonly timeToCompleteInSeconds: number
    ) { }
}

export function mapToTestInfo(value: any): TestInfo {
    return new TestInfo(value.testId, value.title, value.timeToCompleteInSeconds)
}