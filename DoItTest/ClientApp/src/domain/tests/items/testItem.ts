import { TestItemType } from "./testItemType";

export abstract class TestItem {
    public constructor(
        public readonly id: string,
        public readonly testId: string,
        public readonly type: TestItemType,
        public readonly question: string,
    ) { }
}