export class AnserOption {
    public constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly key: string,
    ) { }
}

export function mapToAnserOption(value: any): AnserOption {
    return new AnserOption(value.id, value.title, value.key)
}

export function mapToAnserOptions(value: any[]): AnserOption[] {
    return value.map(mapToAnserOption);
}