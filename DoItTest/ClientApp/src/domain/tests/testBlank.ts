import Time from "tools/time"
import { Test } from "./test"

export class TestBlank {
    public constructor(
        public readonly id: string | null,
        public readonly userId: string | null,
        public readonly title: string | null,
        public readonly timeToCompleteInSeconds: number | null,
        public readonly numberOfPercentagesByFive: number | null,
        public readonly numberOfPercentagesByFour: number | null,
        public readonly numberOfPercentagesByThree: number | null
    ) { }

    public static getDefault(): TestBlank {
        return new TestBlank(null, null, null, null, 95, 75, 50)
    }

    public static formTest(test: Test): TestBlank {
        return new TestBlank(test.id, test.userId, test.title, test.timeToCompleteInSeconds, test.numberOfPercentagesByFive,
            test.numberOfPercentagesByFour, test.numberOfPercentagesByThree)
    }
}