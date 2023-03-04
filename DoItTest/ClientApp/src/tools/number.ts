export const declension = (inputValue: number, nominative: string, genitive: string, plural: string): string => {
    let value = Math.trunc(inputValue);
    value %= 100;

    if (value >= 11 && value <= 19)
        return `${inputValue} ${plural}`;

    value %= 10;
    switch (value) {
        case 1: return `${inputValue} ${nominative}`;

        case 2:
        case 3:
        case 4: return `${inputValue} ${genitive}`;

        default: return `${inputValue} ${plural}`;
    }
}

export const random = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const isNumber = (x: any) => +x === +x;
