import { TestItemType } from "../testItemType";

export abstract class AnswerOption {
    public constructor(
        public readonly id: string,
        public readonly testItemId: string,
        public readonly type: TestItemType
    ) { }
}