export class Test {
    public constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly title: string,
    ) { }
}

export function mapToTest(value: any): Test {
    return new Test(value.id, value.userId, value.title)
}

export function mapToTests(value: any[]): Test[] {
    return value.map(mapToTest);
}