import { Test } from "./test"

export class TestBlank {
    public constructor(
        public readonly id: string | null,
        public readonly userId: string | null,
        public readonly title: string | null,
    ) { }

    public static getDefault(): TestBlank {
        return new TestBlank(null, null, null)
    }

    public static formTest(test: Test): TestBlank {
        return new TestBlank(test.id, test.userId, test.title)
    }
}