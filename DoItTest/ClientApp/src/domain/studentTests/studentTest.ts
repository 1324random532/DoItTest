export class StudentTest {
    public constructor(
        public readonly id: string,
        public readonly testId: string,
        public readonly title: string,
        public readonly timeToCompleteInSeconds: number,
    ) { }
}

export function mapToStudentTest(value: any): StudentTest {
    return new StudentTest(value.id, value.userId, value.title, value.timeToCompleteInSeconds)
}