import { AnswerOptionBlank } from "domain/tests/answerOptionBlank"
import { AnswerOptionGroup } from "./answerOptionGroup";


export class AnswerOptionGroupBlank {
    constructor(
        public id: string | null,
        public name: string | null,
        public answerOptions: AnswerOptionBlank[],
        public key: string
    ) {
    }

    public static getDefault(): AnswerOptionGroupBlank {
        return new AnswerOptionGroupBlank(null, null, [], crypto.randomUUID())
    }

    public static fromAnswerOptionGroup(answerOptionGroup: AnswerOptionGroup, withoutId: boolean): AnswerOptionGroupBlank {
        const answerOptionBlanks = AnswerOptionBlank.formAnswerOptions(answerOptionGroup.answerOptions, withoutId)

        return new AnswerOptionGroupBlank(answerOptionGroup.id, answerOptionGroup.name, answerOptionBlanks, crypto.randomUUID())
    }

    public static formAnswerOptionGroups(answerOptionGroups: AnswerOptionGroup[], withoutId: boolean): AnswerOptionGroupBlank[] {
        return answerOptionGroups.map(g => AnswerOptionGroupBlank.fromAnswerOptionGroup(g, withoutId))
    }
}
