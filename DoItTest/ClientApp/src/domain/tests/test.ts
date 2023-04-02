import Time, { mapToTime } from "tools/time";

export class Test {
    public constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly title: string,
        public readonly timeToCompleteInSeconds: number,
        public readonly numberOfPercentagesByFive: number,
        public readonly numberOfPercentagesByFour: number,
        public readonly numberOfPercentagesByThree: number,
    ) { }
}

export function mapToTest(value: any): Test {
    return new Test(value.id, value.userId, value.title, value.timeToCompleteInSeconds,
        value.numberOfPercentagesByFive, value.numberOfPercentagesByFour, value.numberOfPercentagesByThree)
}

export function mapToTests(value: any[]): Test[] {
    return value.map(mapToTest);
}