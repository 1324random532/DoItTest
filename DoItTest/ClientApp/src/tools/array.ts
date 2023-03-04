import { isNumber } from './number';

export { };

declare global {
    interface Array<T> {
        distinct(): Array<T>;
        distinctBy(predicate: (a: T, b: T) => boolean): Array<T>;
        intersect(other: Array<T>): Array<T>;
        groupBy<GroupKey>(groupPredicate: (value: T) => GroupKey): Map<GroupKey, T[]>;
        groupSelectBy<GroupKey, SelectKey>(groupPredicate: (value: T) => GroupKey, selectPredicate: (value: T) => SelectKey): Map<SelectKey, T[]>;
        findLast(predicate: (value: T, index: number, obj: T[]) => boolean): T | undefined;
        firstOrNull(predicate?: (value: T) => boolean): T | null;
    }
}

Array.prototype.distinct = function <T>(): Array<T> {
    return this.filter((value, index, self) => self.indexOf(value) === index);
}

Array.prototype.distinctBy = function <T>(predicate: (a: T, b: T) => boolean): Array<T> {
    let filtered: T[] = [];

    this.forEach(e => {
        if (filtered.find(f => predicate(e, f)) == undefined)
            filtered.push(e);
    });

    return filtered;
}

Array.prototype.intersect = function <T>(other: Array<T>): Array<T> {
    return this.filter(value => other.includes(value));
}

Array.prototype.groupBy = function <T, GroupKey>(groupPredicate: (value: T) => GroupKey): Map<GroupKey, T[]> {
    const map = new Map<GroupKey, T[]>();
    this.forEach((item) => {
        const key = groupPredicate(item);
        const collection = map.get(key);

        if (!collection) map.set(key, [item]);
        else collection.push(item);
    });

    return map;
}

Array.prototype.groupSelectBy = function <T, GroupKey, SelectKey>(groupPredicate: (value: T) => GroupKey, selectPredicate: (value: T) => SelectKey): Map<SelectKey, T[]> {
    type Selected = { selectKey: SelectKey, values: T[] };

    const map = new Map<GroupKey, Selected>();
    this.forEach((arrayItem) => {
        const key = groupPredicate(arrayItem);
        const collection = map.get(key);

        if (!collection) {
            map.set(key, { selectKey: selectPredicate(arrayItem), values: [arrayItem] });
        } else {
            collection.values.push(arrayItem);
        }
    });

    const resultMap = new Map<SelectKey, T[]>();
    map.forEach((value: Selected, _) => {
        resultMap.set(value.selectKey, value.values)
    });

    return resultMap;
}

Array.prototype.findLast = function <T>(predicate: (value: T, index: number, obj: T[]) => boolean): T | undefined {
    let l = this.length;

    while (l--)
        if (predicate(this[l], l, this))
            return this[l];

    return undefined;
}

Array.prototype.firstOrNull = function <T>(predicate?: (value: T) => boolean): T | null {
    if (predicate == null) return this.length > 0 ? this[0] : null;
    return this.find(predicate) ?? null;
}

export const arrayRange = (start: number, end: number, step: number = 1): number[] => {
    const length = Math.floor((end - start) / step) + 1;
    return Array.from({ length }, (_, k) => start + k * step);
}

export const sortAlphabetically = (_1: string, _2: string) => {
    if (isNumber(_1) && isNumber(_2))
        return +_1 - +_2;

    return _1.localeCompare(_2);
}
