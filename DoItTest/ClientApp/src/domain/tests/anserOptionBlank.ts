import { AnserOption } from "./items/anserOption";

export class AnserOptionBlank {
    public constructor(
        public id: string | null,
        public title: string | null,
        public key: string
    ) { }

    public static getDefault(): AnserOptionBlank {
        return new AnserOptionBlank(null, null, crypto.randomUUID())
    }

    public static formAnserOption(anserOption: AnserOption): AnserOptionBlank {
        return new AnserOptionBlank(
            anserOption.id, anserOption.title, crypto.randomUUID()
        )
    }

    public static formAnserOptions(anserOptions: AnserOption[]): AnserOptionBlank[] {
        return anserOptions.map(AnserOptionBlank.formAnserOption)
    }
}